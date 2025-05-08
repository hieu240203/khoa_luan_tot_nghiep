# import pandas as pd
# import joblib
# from scipy.sparse import hstack
# from sklearn.metrics.pairwise import cosine_similarity
# from api.models import models
# from sqlalchemy.orm import Session
# import numpy as np

# SCALER_PATH = "api/ml_models/minmax_scaler.pkl"
# VECTORIZER_PATH = "api/ml_models/tfidf_vectorizer.pkl"

# USER_ENCODER_PATH = "api/ml_models/model_user_encoder (1).pkl"
# RESTAURANT_ENCODER_PATH = "api/ml_models/model_rest_encoder (1).pkl"
# USER_EMBEDDINGS_PATH = "api/ml_models/model_user_embeddings (1).npy"
# RESTAURANT_EMBEDDINGS_PATH = "api/ml_models/model_restaurant_embeddings (1).npy"



# occupation_mapping = {
#     "gia đình": "Gia đình",
#     "nhóm hội": "Nhóm hội",
#     "giới văn phòng": "Giới văn phòng",
#     "cặp đôi": "Cặp đôi",
#     "sinh viên": "Sinh viên",
#     "khách du lịch": "Khách du lịch",
#     "trẻ em": "Trẻ em",
#     "giới manager": "Giới Manager"
# }

# def map_age_to_group(age):
#     if age is None:
#         return "Không xác định"
#     if age < 18:
#         return "Trẻ em"
#     elif 18 <= age <= 24:
#         return "Sinh viên"
#     elif 25 <= age <= 35:
#         return "Cặp đôi"
#     elif 36 <= age <= 50:
#         return "Giới văn phòng"
#     elif 51 <= age <= 65:
#         return "Giới Manager"
#     else:
#         return "Gia đình"

# def build_user_profile_keywords(age, occupation, district, city, food_style=None):
#     keywords = [map_age_to_group(age)]
#     normalized = (occupation or "").strip().lower()
#     keywords.append(occupation_mapping.get(normalized, "Không xác định"))
#     if food_style:
#         keywords.append(food_style)
#     if district:
#         keywords.append(district)
#     if city:
#         keywords.append(city)
#     return ", ".join(keywords)

# def repeat_style(style: str) -> str:
#     if style in ["Món Hàn", "Món Nhật", "Món Thái", "Món Âu", "Món Trung Hoa", "Món Ấn Độ", "Singapore", "Malaysia"]:
#         return (style + " ") * 4
#     elif style in ["Món Bắc", "Quốc tế", "Món Huế", "Món Quảng", "Món Miền Trung", "Món Miền Nam"]:
#         return (style + " ") * 2
#     elif style in ["", "Không xác định"]:
#         return ""
#     else:
#         return style + " "

# def load_models():
#     vectorizer = joblib.load(VECTORIZER_PATH)
#     scaler = joblib.load(SCALER_PATH)
#     return vectorizer, scaler

# def content_based_recommend(user_profile, df_restaurants, top_n=5):
#     profile_text = build_user_profile_keywords(
#         user_profile.get("age"),
#         user_profile.get("occupation"),
#         user_profile.get("district"),
#         user_profile.get("city"),
#         user_profile.get("food_style")
#     )

#     vectorizer, scaler = load_models()

#     df_restaurants = df_restaurants.copy()
#     df_restaurants["cuisine_style_repeat"] = df_restaurants["cuisine_style"].fillna('').apply(repeat_style)

#     df_restaurants["combined_text"] = (
#         df_restaurants["category"].fillna('') + " " +
#         df_restaurants["cuisine_style_repeat"] + " " +
#         df_restaurants["target_audience"].fillna('') + " " +
#         df_restaurants["district"].fillna('') + " " +
#         df_restaurants["city"].fillna('')
#     )

#     # Xử lý dữ liệu số
#     df_restaurants["average_rating"] = pd.to_numeric(df_restaurants["average_rating"], errors="coerce")
#     df_restaurants = df_restaurants[df_restaurants["average_rating"] >= 3.0].copy()
#     df_restaurants["rating_imputed"] = df_restaurants["average_rating"].fillna(df_restaurants["average_rating"].median())
#     df_restaurants["total_reviews"] = pd.to_numeric(df_restaurants["total_reviews"], errors="coerce").fillna(0)

#     def style_match(row):
#         if not user_profile.get("food_style"):
#             return 0
#         user_style = user_profile["food_style"].strip().lower()
#         rest_style = str(row.get("cuisine_style", "")).strip().lower()
#         return 1 if user_style == rest_style else 0

#     df_restaurants["style_match"] = df_restaurants.apply(style_match, axis=1)

#     # Vector hóa text
#     tfidf_matrix = vectorizer.transform(df_restaurants["combined_text"])

#     df_restaurants_renamed = df_restaurants.rename(columns={
#         "total_reviews": "Tổng số bình luận"
#     })


#     num_matrix = scaler.transform(df_restaurants_renamed[["rating_imputed", "Tổng số bình luận"]])

#     profile_vec = vectorizer.transform([profile_text])

#     profile_num_df = pd.DataFrame({
#     "rating_imputed": [df_restaurants["rating_imputed"].median()],
#     "Tổng số bình luận": [df_restaurants["total_reviews"].median()]
#     })
#     profile_num = scaler.transform(profile_num_df)


#     profile_vector = hstack([profile_vec, profile_num])
#     restaurant_matrix = hstack([tfidf_matrix, num_matrix])

#     similarity = cosine_similarity(profile_vector, restaurant_matrix).flatten()
#     df_restaurants["similarity"] = similarity

#     scaled_rating = scaler.transform(df_restaurants_renamed[["rating_imputed", "Tổng số bình luận"]])[:, 0]
#     df_restaurants["score_total"] = (
#         0.5 * df_restaurants["similarity"] +
#         0.3 * scaled_rating +
#         0.2 * df_restaurants["style_match"]
#     )
#     df_restaurants["description"] = df_restaurants["description"].astype(str)
#     df_restaurants["opening_hours"] = df_restaurants["opening_hours"].astype(str)

#     return df_restaurants.sort_values("score_total", ascending=False).head(top_n)[[
#         "id", "name", "price_range", "category", "cuisine_style",
#         "opening_hours", "description", "images",
#         "district", "city", "target_audience",
#         "similarity", "average_rating", "total_reviews",
#         "style_match", "score_total"
#     ]]


# def collaborative_filter_recommend(user_id: int, db: Session, top_n=5):
#     user_encoder = joblib.load(USER_ENCODER_PATH)
#     restaurant_encoder = joblib.load(RESTAURANT_ENCODER_PATH)
#     user_embeddings = np.load(USER_EMBEDDINGS_PATH)
#     restaurant_embeddings = np.load(RESTAURANT_EMBEDDINGS_PATH)

#     if user_id not in user_encoder.classes_:
#         raise ValueError("User chưa có dữ liệu đánh giá")

#     user_index = user_encoder.transform([user_id])[0]
#     user_vector = user_embeddings[user_index].reshape(1, -1)
#     similarities = cosine_similarity(user_vector, restaurant_embeddings).flatten()

#     top_indices = similarities.argsort()[::-1][:top_n]
#     recommended_rest_ids = restaurant_encoder.inverse_transform(top_indices)
#     recommended = db.query(models.Restaurant).filter(models.Restaurant.id.in_(recommended_rest_ids)).all()
#     return recommended

# def hybrid_recommend(user_id: int, db: Session, top_n=5):
#     user = db.query(models.User).filter(models.User.id == user_id).first()
#     if not user:
#         raise ValueError("User không tồn tại")

#     review_count = db.query(models.Review).filter(models.Review.user_id == user_id).count()
#     all_restaurants = db.query(models.Restaurant).all()
#     df_restaurants = pd.DataFrame([r.__dict__ for r in all_restaurants])
#     result_cb = content_based_recommend(user.__dict__, df_restaurants, top_n=10)

#     if review_count >= 3:
#         try:
#             return collaborative_filter_recommend(user_id, db, top_n=top_n)
#         except Exception:
#             return result_cb.to_dict(orient="records")

#     try:
#         result_cf_objs = collaborative_filter_recommend(user_id, db, top_n=10)
#         df_cf = pd.DataFrame([r.__dict__ for r in result_cf_objs])
#         df_cb = result_cb.copy()
#         df_cb["source"] = "cb"
#         df_cf["source"] = "cf"
#         combined = pd.concat([df_cb, df_cf], ignore_index=True)
#         combined.drop_duplicates(subset="id", keep="first", inplace=True)
#         sort_col = "score_total" if "score_total" in combined.columns else "average_rating"
#         return combined.sort_values(sort_col, ascending=False).head(top_n).to_dict(orient="records")
#     except:
#         return result_cb.to_dict(orient="records")

import pandas as pd
import joblib
import numpy as np
from scipy.sparse import hstack
from sklearn.metrics.pairwise import cosine_similarity
from api.models import models
from sqlalchemy.orm import Session

SCALER_PATH = "api/ml_models/minmax_scaler.pkl"
VECTORIZER_PATH = "api/ml_models/tfidf_vectorizer.pkl"

USER_ENCODER_PATH = "api/ml_models/model_user_encoder (1).pkl"
RESTAURANT_ENCODER_PATH = "api/ml_models/model_rest_encoder (1).pkl"
USER_EMBEDDINGS_PATH = "api/ml_models/model_user_embeddings (1).npy"
RESTAURANT_EMBEDDINGS_PATH = "api/ml_models/model_restaurant_embeddings (1).npy"

occupation_mapping = {
    "gia đình": "Gia đình",
    "nhóm hội": "Nhóm hội",
    "giới văn phòng": "Giới văn phòng",
    "cặp đôi": "Cặp đôi",
    "sinh viên": "Sinh viên",
    "khách du lịch": "Khách du lịch",
    "trẻ em": "Trẻ em",
    "giới manager": "Giới Manager"
}

def map_age_to_group(age):
    if age is None:
        return "Không xác định"
    if age < 18:
        return "Trẻ em"
    elif 18 <= age <= 24:
        return "Sinh viên"
    elif 25 <= age <= 35:
        return "Cặp đôi"
    elif 36 <= age <= 50:
        return "Giới văn phòng"
    elif 51 <= age <= 65:
        return "Giới Manager"
    else:
        return "Gia đình"

def build_user_profile_keywords(age, occupation, district, city, food_style=None):
    keywords = [map_age_to_group(age)]
    normalized = (occupation or "").strip().lower()
    keywords.append(occupation_mapping.get(normalized, "Không xác định"))
    if food_style:
        keywords.append(food_style)
    if district:
        keywords.append(district)
    if city:
        keywords.append(city)
    return ", ".join(keywords)

def repeat_style(style: str) -> str:
    if style is None:
        return ""
    style = str(style)
    if style in ["Món Hàn", "Món Nhật", "Món Thái", "Món Âu", "Món Trung Hoa", "Món Ấn Độ", "Singapore", "Malaysia"]:
        return (style + " ") * 4
    elif style in ["Món Bắc", "Quốc tế", "Món Huế", "Món Quảng", "Món Miền Trung", "Món Miền Nam"]:
        return (style + " ") * 2
    elif style in ["", "Không xác định"]:
        return ""
    else:
        return style + " "

def load_models():
    vectorizer = joblib.load(VECTORIZER_PATH)
    scaler = joblib.load(SCALER_PATH)
    return vectorizer, scaler

def safe_json_serializable(obj):
    """Convert DataFrame to JSON-serializable dictionary, handling NaN, Infinity values"""
    if isinstance(obj, pd.DataFrame):
        result = obj.replace([np.inf, -np.inf], np.nan).fillna(0).to_dict(orient="records")
        return result
    elif isinstance(obj, dict):
        # Clean up dict values
        for key, value in obj.items():
            if isinstance(value, (float, np.float64, np.float32)):
                if np.isnan(value) or np.isinf(value):
                    obj[key] = 0
        return obj
    return obj

def content_based_recommend(user_profile, df_restaurants, top_n=5):
    profile_text = build_user_profile_keywords(
        user_profile.get("age"),
        user_profile.get("occupation"),
        user_profile.get("district"),
        user_profile.get("city"),
        user_profile.get("food_style")
    )

    vectorizer, scaler = load_models()

    # Ensure we're working with a copy of the dataframe to avoid modifying the original
    df_restaurants = df_restaurants.copy()
    
    # Fill NaN values before applying functions
    df_restaurants["cuisine_style"] = df_restaurants["cuisine_style"].fillna('')
    df_restaurants["cuisine_style_repeat"] = df_restaurants["cuisine_style"].apply(repeat_style)

    # Safe string concatenation with NaN handling
    df_restaurants["combined_text"] = (
        df_restaurants["category"].fillna('') + " " +
        df_restaurants["cuisine_style_repeat"] + " " +
        df_restaurants["target_audience"].fillna('') + " " +
        df_restaurants["district"].fillna('') + " " +
        df_restaurants["city"].fillna('')
    )

    # Handle numeric data safely
    df_restaurants["average_rating"] = pd.to_numeric(df_restaurants["average_rating"], errors="coerce")
    df_restaurants = df_restaurants[df_restaurants["average_rating"] >= 3.0].copy()
    df_restaurants["rating_imputed"] = df_restaurants["average_rating"].fillna(df_restaurants["average_rating"].median())
    df_restaurants["total_reviews"] = pd.to_numeric(df_restaurants["total_reviews"], errors="coerce").fillna(0)

    def style_match(row):
        if not user_profile.get("food_style"):
            return 0
        user_style = str(user_profile["food_style"]).strip().lower()
        rest_style = str(row.get("cuisine_style", "")).strip().lower()
        return 1 if user_style == rest_style else 0

    df_restaurants["style_match"] = df_restaurants.apply(style_match, axis=1)

    # Vector hóa text
    tfidf_matrix = vectorizer.transform(df_restaurants["combined_text"])

    df_restaurants_renamed = df_restaurants.rename(columns={
        "total_reviews": "Tổng số bình luận"
    })

    # Ensure the data frame has the expected columns
    numeric_columns = ["rating_imputed", "Tổng số bình luận"]
    for col in numeric_columns:
        if col not in df_restaurants_renamed.columns:
            df_restaurants_renamed[col] = 0

    num_matrix = scaler.transform(df_restaurants_renamed[numeric_columns])

    profile_vec = vectorizer.transform([profile_text])

    profile_num_df = pd.DataFrame({
        "rating_imputed": [df_restaurants["rating_imputed"].median()],
        "Tổng số bình luận": [df_restaurants["total_reviews"].median()]
    })
    profile_num = scaler.transform(profile_num_df)

    profile_vector = hstack([profile_vec, profile_num])
    restaurant_matrix = hstack([tfidf_matrix, num_matrix])

    similarity = cosine_similarity(profile_vector, restaurant_matrix).flatten()
    df_restaurants["similarity"] = similarity

    # Handle potential NaN or infinite values in similarity
    df_restaurants["similarity"] = df_restaurants["similarity"].replace([np.inf, -np.inf], np.nan).fillna(0)

    scaled_rating = scaler.transform(df_restaurants_renamed[numeric_columns])[:, 0]
    
    # Calculate score_total with safe operations
    df_restaurants["score_total"] = (
        0.5 * df_restaurants["similarity"] +
        0.3 * scaled_rating +
        0.2 * df_restaurants["style_match"]
    )
    
    # Handle NaN or infinite values in score_total
    df_restaurants["score_total"] = df_restaurants["score_total"].replace([np.inf, -np.inf], np.nan).fillna(0)
    
    df_restaurants["description"] = df_restaurants["description"].astype(str)
    df_restaurants["opening_hours"] = df_restaurants["opening_hours"].astype(str)
    
    # Select columns and handle any remaining NaN/inf values
    result_df = df_restaurants.sort_values("score_total", ascending=False).head(top_n)[[
        "id", "name", "price_range", "category", "cuisine_style",
        "opening_hours", "description", "images",
        "district", "city", "target_audience",
        "similarity", "average_rating", "total_reviews",
        "style_match", "score_total"
    ]]
    
    # Replace any remaining NaN or infinite values with 0
    result_df = result_df.replace([np.inf, -np.inf], np.nan).fillna(0)
    
    return result_df

def collaborative_filter_recommend(user_id: int, db: Session, top_n=5):
    user_encoder = joblib.load(USER_ENCODER_PATH)
    restaurant_encoder = joblib.load(RESTAURANT_ENCODER_PATH)
    user_embeddings = np.load(USER_EMBEDDINGS_PATH)
    restaurant_embeddings = np.load(RESTAURANT_EMBEDDINGS_PATH)

    if user_id not in user_encoder.classes_:
        raise ValueError("User chưa có dữ liệu đánh giá")

    user_index = user_encoder.transform([user_id])[0]
    user_vector = user_embeddings[user_index].reshape(1, -1)
    similarities = cosine_similarity(user_vector, restaurant_embeddings).flatten()

    # Handle potential NaN or infinite values in similarities
    similarities = np.nan_to_num(similarities, nan=0, posinf=0, neginf=0)

    top_indices = similarities.argsort()[::-1][:top_n]
    recommended_rest_ids = restaurant_encoder.inverse_transform(top_indices)
    recommended = db.query(models.Restaurant).filter(models.Restaurant.id.in_(recommended_rest_ids)).all()
    return recommended

def hybrid_recommend(user_id: int, db: Session, top_n=5):
    try:
        user = db.query(models.User).filter(models.User.id == user_id).first()
        if not user:
            raise ValueError("User không tồn tại")

        review_count = db.query(models.Review).filter(models.Review.user_id == user_id).count()
        all_restaurants = db.query(models.Restaurant).all()
        
        # Convert SQLAlchemy objects to dictionaries
        restaurants_data = []
        for r in all_restaurants:
            restaurant_dict = {c.name: getattr(r, c.name) for c in r.__table__.columns}
            restaurants_data.append(restaurant_dict)
        
        df_restaurants = pd.DataFrame(restaurants_data)
        
        # Apply content-based recommendation
        result_cb = content_based_recommend(user.__dict__, df_restaurants, top_n=10)

        # Apply collaborative filtering if user has enough reviews
        if review_count >= 3:
            try:
                cf_results = collaborative_filter_recommend(user_id, db, top_n=top_n)
                # Convert SQLAlchemy objects to JSON-serializable dictionaries
                return safe_json_serializable([{c.name: getattr(r, c.name) for c in r.__table__.columns} for r in cf_results])
            except Exception as e:
                # Fallback to content-based if collaborative filtering fails
                print(f"Collaborative filtering failed: {str(e)}")
                return safe_json_serializable(result_cb)

        # Hybrid approach with both methods
        try:
            # Get collaborative filtering results
            result_cf_objs = collaborative_filter_recommend(user_id, db, top_n=10)
            
            # Convert to DataFrame
            cf_data = []
            for r in result_cf_objs:
                restaurant_dict = {c.name: getattr(r, c.name) for c in r.__table__.columns}
                cf_data.append(restaurant_dict)
            
            df_cf = pd.DataFrame(cf_data)
            
            # Add source indicators
            df_cb = result_cb.copy()
            df_cb["source"] = "cb"
            df_cf["source"] = "cf"
            
            # Handle missing columns in df_cf
            for col in df_cb.columns:
                if col not in df_cf.columns:
                    df_cf[col] = 0
            
            # Combine results
            combined = pd.concat([df_cb, df_cf], ignore_index=True)
            combined.drop_duplicates(subset="id", keep="first", inplace=True)
            
            # Sort by appropriate column
            sort_col = "score_total" if "score_total" in combined.columns else "average_rating"
            
            # Replace NaN and infinite values
            combined = combined.replace([np.inf, -np.inf], np.nan).fillna(0)
            
            # Return top results as JSON-serializable dictionary
            return safe_json_serializable(combined.sort_values(sort_col, ascending=False).head(top_n))
        except Exception as e:
            print(f"Hybrid approach failed: {str(e)}")
            # Fallback to content-based only
            return safe_json_serializable(result_cb)
    
    except Exception as e:
        # Catch any other exceptions and return them in a structured way
        print(f"Recommendation error: {str(e)}")
        raise ValueError(f"Error generating recommendations: {str(e)}")