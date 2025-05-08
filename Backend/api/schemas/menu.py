# from pydantic import BaseModel
# from typing import List, Optional

# class MenuItemCreate(BaseModel):
#     name: str
#     description: Optional[str] = None
#     price: Optional[str] = None
#     image_url: Optional[str] = None

# class MenuItemUpdate(BaseModel):
#     name: Optional[str]
#     description: Optional[str]
#     price: Optional[str]
#     image_url: Optional[str]

# class MenuItemSchema(BaseModel):
#     id: str
#     name: str
#     description: Optional[str] = None
#     price: Optional[str] = None
#     image_url: Optional[str] = None

#     class Config:
#         from_attributes = True  # ✅ Chính xác

from pydantic import BaseModel
from typing import Optional

class MenuItemCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: Optional[str] = None
    image_url: Optional[str] = None

class MenuItemUpdate(BaseModel):
    name: Optional[str]
    description: Optional[str]
    price: Optional[str]
    image_url: Optional[str]

class MenuItemSchema(BaseModel):
    id: int                
    name: str
    description: Optional[str] = None
    price: Optional[str] = None
    image_url: Optional[str] = None
    restaurant_id: int     

    class Config:
        from_attributes = True  
