from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import pandas as pd

from api.services.recommendation import content_based_recommend,  collaborative_filter_recommend, hybrid_recommend
from api.database.session import get_db
from api.database.user_db import get_user_by_id
from api.database.restaurant_db import get_all_restaurants
from api.schemas.restaurant import RestaurantOut
# from api.models.models import RecommendSession
from pydantic import BaseModel
import datetime
from typing import List
router = APIRouter()

class RecommendationRequest(BaseModel):
    user_id: int
    top_n: int = 5

@router.get("/content-based", response_model=list[RestaurantOut])
def recommend_for_user(user_id: int, db: Session = Depends(get_db)):
    # Lấy thông tin user từ DB
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user_profile = {
        "age": user.age,
        "occupation": user.occupation,
        "district": user.district,
        "city": user.city,
        "food_style": user.favorite_cuisine
    }

    # Lấy toàn bộ nhà hàng từ DB
    restaurants = get_all_restaurants(db)
    if not restaurants:
        raise HTTPException(status_code=404, detail="No restaurants found")

    # Chuyển dữ liệu sang DataFrame
    df = pd.DataFrame([r.__dict__ for r in restaurants])
    df = df.drop(columns=["_sa_instance_state"], errors="ignore")

    # Gợi ý nhà hàng
    recommended = content_based_recommend(user_profile, df, top_n=5)
    return recommended.to_dict(orient="records")

@router.post("/collaborative")
def get_collaborative_recommendations(request: RecommendationRequest, db: Session = Depends(get_db)):
    try:
        recommendations = collaborative_filter_recommend(request.user_id, db, request.top_n)
        return recommendations
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# API Hybrid recommendation (kết hợp Content-based và Collaborative filtering)
@router.post("/hybrid")
def get_hybrid_recommendations(request: RecommendationRequest, db: Session = Depends(get_db)):
    try:
        recommendations = hybrid_recommend(request.user_id, db, request.top_n)
        return recommendations
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

