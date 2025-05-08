# scripts/seed_data.py

import pandas as pd
from sqlalchemy.orm import Session
from api.database.session import SessionLocal
from api.models.models import Restaurant, MenuItem
from datetime import datetime
import uuid
import os

def seed_data():
    db: Session = SessionLocal()

    try:
        # Load dữ liệu
        df_restaurants = pd.read_csv(r"D:\Khóa luận tốt nghiệp\Backend\data\restaurant_data.csv", encoding="utf-8-sig")
        df_menu = pd.read_csv(r"D:\Khóa luận tốt nghiệp\Backend\data\menu.csv", encoding="utf-8-sig")

        # Chuẩn hóa tên cột
        df_restaurants.columns = df_restaurants.columns.str.strip().str.lower().str.replace(" ", "_")
        df_menu.columns = df_menu.columns.str.strip().str.lower().str.replace(" ", "_")

        # Xử lý NaN thành None
        df_restaurants = df_restaurants.where(pd.notnull(df_restaurants), None)
        df_menu = df_menu.where(pd.notnull(df_menu), None)

        restaurant_name_to_id = {}

        # Thêm nhà hàng
        for _, row in df_restaurants.iterrows():
            try:
                restaurant = Restaurant(
                    id=int(row["restaurant_id"]),
                    name=row["tên_nhà_hàng"],
                    district=row.get("quận"),
                    city=row.get("thành_phố"),
                    category=row.get("loại_hình"),
                    cuisine_style=row.get("phong_cách_món_ăn"),
                    target_audience=row.get("đối_tượng_phù_hợp"),
                    price_range=row.get("khoảng_giá"),
                    opening_hours=row.get("giờ_mở_cửa") if row.get("giờ_mở_cửa") else None,
                    images=row.get("image"),
                    total_reviews=row.get("tổng_số_bình_luận") or 0,
                    average_rating=row.get("đánh_giá_trung_bình") or 0.0,
                    description=None,
                    created_at=datetime.utcnow(),
                )
                db.add(restaurant)
                restaurant_name_to_id[row["tên_nhà_hàng"]] = restaurant.id
            except Exception as e:
                print(f"Lỗi thêm nhà hàng {row.get('tên_nhà_hàng')}: {e}")

        db.commit()

        # Thêm món ăn
        for _, row in df_menu.iterrows():
            try:
                restaurant_name = row.get("tên_nhà_hàng")
                restaurant_id = restaurant_name_to_id.get(restaurant_name)

                if restaurant_id:
                    item = MenuItem(
                        name=row.get("tên_món"),
                        price=row.get("giá"),
                        image_url=row.get("hình_ảnh_món_ăn") or None,
                        restaurant_id=int(restaurant_id),
                        created_at=datetime.utcnow(),
                    )
                    db.add(item)
                else:
                    print(f"[Không tìm thấy nhà hàng cho món: {row.get('tên_món')} - {restaurant_name}")
            except Exception as e:
                print(f"Lỗi thêm món ăn {row.get('tên_món')}: {e}")

        db.commit()
        print("Seed data thành công.")
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()
