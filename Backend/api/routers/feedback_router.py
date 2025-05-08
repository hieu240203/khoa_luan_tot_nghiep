from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from dependencies import get_db, get_current_user
from api.schemas.feedback import RecommendFeedbackCreate, RecommendFeedbackOut
from api.services.feedback_service import record_recommend_feedback

router = APIRouter()

@router.post("/recommend-click", response_model=RecommendFeedbackOut)
def click_feedback(
    data: RecommendFeedbackCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    return record_recommend_feedback(
        db=db,
        user_id=user.id,
        restaurant_id=data.restaurant_id,
    )
