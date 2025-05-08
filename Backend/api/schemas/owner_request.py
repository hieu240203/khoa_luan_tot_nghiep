from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum

class StatusEnum(str, Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"

class OwnerRequestCreate(BaseModel):
    message: Optional[str] = None

class OwnerRequestOut(BaseModel):
    id: int
    user_id: int
    message: Optional[str]
    status: StatusEnum
    created_at: datetime

    class Config:
        from_attributes  = True
