from sqlalchemy.orm import Session
from api.models.models import Favorite

def add_favorite(db: Session, user_id: int, restaurant_id: int):  
    favorite = Favorite(user_id=user_id, restaurant_id=restaurant_id)
    db.add(favorite)
    db.commit()
    db.refresh(favorite)
    return favorite

def get_user_favorites(db: Session, user_id: int): 
    return db.query(Favorite).filter(Favorite.user_id == user_id).all()
