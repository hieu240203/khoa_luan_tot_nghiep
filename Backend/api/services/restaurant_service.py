from sqlalchemy.orm import Session
from api.database.restaurant_db import search_restaurants
from api.database.restaurant_db import get_restaurant_by_id
from fastapi import HTTPException
from api.models.models import Restaurant, Review
# Dịch vụ tìm kiếm nhà hàng
def search_restaurant_service(
    db: Session,
    keyword: str = None,
    category: str = None,
    cuisine_style: str = None,
    city: str = None,
    district: str = None,
):
    return search_restaurants(
        db,
        keyword=keyword,
        category=category,
        cuisine_style=cuisine_style,
        city=city,
        district=district,
    )

# Dịch vụ lấy chi tiết nhà hàng
def get_restaurant_detail_service(db: Session, restaurant_id: int):
    restaurant = get_restaurant_by_id(db, restaurant_id)
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    return restaurant

def update_restaurant_rating(db: Session, restaurant_id: int, new_rating: float):
    restaurant = db.query(Restaurant).filter(Restaurant.id == restaurant_id).first()
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    
    # Calculate new average using the provided formula
    current_avg = restaurant.average_rating or 0
    current_count = restaurant.total_reviews or 0
    
    # Calculate new values
    new_count = current_count + 1
    new_avg = (current_avg * current_count + new_rating) / new_count
    
    # Update restaurant with new values
    restaurant.average_rating = round(new_avg, 1)  
    restaurant.total_reviews = new_count
    
    # Commit changes to database
    db.commit()
    db.refresh(restaurant)
    
    return restaurant