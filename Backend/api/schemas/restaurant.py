from pydantic import BaseModel
from typing import Optional, List

# Mô hình cho Menu Item
class MenuItemCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: Optional[str] = None
    image_url: Optional[str] = None

# Mô hình cho việc tạo nhà hàng
class RestaurantCreate(BaseModel):
    name: str
    district: Optional[str] = None  
    city: Optional[str] = None  
    price_range: Optional[str] = None
    category: Optional[str] = None
    cuisine_style: Optional[str] = None
    target_audience: Optional[str] = None
    opening_hours: Optional[str] = None
    images: Optional[str] = None
    description: Optional[str] = None
    menu_items: Optional[List[MenuItemCreate]] = None  

# Mô hình cho việc cập nhật thông tin nhà hàng
class RestaurantUpdate(BaseModel):
    name: Optional[str]
    district: Optional[str]
    city: Optional[str]  
    price_range: Optional[str]
    category: Optional[str]
    cuisine_style: Optional[str]
    target_audience: Optional[str]
    opening_hours: Optional[str]
    images: Optional[str]
    description: Optional[str]

# Mô hình cho việc lấy thông tin nhà hàng
class RestaurantOut(BaseModel):
    id: int  # ✅ Sửa từ str sang int
    name: str
    district: Optional[str]  
    city: Optional[str]  
    price_range: Optional[str]
    category: Optional[str]
    target_audience: Optional[str]
    cuisine_style: Optional[str]
    opening_hours: Optional[str]
    description: Optional[str]
    total_reviews: int
    average_rating: float
    images: Optional[str]

    class Config:
        from_attributes = True 
