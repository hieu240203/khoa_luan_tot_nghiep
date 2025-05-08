// const BASE_URL = "http://localhost:8000/api";

// // ✅ Kiểu dữ liệu đầu vào khi gửi đánh giá
// interface ReviewInput {
//   restaurant_id: string;
//   rating: number;
//   comment: string;
//   images?: string; // ✅ Để rỗng mặc định, nếu không cần tải ảnh
// }

// // ✅ Kiểu dữ liệu đánh giá trả về từ backend
// export interface Review {
//   id: string;
//   restaurant_id: string;
//   user_id: string;
//   user_name?: string;
//   rating: number;
//   comment: string;
//   images?: string;
//   created_at: string;
//   reply?: string;
//   reply_by_user_id?: string;
// }

// // ✅ Gửi đánh giá mới
// export async function submitReview({
//   restaurant_id,
//   rating,
//   comment,
//   images = "", // ✅ Mặc định là rỗng, không yêu cầu người dùng tải ảnh
// }: ReviewInput): Promise<Review> {
//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
//   if (!token) throw new Error("Bạn cần đăng nhập để đánh giá");

//   const res = await fetch(`${BASE_URL}/reviews/`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({ restaurant_id, rating, comment, images }), // ✅ Không cần ảnh, để rỗng
//   });

//   if (!res.ok) {
//     const err = await res.json().catch(() => ({}));
//     throw new Error(err.detail || "Không thể gửi đánh giá");
//   }

//   return await res.json();
// }

// // ✅ Lấy danh sách đánh giá theo ID nhà hàng
// export async function getReviewsByRestaurantId(restaurant_id: string): Promise<Review[]> {
//   const res = await fetch(`${BASE_URL}/reviews/restaurant/${restaurant_id}`);
//   if (!res.ok) throw new Error("Không thể lấy danh sách đánh giá");
//   return await res.json();
// }

// // ✅ Gửi phản hồi từ nhà hàng đến review
// export async function replyToReview(review_id: string, reply: string): Promise<Review> {
//     const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
//     if (!token) throw new Error("Bạn cần đăng nhập để phản hồi");
  
//     const res = await fetch(`${BASE_URL}/reviews/reply/${review_id}`, { // Sửa lại review_id thay vì reviewId
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ reply }) // Đảm bảo reply được gửi đúng
//     });
  
//     if (!res.ok) {
//       const err = await res.json().catch(() => ({}));
//       throw new Error(err.detail || "Không thể gửi phản hồi");
//     }
  
//     return await res.json(); // Trả về kết quả phản hồi
//   }

const BASE_URL = "http://localhost:8000/api";

// ✅ Kiểu dữ liệu đầu vào khi gửi đánh giá
interface ReviewInput {
  restaurant_id: string;
  rating: number;
  comment: string;
  images?: string; // ✅ Để rỗng mặc định, nếu không cần tải ảnh
}

// ✅ Kiểu dữ liệu đánh giá trả về từ backend
export interface Review {
  id: string;
  restaurant_id: string;
  user_id: string;
  user_name?: string;
  rating: number;
  comment: string;
  images?: string;
  created_at: string;
  reply?: string;
  reply_by_user_id?: string;
}

// ✅ Gửi đánh giá mới
export async function submitReview({
  restaurant_id,
  rating,
  comment,
  images = "", // ✅ Mặc định là rỗng, không yêu cầu người dùng tải ảnh
}: ReviewInput): Promise<Review> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) throw new Error("Bạn cần đăng nhập để đánh giá");

  const res = await fetch(`${BASE_URL}/reviews/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ restaurant_id, rating, comment, images }), // ✅ Không cần ảnh, để rỗng
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Không thể gửi đánh giá");
  }

  return await res.json();
}

// ✅ Lấy danh sách đánh giá theo ID nhà hàng
export async function getReviewsByRestaurantId(restaurant_id: string): Promise<Review[]> {
  const res = await fetch(`${BASE_URL}/reviews/restaurant/${restaurant_id}`);
  if (!res.ok) throw new Error("Không thể lấy danh sách đánh giá");
  return await res.json();
}

// ✅ Gửi phản hồi từ nhà hàng đến review
export const replyToReview = async (reviewId: string, { reply_text }: { reply_text: string }) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) throw new Error("Bạn cần đăng nhập để phản hồi");
  
    const res = await fetch(`${BASE_URL}/reviews/reply/${reviewId}?reply_text=${encodeURIComponent(reply_text)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    // Kiểm tra nếu response không ok
    if (!res.ok) {
      const error = await res.json();
      console.error("Error response:", error); // Log chi tiết lỗi
      throw new Error(error?.detail || "Không thể gửi phản hồi");
    }
  
    return await res.json();
  };
  
  
