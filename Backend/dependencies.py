# from fastapi import Depends, HTTPException, status
# from fastapi.security import OAuth2PasswordBearer
# from sqlalchemy.orm import Session
# from jose import JWTError, jwt
# from api.database.session import SessionLocal
# from api.models.models import User
# from api.core.security import SECRET_KEY, ALGORITHM

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()


# def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         user_id: str = payload.get("sub")
#         if user_id is None:
#             raise credentials_exception
#     except JWTError:
#         raise credentials_exception

#     user = db.query(User).filter(User.id == user_id).first()
#     if user is None:
#         raise credentials_exception
#     return user

# def require_admin(user: User = Depends(get_current_user)):
#     if not user.is_admin:
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="Admin access required"
#         )
#     return user

# def get_current_user_role(db: Session = Depends(SessionLocal), user_id: str = Depends(get_current_user)):
#     user = db.query(User).filter(User.id == user_id).first()
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")
#     if user.role not in ['admin', 'owner']:
#         raise HTTPException(status_code=403, detail="Not authorized to create a restaurant")
#     return user

# def get_current_admin(current_user: User = Depends(get_current_user)):
#     if current_user.role != "admin":
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="Bạn không có quyền admin"
#         )
#     return current_user

# def add_middlewares(app):
#     from fastapi.middleware.cors import CORSMiddleware
#     app.add_middleware(
#         CORSMiddleware,
#         allow_origins=["http://localhost:3000"],  
#         allow_credentials=True,  
#         allow_methods=["*"],  
#         allow_headers=["*"],  
#     )

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from api.database.session import SessionLocal
from api.models.models import User
from api.core.security import SECRET_KEY, ALGORITHM

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

# Dependency tạo phiên DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Lấy người dùng hiện tại từ token
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise credentials_exception
        user_id = int(user_id)  # Chuyển từ chuỗi sang int
    except (JWTError, ValueError):
        raise credentials_exception

    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise credentials_exception
    return user

# Kiểm tra quyền admin
def require_admin(user: User = Depends(get_current_user)) -> User:
    if not user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    return user

# Kiểm tra người dùng có quyền owner hoặc admin để tạo nhà hàng
def get_current_user_role(user: User = Depends(get_current_user)) -> User:
    if user.role not in ['admin', 'owner']:
        raise HTTPException(status_code=403, detail="Not authorized to create a restaurant")
    return user

# Chỉ cho phép admin truy cập
def get_current_admin(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Bạn không có quyền admin"
        )
    return current_user

# Thêm middleware cho ứng dụng
def add_middlewares(app):
    from fastapi.middleware.cors import CORSMiddleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],  
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
