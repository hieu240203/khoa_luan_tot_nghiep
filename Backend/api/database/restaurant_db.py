from sqlalchemy.orm import Session
from api.models.models import Restaurant

def search_restaurants(
    db: Session,
    keyword: str = None,
    category: str = None,
    cuisine_style: str = None,
    city: str = None,
    district: str = None,
):
    query = db.query(Restaurant)

    if keyword:
        keyword_like = f"%{keyword.lower()}%"
        query = query.filter(
            Restaurant.name.ilike(keyword_like) |
            Restaurant.cuisine_style.ilike(keyword_like) |
            Restaurant.category.ilike(keyword_like)
        )

    if category:
        query = query.filter(Restaurant.category.ilike(f"%{category}%"))

    if cuisine_style:
        query = query.filter(Restaurant.cuisine_style.ilike(f"%{cuisine_style}%"))

    if city:
        query = query.filter(Restaurant.city.ilike(f"%{city}%"))

    if district:
        query = query.filter(Restaurant.district.ilike(f"%{district}%"))

    return query.limit(50).all()

def get_restaurant_by_id(db: Session, restaurant_id: int):
    return db.query(Restaurant).filter(Restaurant.id == restaurant_id).first()

def get_restaurants(db: Session, limit: int = 10):
    return db.query(Restaurant).limit(limit).all()

def get_all_restaurants(db: Session):
    return db.query(Restaurant).all()

def get_restaurants_by_owner(db: Session, owner_id: int):
    # Truy vấn các nhà hàng mà owner đã đăng ký
    restaurants = db.query(Restaurant).filter(Restaurant.owner_id == owner_id).all()
    
    # Nếu không có nhà hàng nào, trả về một danh sách rỗng
    if not restaurants:
        return []
    
    return restaurants

def delete_restaurant(restaurant_id: int, db: Session):
    restaurant = db.query(Restaurant).filter(Restaurant.id == restaurant_id).first()
    if restaurant:
        db.delete(restaurant)
        db.commit()