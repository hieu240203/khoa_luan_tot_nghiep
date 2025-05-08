# from sqlalchemy.orm import Session
# from api.models.models import MenuItem
# from fastapi import HTTPException
# import uuid
# from datetime import datetime
# from api.models.models import MenuItem
# from api.schemas.menu import MenuItemCreate

# def add_menu_item(db: Session, restaurant_id: str, data: MenuItemCreate) -> MenuItem:
#     new_item = MenuItem(
#         id=str(uuid.uuid4()),
#         name=data.name,
#         description=data.description,
#         price=data.price,
#         image_url=data.image_url,
#         restaurant_id=restaurant_id,
#         created_at=datetime.utcnow()
#     )
#     db.add(new_item)
#     db.commit()
#     db.refresh(new_item)
#     return new_item 

# def update_menu_item(db: Session, restaurant_id: str, menu_id: str, data):
#     menu_item = db.query(MenuItem).filter(MenuItem.id == menu_id, MenuItem.restaurant_id == restaurant_id).first()
#     if not menu_item:
#         raise HTTPException(status_code=404, detail="Menu item not found.")

#     for key, value in data.dict(exclude_unset=True).items():
#         setattr(menu_item, key, value)

#     db.commit()
#     db.refresh(menu_item)
#     return menu_item

# def delete_menu_item(db: Session, restaurant_id: str, menu_id: str):
#     menu_item = db.query(MenuItem).filter(MenuItem.id == menu_id, MenuItem.restaurant_id == restaurant_id).first()
#     if not menu_item:
#         raise HTTPException(status_code=404, detail="Menu item not found.")

#     db.delete(menu_item)
#     db.commit()
#     return {"message": "Menu item deleted successfully."}

# def get_menu_by_restaurant_id(db: Session, restaurant_id: str):
#     return db.query(MenuItem).filter(MenuItem.restaurant_id == restaurant_id).all()

from sqlalchemy.orm import Session
from fastapi import HTTPException
from api.models.models import MenuItem
from api.schemas.menu import MenuItemCreate, MenuItemUpdate
from datetime import datetime

def add_menu_item(db: Session, restaurant_id: int, data: MenuItemCreate) -> MenuItem:
    new_item = MenuItem(
        name=data.name,
        description=data.description,
        price=data.price,
        image_url=data.image_url,
        restaurant_id=restaurant_id,
        created_at=datetime.utcnow()
    )
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item

def update_menu_item(db: Session, restaurant_id: int, menu_id: int, data: MenuItemUpdate) -> MenuItem:
    menu_item = db.query(MenuItem).filter(
        MenuItem.id == menu_id,
        MenuItem.restaurant_id == restaurant_id
    ).first()

    if not menu_item:
        raise HTTPException(status_code=404, detail="Menu item not found.")

    for key, value in data.dict(exclude_unset=True).items():
        setattr(menu_item, key, value)

    db.commit()
    db.refresh(menu_item)
    return menu_item

def delete_menu_item(db: Session, restaurant_id: int, menu_id: int) -> dict:
    menu_item = db.query(MenuItem).filter(
        MenuItem.id == menu_id,
        MenuItem.restaurant_id == restaurant_id
    ).first()

    if not menu_item:
        raise HTTPException(status_code=404, detail="Menu item not found.")

    db.delete(menu_item)
    db.commit()
    return {"message": "Menu item deleted successfully."}

def get_menu_by_restaurant_id(db: Session, restaurant_id: int) -> list[MenuItem]:
    return db.query(MenuItem).filter(MenuItem.restaurant_id == restaurant_id).all()
