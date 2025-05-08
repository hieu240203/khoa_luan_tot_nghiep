from sqlalchemy.orm import Session
from api.models.models import Review, Restaurant
from fastapi import HTTPException
from datetime import datetime

def create_review_db(db: Session, user_id: int, restaurant_id: int, comment: str, rating: float):
    # Tạo một review mới
    review = Review(
        user_id=user_id,
        restaurant_id=restaurant_id,
        comment=comment,
        rating=rating,
        created_at=datetime.utcnow()
    )
    
    # Thêm review vào cơ sở dữ liệu
    db.add(review)

    # Cập nhật total_reviews và average_rating cho nhà hàng
    restaurant = db.query(Restaurant).filter(Restaurant.id == restaurant_id).first()
    
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    
    # Tăng số lượng bình luận
    restaurant.total_reviews += 1

    # Cập nhật điểm đánh giá trung bình
    total_ratings = db.query(Review).filter(Review.restaurant_id == restaurant_id).all()
    if total_ratings:
        average_rating = sum([r.rating for r in total_ratings]) / len(total_ratings)
        restaurant.average_rating = average_rating

    # Commit vào cơ sở dữ liệu
    db.commit()
    db.refresh(review)
    
    return review

def get_reviews_by_restaurant(db: Session, restaurant_id: int):
    return db.query(Review).filter(Review.restaurant_id == restaurant_id).all()


def get_reviews_by_user(user_id: int, db: Session):
    # Lấy tất cả các review của user
    reviews = db.query(Review).filter(Review.user_id == user_id).all()
    
    if not reviews:
        return []  # Trả về danh sách rỗng nếu không có review
    
    return reviews