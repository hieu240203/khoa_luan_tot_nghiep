// "use client";

// import { useState, useEffect } from "react";
// import { getFavorites, removeFavoriteRestaurant } from "@/lib/favorite";

// export default function FavoritePage() {
//   const [restaurants, setRestaurants] = useState<any[]>([]);

//   useEffect(() => {
//     async function fetchFavorites() {
//       try {
//         const favoriteRestaurants = await getFavorites(); // Bây giờ getFavorites() đã trả thẳng dữ liệu nhà hàng
//         setRestaurants(favoriteRestaurants || []);
//       } catch (error) {
//         console.error("Lỗi khi lấy dữ liệu nhà hàng yêu thích:", error);
//       }
//     }

//     fetchFavorites();
//   }, []);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-xl font-semibold mb-6">Danh sách nhà hàng yêu thích</h1>

//       {restaurants.length === 0 ? (
//         <p className="text-center text-gray-500">Không có nhà hàng yêu thích nào.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {restaurants.map((restaurant) => (
//             <div
//               key={restaurant.id}
//               className="card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
//             >
//               <img
//                 src={restaurant.images || "/placeholder.svg"}
//                 alt={restaurant.name}
//                 className="w-full h-48 object-cover"
//                 style={{ objectFit: 'cover', maxHeight: '200px' }}
//               />
              
//               <div className="p-4">
//                 <h3 className="font-bold text-lg mb-2">{restaurant.name}</h3>
//                 <p className="text-gray-600 text-sm mb-2">{restaurant.address || "Chưa có địa chỉ"}</p>
//                 <p className="text-gray-500 text-sm mb-2">{restaurant.category || "Chưa có loại hình"}</p>
//                 <div className="flex items-center mb-4">
//                   <span className="text-green-600 font-semibold">
//                     {restaurant.average_rating ? `${restaurant.average_rating}/10` : "?/10"}
//                   </span>
//                 </div>

//                 <div className="flex justify-between items-center">
//                   <a
//                     href={`/restaurant/${restaurant.id}`}
//                     className="text-green-600 hover:text-green-700 text-sm"
//                   >
//                     Chi tiết
//                   </a>
//                   <button
//                     className="text-red-500 text-sm"
//                     onClick={async () => {
//                       try {
//                         await removeFavoriteRestaurant(restaurant.id);
//                         setRestaurants((prev) => prev.filter((item) => item.id !== restaurant.id));
//                       } catch (error) {
//                         console.error("Lỗi khi xóa nhà hàng yêu thích:", error);
//                       }
//                     }}
//                   >
//                     Xóa
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { getFavorites, removeFavoriteRestaurant } from "@/lib/favorite";

export default function FavoritePage() {
  const [restaurants, setRestaurants] = useState<any[]>([]);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const favoriteRestaurants = await getFavorites();
        if (Array.isArray(favoriteRestaurants)) {
          // Lọc bỏ các bản ghi bị trùng id (nếu có)
          const uniqueRestaurants = favoriteRestaurants.filter((item, index, self) =>
            index === self.findIndex((r) => r.id === item.id)
          );
          setRestaurants(uniqueRestaurants);
        } else {
          setRestaurants([]);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu nhà hàng yêu thích:", error);
      }
    }

    fetchFavorites();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold mb-6">Danh sách nhà hàng yêu thích</h1>

      {restaurants.length === 0 ? (
        <p className="text-center text-gray-500">Không có nhà hàng yêu thích nào.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant, index) => (
            <div
              key={restaurant.id || `${restaurant.name}-${index}`}
              className="card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img
                src={restaurant.images || "/placeholder.svg"}
                alt={restaurant.name}
                className="w-full h-48 object-cover"
                style={{ objectFit: 'cover', maxHeight: '200px' }}
              />

              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{restaurant.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{restaurant.address || "Chưa có địa chỉ"}</p>
                <p className="text-gray-500 text-sm mb-2">{restaurant.category || "Chưa có loại hình"}</p>
                <div className="flex items-center mb-4">
                  <span className="text-green-600 font-semibold">
                    {restaurant.average_rating ? `${restaurant.average_rating}/10` : "?/10"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <a
                    href={`/restaurant/${restaurant.id}`}
                    className="text-green-600 hover:text-green-700 text-sm"
                  >
                    Chi tiết
                  </a>
                  <button
                    className="text-red-500 text-sm"
                    onClick={async () => {
                      try {
                        await removeFavoriteRestaurant(restaurant.id);
                        setRestaurants((prev) => prev.filter((item) => item.id !== restaurant.id));
                      } catch (error) {
                        console.error("Lỗi khi xóa nhà hàng yêu thích:", error);
                      }
                    }}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
