from fastapi import HTTPException
from fastapi import APIRouter, Query, Depends
from sqlalchemy.orm import Session
from typing import List, Optional
from api.schemas.restaurant import RestaurantOut
from api.services.restaurant_service import search_restaurant_service
from dependencies import get_db
from api.services.restaurant_service import get_restaurant_detail_service
from api.database.restaurant_db import get_restaurants
from api.schemas.menu import MenuItemSchema
from api.services.menu_service import get_menu_by_restaurant_id

router = APIRouter()

# API tìm kiếm nhà hàng
@router.get("/search", response_model=List[RestaurantOut])
def search_restaurants(
    keyword: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    cuisine_style: Optional[str] = Query(None),
    city: Optional[str] = Query(None),
    district: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    return search_restaurant_service(
        db=db,
        keyword=keyword,
        category=category,
        cuisine_style=cuisine_style,
        city=city,
        district=district,
    )

# API lấy chi tiết nhà hàng
@router.get("/{restaurant_id}", response_model=RestaurantOut)
def get_restaurant_detail(restaurant_id: int, db: Session = Depends(get_db)):
    return get_restaurant_detail_service(db, restaurant_id)

# API lấy danh sách nhà hàng với giới hạn
@router.get("/", response_model=List[RestaurantOut])
def list_restaurants(limit: int = Query(10, ge=1), db: Session = Depends(get_db)):
    return get_restaurants(db, limit)

# API lấy menu của nhà hàng
@router.get("/{restaurant_id}/menu", response_model=List[MenuItemSchema])
def get_public_menu(
    restaurant_id: int,
    db: Session = Depends(get_db)
):
    return get_menu_by_restaurant_id(db, restaurant_id)

