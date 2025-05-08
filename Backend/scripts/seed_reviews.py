import pandas as pd
from sqlalchemy.orm import Session
from datetime import datetime
from api.database.session import SessionLocal
from api.models.models import Review
import uuid

def insert_fake_reviews():
    db: Session = SessionLocal()

    # Load dữ liệu đánh giá và dữ liệu nhà hàng
    df_reviews = pd.read_csv("D:/Khóa luận tốt nghiệp/Backend/data/User đánh giá quán ăn.csv", encoding="utf-8-sig")
    df_restaurants = pd.read_csv("D:/Khóa luận tốt nghiệp/Backend/data/restaurant_data.csv", encoding="utf-8-sig")

    # Tiền xử lý
    df_reviews.columns = df_reviews.columns.str.strip().str.lower().str.replace(" ", "_")
    df_restaurants.columns = df_restaurants.columns.str.strip().str.lower().str.replace(" ", "_")

    # Chỉ lấy đánh giá từ user_id 1–50
    df_reviews = df_reviews[df_reviews['user_id'].between(1, 50)]

    # Tạo mapping link -> restaurant_id
    link_to_restaurant_id = dict(zip(df_restaurants['link'], df_restaurants['restaurant_id']))

    added_count = 0
    for _, row in df_reviews.iterrows():
        restaurant_link = row['link_quán']
        restaurant_id = link_to_restaurant_id.get(restaurant_link)

        if restaurant_id is None:
            print(f"Không tìm thấy restaurant_id cho link: {restaurant_link}")
            continue

        try:
            review = Review(
                user_id=int(row['user_id']),
                restaurant_id=int(restaurant_id),
                rating=float(row['điểm_đánh_giá']),
                comment=row.get('nội_dung_bình_luận', None),
                images=None,
                created_at=datetime.utcnow()
            )
            db.add(review)
            added_count += 1
        except Exception as e:
            print(f"Lỗi khi thêm review: {e}")

    db.commit()
    db.close()
    print(f"Đã thêm {added_count} review vào database.")

if __name__ == "__main__":
    insert_fake_reviews()
