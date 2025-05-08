from fastapi import FastAPI
from api.routers import (
    auth_router, 
    restaurant_router, 
    review_router, 
    favorite_router, 
    admin_router, 
    owner_router, 
    feedback_router,
    menu_router, 
    recommendation_router
)
from dependencies import add_middlewares
from api.models.models import Base
from api.database.session import engine
import logging

logging.basicConfig(level=logging.DEBUG)

app = FastAPI()

# Gọi middleware sau khi tạo app
add_middlewares(app)

# Tạo bảng khi startup
@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

# Gắn router
app.include_router(auth_router.router, prefix="/api/auth", tags=["Auth"])
app.include_router(restaurant_router.router, prefix="/api/restaurants", tags=["Restaurants"])
app.include_router(review_router.router, prefix="/api/reviews", tags=["Reviews"])
app.include_router(favorite_router.router, prefix="/api/favorites", tags=["Favorites"])
app.include_router(admin_router.router, prefix="/api/admin", tags=["Admin"])
app.include_router(owner_router.router, prefix="/api/owner", tags=["Owner"])
app.include_router(feedback_router.router, prefix="/api/feedback", tags=["Feedback"])
app.include_router(menu_router.router, prefix="/api/owner", tags=["Owner - Menu Management"])
app.include_router(recommendation_router.router, prefix="/api/recommend", tags=["Recommendation"])
