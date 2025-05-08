from api.database.favorite_db import add_favorite, get_user_favorites
from sqlalchemy.orm import Session
from api.models.models import Favorite

def add_favorite_service(db: Session, user_id: int, restaurant_id: int):
    return add_favorite(db, user_id, restaurant_id)

def get_favorites_service(db: Session, user_id: int):
    return get_user_favorites(db, user_id)

def remove_favorite_service(db: Session, user_id: int, restaurant_id: int):
    favorite = db.query(Favorite).filter(
        Favorite.user_id == user_id,
        Favorite.restaurant_id == restaurant_id
    ).first()

    if not favorite:
        return False

    db.delete(favorite)
    db.commit()
    return True
