from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from api.database import restaurant_db, user_db, review_db, feedback_db  # Adjust according to your structure
from dependencies import get_db, require_admin, get_current_admin
from api.schemas.restaurant import RestaurantCreate, RestaurantUpdate
from api.services.admin_service import (
    create_restaurant_admin,
    update_restaurant_admin,
    delete_restaurant_admin
)
from api.models.models import Restaurant, Review, Favorite, OwnerRequest, User
from typing import List
from api.models.models import User
from api.schemas.owner_request import OwnerRequestOut
from api.services import owner_request_service
from api.schemas.menu import MenuItemCreate, MenuItemSchema
from api.services.menu_service import add_menu_item
from dependencies import get_current_user
from fastapi import HTTPException

router = APIRouter(prefix="/api/admin", tags=["Admin"])

@router.post("/", response_model=dict)
def admin_create(
    data: RestaurantCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):
    return create_restaurant_admin(db, data)

@router.put("/{restaurant_id}", response_model=dict)
def admin_update(
    restaurant_id: int,
    data: RestaurantUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):
    return update_restaurant_admin(db, restaurant_id, data)

@router.delete("/{restaurant_id}", response_model=dict)
def admin_delete(
    restaurant_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):
    return delete_restaurant_admin(db, restaurant_id)

@router.get("/stats", response_model=dict)
def get_admin_stats(
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):
    return {
        "total_restaurants": db.query(Restaurant).count(),
        "total_reviews": db.query(Review).count(),
        "total_favorites": db.query(Favorite).count()
    }

@router.get("/owner-requests", response_model=list[OwnerRequestOut])
def get_all_pending_requests(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin)  # hàm kiểm tra quyền admin
):
    return owner_request_service.get_pending_requests(db)

@router.post("/approve-owner/{request_id}")
def approve_owner(
    request_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin)
):
    return owner_request_service.approve_owner_request(db, request_id)


# API lấy số lượng quán ăn
@router.get("/count/restaurants")
def count_restaurants(db: Session = Depends(get_db)):
    count = db.query(restaurant_db.Restaurant).count()
    return {"total_restaurants": count}

# API lấy số lượng người dùng
@router.get("/count/users")
def count_users(db: Session = Depends(get_db)):
    count = db.query(user_db.User).count()
    return {"total_users": count}

# API lấy số lượng đánh giá
@router.get("/count/reviews")
def count_reviews(db: Session = Depends(get_db)):
    count = db.query(review_db.Review).count()
    return {"total_reviews": count}

# API lấy số lượng đánh giá
@router.get("/count/feedbacks")
def count_reviews(db: Session = Depends(get_db)):
    count = db.query(feedback_db.User).count()
    return {"total_reviews": count}

@router.post("/{restaurant_id}/menu", response_model=MenuItemSchema)
def create_menu_item(
    restaurant_id: int,
    menu_data: MenuItemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Chỉ admin được phép thêm món.")
    return add_menu_item(db, restaurant_id, menu_data)
