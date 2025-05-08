# from fastapi import APIRouter, Depends, HTTPException, status
# from sqlalchemy.orm import Session
# from api.database.session import get_db
# from api.models.models import User
# from api.schemas.menu import MenuItemCreate, MenuItemUpdate
# from api.services.menu_service import add_menu_item, update_menu_item, delete_menu_item
# from dependencies import get_current_user
# from typing import List, Optional
# from api.services.menu_service import get_menu_by_restaurant_id
# from api.schemas.menu import MenuItemSchema

# router = APIRouter(
#     tags=["Owner - Menu Management"]
# )

# @router.post("/{restaurant_id}/menu", response_model=MenuItemSchema)
# def create_menu_item(
#     restaurant_id: str,
#     menu_data: MenuItemCreate,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     if current_user.role != "owner":
#         raise HTTPException(status_code=403, detail="Chỉ owner được phép thêm món.")
#     return add_menu_item(db, restaurant_id, menu_data)

# @router.put("/{restaurant_id}/menu/{menu_id}", response_model=dict)
# def edit_menu_item(
#     restaurant_id: str,
#     menu_id: str,
#     menu_data: MenuItemUpdate,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     if current_user.role != "owner":
#         raise HTTPException(status_code=403, detail="Chỉ owner được phép sửa món.")
#     return update_menu_item(db, restaurant_id, menu_id, menu_data)

# @router.delete("/{restaurant_id}/menu/{menu_id}", response_model=dict)
# def remove_menu_item(
#     restaurant_id: str,
#     menu_id: str,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     if current_user.role != "owner":
#         raise HTTPException(status_code=403, detail="Chỉ owner được phép xóa món.")
#     return delete_menu_item(db, restaurant_id, menu_id)


from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.database.session import get_db
from api.models.models import User
from api.schemas.menu import MenuItemCreate, MenuItemUpdate, MenuItemSchema
from api.services.menu_service import (
    add_menu_item,
    update_menu_item,
    delete_menu_item,
    get_menu_by_restaurant_id
)
from dependencies import get_current_user
from typing import List

router = APIRouter(tags=["Owner - Menu Management"])

@router.post("/{restaurant_id}/menu", response_model=MenuItemSchema)
def create_menu_item(
    restaurant_id: int,
    menu_data: MenuItemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "owner":
        raise HTTPException(status_code=403, detail="Chỉ owner được phép thêm món.")
    return add_menu_item(db, restaurant_id, menu_data)

@router.put("/{restaurant_id}/menu/{menu_id}", response_model=MenuItemSchema)
def edit_menu_item(
    restaurant_id: int,
    menu_id: int,
    menu_data: MenuItemUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "owner":
        raise HTTPException(status_code=403, detail="Chỉ owner được phép sửa món.")
    return update_menu_item(db, restaurant_id, menu_id, menu_data)

@router.delete("/{restaurant_id}/menu/{menu_id}", response_model=dict)
def remove_menu_item(
    restaurant_id: int,
    menu_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "owner":
        raise HTTPException(status_code=403, detail="Chỉ owner được phép xóa món.")
    return delete_menu_item(db, restaurant_id, menu_id)

@router.get("/{restaurant_id}/menu", response_model=List[MenuItemSchema])
def get_menu(
    restaurant_id: int,
    db: Session = Depends(get_db)
):
    return get_menu_by_restaurant_id(db, restaurant_id)
