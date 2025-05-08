from sqlalchemy.orm import Session
from api.schemas.review import ReviewCreate
from api.models.models import Review, Restaurant, User
from api.database.review_db import get_reviews_by_restaurant
from datetime import datetime
from fastapi import HTTPException
from api.schemas.review import ReviewOut
from typing import List
# Hàm tạo review mới
def create_review_service(db: Session, user_id: int, data: ReviewCreate):
    review = Review(
        user_id=user_id,
        restaurant_id=data.restaurant_id,
        comment=data.comment,
        rating=data.rating,
        images=data.images,
        created_at=datetime.utcnow()
    )
    
    db.add(review)
    update_total_reviews(db, data.restaurant_id)
    db.commit()
    db.refresh(review)
    
    return review

# Hàm lấy danh sách review theo nhà hàng
def get_reviews_for_restaurant_service(db: Session, restaurant_id: int) -> List[ReviewOut]:
    reviews = db.query(Review).filter(Review.restaurant_id == restaurant_id).all()
    results = []
    for r in reviews:
        user = db.query(User).filter(User.id == r.user_id).first()
        results.append(ReviewOut(
            id=r.id,
            restaurant_id=r.restaurant_id,
            user_id=r.user_id,
            user_name=user.full_name if user else "Ẩn danh",
            rating=r.rating,
            comment=r.comment,
            images=r.images,
            created_at=r.created_at,
            reply=r.reply,
            reply_by_user_id=r.reply_by_user_id,
        ))
    return results

# Cập nhật total_reviews cho nhà hàng
def update_total_reviews(db: Session, restaurant_id: int):
    restaurant = db.query(Restaurant).filter(Restaurant.id == restaurant_id).first()
    if restaurant:
        restaurant.total_reviews += 1
        db.commit()
    else:
        raise HTTPException(status_code=404, detail="Restaurant not found")

# Hàm trả lời bình luận
def reply_to_review(db: Session, review_id: int, reply_text: str, user_id: int):
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    review.reply = reply_text
    review.reply_by_user_id = user_id
    db.commit()
    db.refresh(review)
    return review

# Hàm tạo review từ dữ liệu thô
def create_review_db(db: Session, user_id: int, restaurant_id: int, comment: str, rating: float, images: str = None):
    review = Review(
        user_id=user_id,
        restaurant_id=restaurant_id,
        comment=comment,
        rating=rating,
        images=images,
        created_at=datetime.utcnow()
    )
    
    db.add(review)
    update_total_reviews(db, restaurant_id)
    db.commit()
    db.refresh(review)
    
    return review
