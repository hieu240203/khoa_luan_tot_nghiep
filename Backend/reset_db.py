# reset_db.py

from api.models import models  # import tất cả các model
from api.database.session import engine

def reset_database():
    print("Xóa toàn bộ bảng trong database...")
    models.Base.metadata.drop_all(bind=engine)
    print("Đã xóa xong bảng.")

    print("🛠 Tạo lại bảng theo models...")
    models.Base.metadata.create_all(bind=engine)
    print("Tạo bảng thành công!")

if __name__ == "__main__":
    reset_database()
