# from pydantic import BaseModel, EmailStr
# from typing import Optional
# import enum
# from enum import Enum   

# class UserRole(str, Enum):
#     user = "user"
#     admin = "admin"
#     owner = "owner"

# class UserCreate(BaseModel):
#     username: str
#     email: EmailStr
#     password: str
#     full_name: Optional[str] = None
#     age: Optional[int] = None
#     occupation: Optional[str] = None
#     role: UserRole = UserRole.user
#     district: Optional[str] = None  
#     city: Optional[str] = None  
#     favorite_cuisine: Optional[str] = None  

# class UserLogin(BaseModel):
#     username: str
#     password: str

# class Token(BaseModel):
#     access_token: str
#     token_type: str = "bearer"

# class UserResponse(BaseModel):
#     id: str
#     username: str
#     email: str
#     full_name: Optional[str] = None
#     age: Optional[int] = None
#     occupation: Optional[str] = None
#     role: str
#     is_admin: Optional[bool] = False
#     district: Optional[str]  
#     city: Optional[str]      
#     favorite_cuisine: Optional[str]
#     class Config:
#         from_attributes = True

# class UserProfile(BaseModel):
#     age: int
#     occupation: str
#     district: str
#     city: str
#     food_style: str = None

from pydantic import BaseModel, EmailStr
from typing import Optional
import enum
from enum import Enum

# Enum cho các vai trò người dùng
class UserRole(str, Enum):
    user = "user"
    admin = "admin"
    owner = "owner"

# Mô hình tạo người dùng
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    full_name: Optional[str] = None
    age: Optional[int] = None
    occupation: Optional[str] = None
    role: UserRole = UserRole.user
    district: Optional[str] = None
    city: Optional[str] = None
    favorite_cuisine: Optional[str] = None

# Mô hình đăng nhập người dùng
class UserLogin(BaseModel):
    username: str
    password: str

# Mô hình token trả về khi đăng nhập
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

# Mô hình phản hồi thông tin người dùng
class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    full_name: Optional[str] = None
    age: Optional[int] = None
    occupation: Optional[str] = None
    role: str
    is_admin: Optional[bool] = False
    district: Optional[str]
    city: Optional[str]
    favorite_cuisine: Optional[str]

    class Config:
        from_attributes = True

# Mô hình hồ sơ người dùng
class UserProfile(BaseModel):
    age: int
    occupation: str
    district: str
    city: str
    food_style: Optional[str] = None
