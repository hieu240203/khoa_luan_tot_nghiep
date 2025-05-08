from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from api.schemas.review import ReviewCreate, ReviewOut
from api.services.restaurant_service import update_restaurant_rating
from api.services.review_service import (
    create_review_service,
    get_reviews_for_restaurant_service,
    reply_to_review  
)
from dependencies import get_db, get_current_user
from api.models.models import User

router = APIRouter()

@router.post("/", response_model=ReviewOut)
def create_review(
    data: ReviewCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    # Tạo đánh giá mới
    new_review = create_review_service(db, user.id, data)
    
    # Cập nhật điểm trung bình của nhà hàng
    update_restaurant_rating(db, data.restaurant_id, data.rating)
    
    return new_review

@router.get("/restaurant/{restaurant_id}", response_model=List[ReviewOut])
def get_reviews(restaurant_id: int, db: Session = Depends(get_db)):
    return get_reviews_for_restaurant_service(db, restaurant_id)

@router.post("/reply/{review_id}", response_model=ReviewOut)
def reply_review(
    review_id: int,
    reply_text: str,  # Đảm bảo nhận reply_text từ frontend
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    print(f"Reply received for review {review_id}: {reply_text}")  # Log lại phản hồi nhận được
    return reply_to_review(db, review_id, reply_text, user.id)


