from sqlalchemy import Column, String, DateTime, Enum, ForeignKey, Text, Float, Integer, Boolean
from sqlalchemy.orm import relationship, declarative_base
from datetime import datetime
import enum

Base = declarative_base()

class UserRole(str, enum.Enum):
    user = "user"
    admin = "admin"
    owner = "owner"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)  # Đã sửa
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    full_name = Column(String(100))
    age = Column(Integer, nullable=True)
    occupation = Column(String(100), nullable=True)
    district = Column(String(100), nullable=True)
    city = Column(String(100), nullable=True)
    favorite_cuisine  = Column(String(100), nullable=True)
    role = Column(Enum(UserRole), default=UserRole.user)
    created_at = Column(DateTime, default=datetime.utcnow)
    is_admin = Column(Boolean, default=False)

    owner_requests = relationship("OwnerRequest", back_populates="user")
    restaurants = relationship("Restaurant", back_populates="owner")
    favorites = relationship("Favorite", back_populates="user")
    reviews = relationship("Review", back_populates="user", foreign_keys="Review.user_id")
    replies = relationship("Review", back_populates="replier", foreign_keys="Review.reply_by_user_id")


class Restaurant(Base):
    __tablename__ = "restaurants"

    id = Column(Integer, primary_key=True, autoincrement=False)  # Đã sửa
    name = Column(String(100), nullable=False)
    district = Column(String(100), nullable=False)
    city = Column(String(100), nullable=False)
    price_range = Column(String(100))
    category = Column(String(300))
    cuisine_style = Column(String(50))
    opening_hours = Column(String(100))
    images = Column(Text)
    target_audience = Column(String(100))
    owner_id = Column(Integer, ForeignKey("users.id"))  # Đã sửa
    created_at = Column(DateTime, default=datetime.utcnow)
    total_reviews = Column(Integer, default=0)
    average_rating = Column(Float, default=0.0)
    description = Column(Text, nullable=True)

    owner = relationship("User", back_populates="restaurants")
    reviews = relationship("Review", back_populates="restaurant")
    favorites = relationship("Favorite", back_populates="restaurant")
    menu_items = relationship("MenuItem", back_populates="restaurant")


class MenuItem(Base):
    __tablename__ = "menu_items"

    id = Column(Integer, primary_key=True, autoincrement=True)  # Đã sửa
    name = Column(String(100), nullable=False)
    description = Column(Text)
    price = Column(String(50), nullable=True)
    image_url = Column(String(255))
    restaurant_id = Column(Integer, ForeignKey("restaurants.id"))  # Đã sửa
    restaurant = relationship("Restaurant", back_populates="menu_items")
    created_at = Column(DateTime, default=datetime.utcnow)


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, autoincrement=True)  # Đã sửa
    restaurant_id = Column(Integer, ForeignKey("restaurants.id"))  # Đã sửa
    user_id = Column(Integer, ForeignKey("users.id"))  # Đã sửa
    rating = Column(Float, nullable=False)
    comment = Column(Text)
    images = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

    reply = Column(Text, nullable=True)
    reply_by_user_id = Column(Integer, ForeignKey("users.id"), nullable=True)  # Đã sửa

    restaurant = relationship("Restaurant", back_populates="reviews")
    user = relationship("User", back_populates="reviews", foreign_keys=[user_id])
    replier = relationship("User", back_populates="replies", foreign_keys=[reply_by_user_id])


class Favorite(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True, autoincrement=True)  # Đã sửa
    user_id = Column(Integer, ForeignKey("users.id"))  # Đã sửa
    restaurant_id = Column(Integer, ForeignKey("restaurants.id"))  # Đã sửa
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="favorites")
    restaurant = relationship("Restaurant", back_populates="favorites")


class RecommendFeedback(Base):
    __tablename__ = "recommend_feedback"

    id = Column(Integer, primary_key=True, autoincrement=True)  
    user_id = Column(Integer, nullable=False)  # Đã sửa
    restaurant_id = Column(Integer, nullable=False)  # Đã sửa
    timestamp = Column(DateTime, default=datetime.utcnow)


class StatusEnum(str, enum.Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"


class OwnerRequest(Base):
    __tablename__ = "owner_requests"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)  # Đã sửa
    status = Column(Enum(StatusEnum), default=StatusEnum.pending)
    message = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="owner_requests")

# class RecommendSession(Base):
#     __tablename__ = "recommend_session"

#     id = Column(Integer, primary_key=True, index=True, autoincrement=True)
#     user_id = Column(Integer, nullable=False)
#     algorithm_type = Column(String(50), nullable=False)
#     restaurant_ids = Column(JSON, nullable=False)
#     timestamp = Column(DateTime, default=datetime.utcnow)
