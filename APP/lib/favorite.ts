const BASE_URL = "http://127.0.0.1:8000/api"; // ✅ Chuẩn URL

function getToken() {
  return localStorage.getItem("token"); // ✅ Đúng key token
}

// ✅ Thêm nhà hàng vào yêu thích
export async function addFavoriteRestaurant(restaurant_id: string, token?: string) {
  const accessToken = token || getToken();
  if (!accessToken) throw new Error("Không có token, hãy đăng nhập.");

  const res = await fetch(`${BASE_URL}/favorites/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ restaurant_id }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Không thể thêm vào yêu thích");
  }

  return await res.json();
}

// ✅ Xoá nhà hàng khỏi yêu thích
export async function removeFavoriteRestaurant(restaurant_id: string, token?: string) {
  const accessToken = token || getToken();
  if (!accessToken) throw new Error("Không có token, hãy đăng nhập.");

  const res = await fetch(`${BASE_URL}/favorites/${restaurant_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok && res.status !== 204) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Không thể xóa khỏi yêu thích");
  }
}

export async function getFavorites(token?: string) {
  const accessToken = token || (typeof window !== "undefined" ? localStorage.getItem("token") : null);

  if (!accessToken) {
    console.warn("Không có token xác thực, trả về danh sách rỗng.");
    return [];
  }

  const res = await fetch(`${BASE_URL}/favorites/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const contentType = res.headers.get("content-type");
    let errorMessage = "Không thể lấy danh sách yêu thích";

    if (contentType?.includes("application/json")) {
      const err = await res.json().catch(() => ({}));
      errorMessage = err.detail || errorMessage;
    } else {
      console.error("🔥 Server không trả về JSON, status:", res.status);
    }

    // Nếu là 401 hoặc 403 thì rõ ràng
    if (res.status === 401 || res.status === 403) {
      errorMessage = "Phiên đăng nhập hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.";
    }

    throw new Error(errorMessage);
  }

  const favorites = await res.json();

  const restaurants = await Promise.all(
    favorites.map(async (favorite: any) => {
      if (!favorite.restaurant_id) return null;
      try {
        const restaurantRes = await fetch(`${BASE_URL}/restaurants/${favorite.restaurant_id}`);
        if (!restaurantRes.ok) return null;
        return await restaurantRes.json();
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết nhà hàng:", error);
        return null;
      }
    })
  );

  return restaurants.filter(Boolean);
}
