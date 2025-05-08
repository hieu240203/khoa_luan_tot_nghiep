from api.database.feedback_db import log_recommend_click
from sqlalchemy.orm import Session

def record_recommend_feedback(db: Session, user_id: int, restaurant_id: int):
    return log_recommend_click(db, user_id, restaurant_id)
