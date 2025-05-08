from api.models.models import Restaurant
from sqlalchemy.orm import Session
from datetime import datetime
from sqlalchemy import func
    
def create_restaurant_admin(db: Session, data):
    # Lấy ID lớn nhất hiện tại
    max_id = db.query(func.max(Restaurant.id)).scalar()
    next_id = (max_id or 0) + 1

    restaurant = Restaurant(
        id=next_id,  # Set ID thủ công
        name=data.name,
        district=data.district,
        city=data.city,
        price_range=data.price_range,
        category=data.category,
        cuisine_style=data.cuisine_style,
        opening_hours=data.opening_hours,
        images=data.images,
        created_at=datetime.utcnow(),
        description=data.description,
        target_audience=data.target_audience  # Nếu có thêm cột này trong model
    )

    db.add(restaurant)
    db.commit()
    db.refresh(restaurant)

    return {
        "id": restaurant.id,
        "name": restaurant.name,
        "district": restaurant.district,
        "city": restaurant.city,
        "price_range": restaurant.price_range,
        "category": restaurant.category,
        "cuisine_style": restaurant.cuisine_style,
        "opening_hours": restaurant.opening_hours,
        "images": restaurant.images,
        "description": restaurant.description,
        "target_audience": restaurant.target_audience
    }

def update_restaurant_admin(db: Session, restaurant_id: int, data):
    restaurant = db.query(Restaurant).filter(Restaurant.id == restaurant_id).first()
    if not restaurant:
        return {"error": "Restaurant not found"}

    for key, value in data.dict(exclude_unset=True).items():
        setattr(restaurant, key, value)

    db.commit()
    db.refresh(restaurant)
    return {
        "id": restaurant.id,
        "name": restaurant.name,
        "district": restaurant.district,
        "city": restaurant.city,
        "price_range": restaurant.price_range,
        "category": restaurant.category,
        "cuisine_style": restaurant.cuisine_style,
        "opening_hours": restaurant.opening_hours,
        "images": restaurant.images,
        "description": restaurant.description
    }

def delete_restaurant_admin(db: Session, restaurant_id: int):
    restaurant = db.query(Restaurant).filter(Restaurant.id == restaurant_id).first()
    if not restaurant:
        return {"error": "Restaurant not found"}

    db.delete(restaurant)
    db.commit()
    return {"message": "Deleted"}
