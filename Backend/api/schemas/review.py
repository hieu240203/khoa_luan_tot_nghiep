from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ReviewCreate(BaseModel):
    restaurant_id: int         # ✅ Sửa từ str → int
    rating: float
    comment: Optional[str] = None
    images: Optional[str] = None  # Nếu upload ảnh sau, lưu URL vào đây

class ReviewOut(BaseModel):
    id: int                    # ✅ Sửa từ str → int
    restaurant_id: int         # ✅
    user_id: int               # ✅
    rating: float
    comment: Optional[str] = None
    images: Optional[str] = None
    created_at: datetime
    reply: Optional[str] = None
    reply_by_user_id: Optional[int] = None  # ✅

    # 👇 user_name là giá trị thủ công được backend thêm vào, không lấy từ ORM
    user_name: Optional[str] = None

    class Config:
        from_attributes = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
