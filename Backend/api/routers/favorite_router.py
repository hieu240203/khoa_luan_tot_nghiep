from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from dependencies import get_db, get_current_user
from api.schemas.favorite import FavoriteCreate, FavoriteOut
from api.services.favorite_service import (
    add_favorite_service,
    get_favorites_service,
    remove_favorite_service
)
from typing import List

router = APIRouter(
    tags=["Favorites"]
)

# Thêm yêu thích
@router.post("/", response_model=FavoriteOut)
def add_to_favorite(
    data: FavoriteCreate,  # ✅ đảm bảo restaurant_id là int
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    try:
        return add_favorite_service(db, user.id, data.restaurant_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error: {str(e)}")

# Lấy danh sách yêu thích
@router.get("/", response_model=List[FavoriteOut])
def list_favorites(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    try:
        return get_favorites_service(db, user.id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

# Xoá yêu thích
@router.delete("/{restaurant_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_from_favorite(
    restaurant_id: int,  # ✅ sửa từ UUID sang int
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    try:
        success = remove_favorite_service(db, user.id, restaurant_id)
        if not success:
            raise HTTPException(status_code=404, detail="Không tìm thấy yêu thích để xoá.")
        return {"message": "Đã bỏ yêu thích thành công."}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error: {str(e)}")
