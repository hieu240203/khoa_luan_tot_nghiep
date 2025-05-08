from sqlalchemy.orm import Session
from api.models.models import MenuItem

def get_menu_by_restaurant(db: Session, restaurant_id: int):
    return db.query(MenuItem).filter(MenuItem.restaurant_id == restaurant_id).all()
