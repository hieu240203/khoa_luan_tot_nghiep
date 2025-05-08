from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class RecommendFeedbackCreate(BaseModel):
    restaurant_id: int  

class RecommendFeedbackOut(BaseModel):
    user_id: int  
    restaurant_id: int  
    timestamp: datetime  

    class Config:
        from_attributes = True  
