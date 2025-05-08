from sqlalchemy.orm import Session
from fastapi import HTTPException
from api.models.models import OwnerRequest, User, StatusEnum  

def create_owner_request(db: Session, user_id: int, message: str = None):
    existing = db.query(OwnerRequest).filter_by(user_id=user_id, status=StatusEnum.pending).first()
    if existing:
        raise HTTPException(status_code=400, detail="Bạn đã gửi yêu cầu trước đó rồi.")

    request = OwnerRequest(user_id=user_id, message=message)
    db.add(request)
    db.commit()
    db.refresh(request)
    return request

def get_pending_requests(db: Session):
    return db.query(OwnerRequest).filter(OwnerRequest.status == StatusEnum.pending).all()

def approve_owner_request(db: Session, request_id: int):
    request = db.query(OwnerRequest).filter_by(id=request_id).first()
    if not request or request.status != StatusEnum.pending:
        raise HTTPException(status_code=404, detail="Yêu cầu không hợp lệ")

    user = db.query(User).filter_by(id=request.user_id).first()
    user.role = "owner"
    request.status = StatusEnum.approved
    db.commit()
    return {"message": "Đã cấp quyền chủ quán"}
