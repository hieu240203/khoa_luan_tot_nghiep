# from sqlalchemy.orm import Session
# from api.database.user_db import get_user_by_username, get_user_by_email, create_user
# from api.models.models import User
# from api.core.security import hash_password, verify_password, create_access_token
# from fastapi import HTTPException
# import uuid
# from datetime import timedelta

# def register_user(db: Session, username, email, password, full_name=None, age=None, occupation=None, district =None, city=None, favorite_cuisine=None):
#     if get_user_by_username(db, username) or get_user_by_email(db, email):
#         raise HTTPException(status_code=400, detail="Username or email already exists")

#     user = User(
#         id=str(uuid.uuid4()),
#         username=username,
#         email=email,
#         full_name=full_name,
#         password_hash=hash_password(password),
#         age=age,
#         occupation=occupation, 
#         district = district ,  
#         city = city,          
#         favorite_cuisine = favorite_cuisine
#     )
#     return create_user(db, user)

# def login_user(db: Session, email: str, password: str):
#     user = get_user_by_email(db, email)
#     if not user or not verify_password(password, user.password_hash):
#         raise HTTPException(status_code=401, detail="Invalid credentials")

#     token = create_access_token({"sub": user.id}, timedelta(minutes=60 * 24))
#     return token, user

from sqlalchemy.orm import Session
from api.database.user_db import get_user_by_username, get_user_by_email, create_user
from api.models.models import User
from api.core.security import hash_password, verify_password, create_access_token
from fastapi import HTTPException
from datetime import timedelta

# Hàm đăng ký người dùng
def register_user(
    db: Session,
    username: str,
    email: str,
    password: str,
    full_name: str = None,
    age: int = None,
    occupation: str = None,
    district: str = None,
    city: str = None,
    favorite_cuisine: str = None
):
    # Kiểm tra nếu username hoặc email đã tồn tại trong hệ thống
    if get_user_by_username(db, username) or get_user_by_email(db, email):
        raise HTTPException(status_code=400, detail="Username or email already exists")

    # Tạo đối tượng User mới (id được tự động tạo do autoincrement)
    user = User(
        username=username,
        email=email,
        full_name=full_name,
        password_hash=hash_password(password),
        age=age,
        occupation=occupation,
        district=district,
        city=city,
        favorite_cuisine=favorite_cuisine,
    )

    return create_user(db, user)

# Hàm đăng nhập người dùng
def login_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    
    if not user or not verify_password(password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(
        data={"sub": str(user.id)},  # ID dạng int nhưng nên chuyển về str trong JWT
        expires_delta=timedelta(minutes=60 * 24)
    )
    return token, user
