# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from dependencies import get_db, get_current_user
# from api.models.models import Restaurant
# from api.schemas.restaurant import RestaurantCreate, RestaurantUpdate
# from datetime import datetime
# from api.schemas.owner_request import OwnerRequestOut, OwnerRequestCreate
# from api.services import owner_request_service
# from api.database import restaurant_db
# from typing import List
# from api.schemas.restaurant import RestaurantOut
# router = APIRouter()

# @router.post("/register")
# def register_restaurant(
#     data: RestaurantCreate,
#     db: Session = Depends(get_db),
#     user=Depends(get_current_user)  # Kiểm tra quyền của người dùng
# ):
#     if user.role != "owner":
#         raise HTTPException(
#             status_code=403,
#             detail="Bạn phải là chủ quán để tạo nhà hàng"
#         )
#     max_id = db.query(Restaurant.id).order_by(Restaurant.id.desc()).first()
#     next_id = (max_id[0] + 1) if max_id else 1

#     restaurant = Restaurant(
#         id=next_id,
#         name=data.name,
#         district=data.district,
#         city=data.city,
#         category=data.category,
#         cuisine_style=data.cuisine_style,
#         opening_hours=data.opening_hours,
#         images=data.images,
#         description=data.description, 
#         owner_id=user.id,
#         created_at=datetime.utcnow()
#     )
#     db.add(restaurant)
#     db.commit()
#     db.refresh(restaurant)
#     return {
#         "id": restaurant.id,
#         "name": restaurant.name,
#         "district": restaurant.district,
#         "city": restaurant.city,
#         "category": restaurant.category,
#         "cuisine_style": restaurant.cuisine_style,
#         "opening_hours": restaurant.opening_hours,
#         "images": restaurant.images,
#         "description": restaurant.description, 
#         "owner_id": restaurant.owner_id
#     }

# @router.put("/{restaurant_id}")
# def update_owned_restaurant(
#     restaurant_id: int,
#     data: RestaurantUpdate,
#     db: Session = Depends(get_db),
#     user=Depends(get_current_user)
# ):
#     restaurant = db.query(Restaurant).filter(Restaurant.id == restaurant_id, Restaurant.owner_id == user.id).first()
#     if not restaurant:
#         return {"error": "Not authorized"}
    
#     for key, value in data.dict(exclude_unset=True).items():
#         setattr(restaurant, key, value)
#     db.commit()
#     return {
#         "id": restaurant.id,
#         "name": restaurant.name,
#         "district": restaurant.district,
#         "city": restaurant.city,
#         "category": restaurant.category,
#         "cuisine_style": restaurant.cuisine_style,
#         "opening_hours": restaurant.opening_hours,
#         "images": restaurant.images,
#         "description": restaurant.description, 
#         "owner_id": restaurant.owner_id
#     }

# @router.post("/", response_model=OwnerRequestOut)
# def request_owner(
#     data: OwnerRequestCreate,
#     db: Session = Depends(get_db),
#     current_user=Depends(get_current_user)
# ):
#     if current_user.role == "owner":
#         raise HTTPException(status_code=400, detail="Bạn đã là chủ quán rồi.")
    
#     return owner_request_service.create_owner_request(db, current_user.id, data.message)

# @router.get("/owner/{owner_id}/total-restaurants")
# def get_total_restaurants(owner_id: int, db: Session =  Depends(get_db)):
#     total_restaurants = restaurant_db.get_restaurants_by_owner(db, owner_id)
#     if not total_restaurants:
#         raise HTTPException(status_code=404, detail="No restaurants found for this owner")
    
#     return {"total_restaurants": len(total_restaurants)}



# @router.get("/owner/{owner_id}/restaurants", response_model=List[RestaurantOut])
# def get_owner_restaurants(owner_id: int, db: Session):
#     restaurants = restaurant_db.get_restaurants_by_owner(db, owner_id)
#     if not restaurants:
#         raise HTTPException(status_code=404, detail="No restaurants found for this owner")
    
#     return restaurants


# @router.delete("/owner/{owner_id}/restaurant/{restaurant_id}")
# def delete_owner_restaurant(owner_id: int, restaurant_id: int, db: Session):
#     # Lấy thông tin nhà hàng cần xóa
#     restaurant = restaurant_db.get_restaurant_by_id(db, restaurant_id)
    
#     if not restaurant or restaurant.owner_id != owner_id:
#         raise HTTPException(status_code=404, detail="Restaurant not found or you do not have permission to delete it")
    
#     # Xóa nhà hàng
#     restaurant_db.delete_restaurant(restaurant_id, db)
    
#     return {"message": "Restaurant deleted successfully"}

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from dependencies import get_db, get_current_user
from api.models.models import Restaurant, User
from api.schemas.restaurant import RestaurantCreate, RestaurantUpdate, RestaurantOut
from api.schemas.owner_request import OwnerRequestOut, OwnerRequestCreate
from api.services import owner_request_service
from api.database import restaurant_db
from datetime import datetime
from typing import List 

router = APIRouter()

# Tạo nhà hàng mới (chỉ owner được phép)
@router.post("/register")
def register_restaurant(
    data: RestaurantCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    if user.role != "owner":
        raise HTTPException(status_code=403, detail="Bạn phải là chủ quán để tạo nhà hàng")

    max_id = db.query(Restaurant.id).order_by(Restaurant.id.desc()).first()
    next_id = (max_id[0] + 1) if max_id else 1

    restaurant = Restaurant(
        id=next_id,
        name=data.name,
        district=data.district,
        city=data.city,
        price_range=data.price_range,
        category=data.category,
        cuisine_style=data.cuisine_style,
        target_audience=data.target_audience,
        opening_hours=data.opening_hours,
        images=data.images,
        description=data.description,
        owner_id=user.id,
        created_at=datetime.utcnow()
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
        "target_audience": restaurant.target_audience,
        "opening_hours": restaurant.opening_hours,
        "images": restaurant.images,
        "description": restaurant.description,
        "owner_id": restaurant.owner_id
    }

# Cập nhật nhà hàng của owner
@router.put("/{restaurant_id}")
def update_owned_restaurant(
    restaurant_id: int,
    data: RestaurantUpdate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    restaurant = db.query(Restaurant).filter(Restaurant.id == restaurant_id, Restaurant.owner_id == user.id).first()
    if not restaurant:
        raise HTTPException(status_code=403, detail="Không có quyền cập nhật nhà hàng này")

    for key, value in data.dict(exclude_unset=True).items():
        setattr(restaurant, key, value)

    db.commit()
    db.refresh(restaurant)

    return {
        "id": restaurant.id,
        "name": restaurant.name,
        "district": restaurant.district,
        "city": restaurant.city,
        "category": restaurant.category,
        "cuisine_style": restaurant.cuisine_style,
        "opening_hours": restaurant.opening_hours,
        "images": restaurant.images,
        "description": restaurant.description,
        "owner_id": restaurant.owner_id
    }

# Gửi yêu cầu xin làm owner
@router.post("/", response_model=OwnerRequestOut)
def request_owner(
    data: OwnerRequestCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role == "owner":
        raise HTTPException(status_code=400, detail="Bạn đã là chủ quán rồi")

    return owner_request_service.create_owner_request(db, current_user.id, data.message)

# Lấy tổng số nhà hàng mà owner đang sở hữu
@router.get("/owner/{owner_id}/total-restaurants")
def get_total_restaurants(
    owner_id: int,
    db: Session = Depends(get_db)
):
    total_restaurants = restaurant_db.get_restaurants_by_owner(db, owner_id)
    if not total_restaurants:
        raise HTTPException(status_code=404, detail="Không tìm thấy nhà hàng nào")

    return {"total_restaurants": len(total_restaurants)}

# Lấy danh sách nhà hàng của owner
@router.get("/owner/{owner_id}/restaurants", response_model=List[RestaurantOut])
def get_owner_restaurants(
    owner_id: int,
    db: Session = Depends(get_db)
):
    restaurants = restaurant_db.get_restaurants_by_owner(db, owner_id)
    if not restaurants:
        raise HTTPException(status_code=404, detail="Không tìm thấy nhà hàng nào")

    return restaurants

# Xóa nhà hàng thuộc về owner
@router.delete("/owner/{owner_id}/restaurant/{restaurant_id}")
def delete_owner_restaurant(
    owner_id: int,
    restaurant_id: int,
    db: Session = Depends(get_db)
):
    restaurant = restaurant_db.get_restaurant_by_id(db, restaurant_id)
    if not restaurant or restaurant.owner_id != owner_id:
        raise HTTPException(status_code=404, detail="Không tìm thấy hoặc không có quyền xóa nhà hàng này")

    restaurant_db.delete_restaurant(restaurant_id, db)
    return {"message": "Xóa nhà hàng thành công"}
