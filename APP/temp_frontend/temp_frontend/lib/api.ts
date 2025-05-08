// lib/api.ts
export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
    const baseURL = "http://127.0.0.1:8000"; // ✅ URL của backend FastAPI
  
    const res = await fetch(`${baseURL}${endpoint}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        ...options.headers,
      },
      ...options,
    });
  
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || "Lỗi không xác định");
    }
  
    return await res.json();
  }
  
export async function fetchRestaurantById(id: string) {
  const res = await fetch(`http://localhost:8000/api/restaurants/${id}`)

  if (!res.ok) {
    throw new Error("Không thể lấy thông tin nhà hàng")
  }

  return res.json()
}

export async function fetchTopRestaurants(limit: number) {
  const res = await fetch(`http://localhost:8000/api/restaurants?limit=${limit}`)

  if (!res.ok) {
    throw new Error("Không thể tải danh sách nhà hàng")
  }

  return res.json()
}

export async function searchRestaurants(params: {
  keyword?: string;
  category?: string;
  cuisine_style?: string;
  city?: string;   // Cập nhật trường 'city' ở đây
  district?: string;  // Cập nhật trường 'district' ở đây
  limit?: number;
  page?: number;
  sortBy?: string;
  priceRange?: number[]; 
  rating?: string;       
  features?: string;     
  categories?: string;   
}) {
  const query = new URLSearchParams(params as any).toString();
  const res = await fetch(`http://localhost:8000/api/restaurants/search?${query}`);

  if (!res.ok) {
    throw new Error("Không thể tìm kiếm nhà hàng");
  }

  return res.json();
}




export async function addFavoriteRestaurant(restaurantId: string, token: string) {
  const res = await fetch("http://localhost:8000/api/favorites/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // cần login mới gọi được
    },
    body: JSON.stringify({ restaurant_id: restaurantId }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Không thể thêm yêu thích");
  }

  return await res.json();
}