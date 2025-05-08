from api.models.models import RecommendFeedback
from sqlalchemy.orm import Session
from datetime import datetime

def log_recommend_click(db: Session, user_id: int, restaurant_id: int):
    # Tạo bản ghi cho lượt click của người dùng vào nhà hàng
    record = RecommendFeedback(
        user_id=user_id,
        restaurant_id=restaurant_id,
        timestamp=datetime.utcnow()  # Ghi nhận thời gian click
    )

    # Thêm bản ghi vào cơ sở dữ liệu
    db.add(record)
    db.commit()
    db.refresh(record)  # Làm mới bản ghi vừa thêm

    return record  # Trả về bản ghi đã được lưu vào database
