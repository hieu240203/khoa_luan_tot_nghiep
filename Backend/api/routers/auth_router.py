from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.schemas.auth import UserCreate, UserLogin, Token, UserResponse
from api.services.auth_service import register_user, login_user
from dependencies import get_db, get_current_user
from fastapi.security import OAuth2PasswordRequestForm
import requests
from api.schemas.restaurant import  RestaurantOut
from typing import List
from api.database import review_db
router = APIRouter()

@router.post("/register", response_model=Token)
def register(user: UserCreate, db: Session = Depends(get_db)):
    new_user = register_user(
        db,
        user.username,
        user.email,
        user.password,
        user.full_name,
        user.age,
        user.occupation, 
        user.district, 
        user.city,
        user.favorite_cuisine
    )
    token, _ = login_user(db, user.email, user.password)
    return {"access_token": token, "token_type": "bearer"}

@router.post("/login", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    token, _ = login_user(db, form_data.username, form_data.password)
    return {"access_token": token, "token_type": "bearer"}

@router.get("/me", response_model=UserResponse)
def get_me(current_user=Depends(get_current_user)):
    return current_user

@router.get("/user/{user_id}/total-reviews")
def get_total_reviews(user_id: int, db: Session = Depends(get_db)):
    # Lấy các review của user từ database
    total_reviews = review_db.get_reviews_by_user(user_id, db)
    
    # Nếu không có review nào, trả về danh sách rỗng
    if total_reviews is None:
        raise HTTPException(status_code=404, detail="User not found or no reviews found")
    
    return {"total_reviews": len(total_reviews)}
