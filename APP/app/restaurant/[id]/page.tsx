// // "use client"

// // import { useEffect, useState } from "react"
// // import { useParams } from "next/navigation"
// // import {
// //   MapPin,
// //   Clock,
// // } from "lucide-react"
// // import { Button } from "@/components/ui/button"
// // import { Badge } from "@/components/ui/badge"
// // import {
// //   Tabs,
// //   TabsContent,
// //   TabsList,
// //   TabsTrigger,
// // } from "@/components/ui/tabs"
// // import { Card, CardContent } from "@/components/ui/card"
// // import { Separator } from "@/components/ui/separator"

// // export default function RestaurantPage() {
// //   const params = useParams()
// //   const [restaurant, setRestaurant] = useState<any>(null)
// //   const [menu, setMenu] = useState<any[]>([])
// //   const [reviews, setReviews] = useState<any[]>([])

// //   useEffect(() => {
// //     async function fetchData() {
// //       try {
// //         const res = await fetch(`http://localhost:8000/api/restaurants/${params.id}`)
// //         const data = await res.json()
// //         setRestaurant(data)
// //       } catch (error) {
// //         console.error("Lỗi khi lấy dữ liệu nhà hàng:", error)
// //       }
// //     }
// //     fetchData()
// //   }, [params.id])

// //   useEffect(() => {
// //     async function fetchMenu() {
// //       try {
// //         const res = await fetch(`http://localhost:8000/api/restaurants/${params.id}/menu`)
// //         const data = await res.json()
// //         setMenu(data)
// //       } catch (error) {
// //         console.error("Lỗi khi lấy menu:", error)
// //       }
// //     }
// //     async function fetchReviews() {
// //       try {
// //         const res = await fetch(`http://localhost:8000/api/reviews/restaurant/${params.id}`)
// //         const data = await res.json()
// //         setReviews(data)
// //       } catch (error) {
// //         console.error("Lỗi khi lấy đánh giá:", error)
// //       }
// //     }

// //     fetchMenu()
// //     fetchReviews()
// //   }, [params.id])

// //   if (!restaurant) {
// //     return <div className="text-center py-10">Đang tải dữ liệu nhà hàng...</div>
// //   }

// //   return (
// //     <div className="container mx-auto px-4 py-8">
// //       {/* Restaurant Header */}
// //       <div className="flex flex-col md:flex-row gap-6 mb-8">
// //         <div className="w-full md:w-2/3">
// //           <div className="aspect-video w-full overflow-hidden rounded-lg shadow">
// //             <img
// //               src={restaurant.images || "/placeholder.svg"}
// //               alt={restaurant.name}
// //               className="object-cover w-full h-full"
// //             />
// //           </div>
// //         </div>

// //         <div className="w-full md:w-1/3">
// //           <Card>
// //             <CardContent className="p-6">
// //               <div className="space-y-4">
// //                 <div>
// //                   <h1 className="text-2xl font-bold">{restaurant.name}</h1>
// //                   <div className="flex items-center mt-2">
// //                     <span className="font-medium">{restaurant.average_rating}/10</span>
// //                     <span className="ml-1 text-gray-500">
// //                       ({restaurant.total_reviews} đánh giá)
// //                     </span>
// //                     <span className="mx-2 text-gray-300">•</span>
// //                     <span className="text-gray-500">{restaurant.price_range}</span>
// //                   </div>
// //                   <div className="flex flex-wrap gap-2 mt-2">
// //                     <Badge variant="outline" className="bg-gray-50">{restaurant.category}</Badge>
// //                     <Badge variant="outline" className="bg-gray-50">{restaurant.cuisine_style}</Badge>
// //                   </div>
// //                 </div>
// //                 <Separator />
// //                 <div className="space-y-3">
// //                   <div className="flex items-start">
// //                     <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
// //                     <div>
// //                       <p className="text-sm font-medium">Địa chỉ</p>
// //                       <p className="text-sm text-gray-500">{restaurant.address}</p>
// //                     </div>
// //                   </div>
// //                   <div className="flex items-start">
// //                     <Clock className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
// //                     <div>
// //                       <p className="text-sm font-medium">Giờ mở cửa</p>
// //                       <p className="text-sm text-gray-500">{restaurant.opening_hours}</p>
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <Separator />
// //                 <div className="flex flex-col gap-3">
// //                   <Button className="w-full bg-green-600 hover:bg-green-700">Đặt bàn</Button>
// //                   <Button variant="outline" className="w-full">Xem bản đồ</Button>
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </div>

// //       {/* Tabs */}
// //       <Tabs defaultValue="about" className="w-full">
// //         <TabsList className="w-full justify-start mb-6 bg-transparent border-b rounded-none h-auto p-0">
// //           <TabsTrigger value="about" className="px-4 py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-transparent">
// //             Giới thiệu
// //           </TabsTrigger>
// //           <TabsTrigger value="menu" className="px-4 py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-transparent">
// //             Thực đơn
// //           </TabsTrigger>
// //           <TabsTrigger value="reviews" className="px-4 py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-transparent">
// //             Đánh giá
// //           </TabsTrigger>
// //         </TabsList>

// //         <TabsContent value="about" className="mt-0">
// //           <h2 className="text-xl font-bold mb-3">Giới thiệu</h2>
// //           <p className="text-gray-700">{restaurant.description || "Chưa có mô tả."}</p>
// //         </TabsContent>

// //         <TabsContent value="menu">
// //           <h2 className="text-xl font-bold mb-3">Thực đơn</h2>
// //           {menu.length === 0 ? (
// //             <p className="text-gray-500">Nhà hàng chưa cập nhật thực đơn.</p>
// //           ) : (
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //               {menu.map((item) => (
// //                 <Card key={item.id}>
// //                   <CardContent className="p-4">
// //                     <img
// //                       src={item.image_url?.replace(/@resize.*$/, '') || "/placeholder.svg"}
// //                       alt={item.name}
// //                       className="w-full h-40 object-cover rounded mb-2"
// //                     />
// //                     <h3 className="font-semibold text-lg">{item.name}</h3>
// //                     <p className="text-gray-500 text-sm">{item.description || ""}</p>
// //                     <p className="text-green-600 font-medium mt-2">{item.price}</p>
// //                   </CardContent>
// //                 </Card>
// //               ))}
// //             </div>
// //           )}
// //         </TabsContent>

// //         <TabsContent value="reviews">
// //           <h2 className="text-xl font-bold mb-3">Đánh giá từ khách hàng</h2>
// //           {reviews.length === 0 ? (
// //             <p className="text-gray-500">Chưa có đánh giá nào.</p>
// //           ) : (
// //             <div className="space-y-4">
// //               {reviews.map((review) => (
// //                 <Card key={review.id}>
// //                   <CardContent className="p-4">
// //                     <p className="font-medium">{review.user_name || "Người dùng ẩn danh"}</p>
// //                     <p className="text-sm text-gray-600 italic">{review.comment}</p>
// //                     <p className="text-sm text-green-600 mt-1">{review.rating}/10 điểm</p>
// //                   </CardContent>
// //                 </Card>
// //               ))}
// //             </div>
// //           )}
// //         </TabsContent>
// //       </Tabs>
// //     </div>
// //   )
// // }

// "use client";  // Đảm bảo đây là một component client-side

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import {
//   MapPin,
//   Clock,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs";
// import { Card, CardContent } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { submitReview, replyToReview, getReviewsByRestaurantId } from "@/lib/reviews";

// export default function RestaurantPage() {
//   const params = useParams();
//   const [restaurant, setRestaurant] = useState<any>(null);
//   const [menu, setMenu] = useState<any[]>([]);
//   const [reviews, setReviews] = useState<any[]>([]);
//   const [newReview, setNewReview] = useState({ rating: 0, comment: "", images: "" });
//   const [replyContent, setReplyContent] = useState<{ [key: string]: string }>({});

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await fetch(`http://localhost:8000/api/restaurants/${params.id}`);
//         const data = await res.json();
//         setRestaurant(data);
//       } catch (error) {
//         console.error("Lỗi khi lấy dữ liệu nhà hàng:", error);
//       }
//     }
//     fetchData();
//   }, [params.id]);

//   useEffect(() => {
//     async function fetchMenu() {
//       try {
//         const res = await fetch(`http://localhost:8000/api/restaurants/${params.id}/menu`);
//         const data = await res.json();
//         setMenu(data);
//       } catch (error) {
//         console.error("Lỗi khi lấy menu:", error);
//       }
//     }

//     async function fetchReviews() {
//       try {
//         const data = await getReviewsByRestaurantId(params.id as string);
//         setReviews(data);
//       } catch (error) {
//         console.error("Lỗi khi lấy đánh giá:", error);
//       }
//     }

//     fetchMenu();
//     fetchReviews();
//   }, [params.id]);

//   const handleReviewSubmit = async () => {
//     try {
//       await submitReview({
//         restaurant_id: params.id as string,
//         rating: newReview.rating,
//         comment: newReview.comment,
//         images: newReview.images,
//       });
//       setNewReview({ rating: 0, comment: "", images: "" });
//       const updatedReviews = await getReviewsByRestaurantId(params.id as string);
//       setReviews(updatedReviews);
//     } catch (error) {
//       const err = error as Error;
//       alert("Không thể gửi đánh giá: " + err.message);
//     }
//   };

//   const handleReplySubmit = async (reviewId: string) => {
//     const reply = replyContent[reviewId]?.trim();
//     if (!reply) return;

//     try {
//       await replyToReview(reviewId, reply);
//       const updatedReviews = await getReviewsByRestaurantId(params.id as string);
//       setReviews(updatedReviews);
//       setReplyContent((prev) => ({ ...prev, [reviewId]: "" }));
//     } catch (error) {
//       const err = error as Error;
//       alert("Không thể gửi phản hồi: " + err.message);
//     }
//   };

//   if (!restaurant) {
//     return <div className="text-center py-10">Đang tải dữ liệu nhà hàng...</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Restaurant Header */}
//       <div className="flex flex-col md:flex-row gap-6 mb-8">
//         <div className="w-full md:w-2/3">
//           <div className="aspect-video w-full overflow-hidden rounded-lg shadow">
//             <img
//               src={restaurant.images || "/placeholder.svg"}
//               alt={restaurant.name}
//               className="object-cover w-full h-full"
//             />
//           </div>
//         </div>

//         <div className="w-full md:w-1/3">
//           <Card>
//             <CardContent className="p-6">
//               <div className="space-y-4">
//                 <div>
//                   <h1 className="text-2xl font-bold">{restaurant.name}</h1>
//                   <div className="flex items-center mt-2">
//                     <span className="font-medium">{restaurant.average_rating}/10</span>
//                     <span className="ml-1 text-gray-500">
//                       ({restaurant.total_reviews} đánh giá)
//                     </span>
//                     <span className="mx-2 text-gray-300">•</span>
//                     <span className="text-gray-500">{restaurant.price_range}</span>
//                   </div>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     <Badge variant="outline" className="bg-gray-50">{restaurant.category}</Badge>
//                     <Badge variant="outline" className="bg-gray-50">{restaurant.cuisine_style}</Badge>
//                   </div>
//                 </div>
//                 <Separator />
//                 <div className="space-y-3">
//                   <div className="flex items-start">
//                     <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
//                     <div>
//                       <p className="text-sm font-medium">Địa chỉ</p>
//                       <p className="text-sm text-gray-500">{restaurant.address}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start">
//                     <Clock className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
//                     <div>
//                       <p className="text-sm font-medium">Giờ mở cửa</p>
//                       <p className="text-sm text-gray-500">{restaurant.opening_hours}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <Separator />
//                 <div className="flex flex-col gap-3">
//                   <Button className="w-full bg-green-600 hover:bg-green-700">Đặt bàn</Button>
//                   <Button variant="outline" className="w-full">Xem bản đồ</Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       {/* Tabs */}
//       <Tabs defaultValue="about" className="w-full">
//         <TabsList className="w-full justify-start mb-6 bg-transparent border-b rounded-none h-auto p-0">
//           <TabsTrigger value="about" className="px-4 py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-transparent">
//             Giới thiệu
//           </TabsTrigger>
//           <TabsTrigger value="menu" className="px-4 py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-transparent">
//             Thực đơn
//           </TabsTrigger>
//           <TabsTrigger value="reviews" className="px-4 py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-transparent">
//             Đánh giá
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="about" className="mt-0">
//           <h2 className="text-xl font-bold mb-3">Giới thiệu</h2>
//           <p className="text-gray-700">{restaurant.description || "Chưa có mô tả."}</p>
//         </TabsContent>

//         <TabsContent value="menu">
//           <h2 className="text-xl font-bold mb-3">Thực đơn</h2>
//           {menu.length === 0 ? (
//             <p className="text-gray-500">Nhà hàng chưa cập nhật thực đơn.</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {menu.map((item) => (
//                 <Card key={item.id}>
//                   <CardContent className="p-4">
//                     <img
//                       src={item.image_url?.replace(/@resize.*$/, '') || "/placeholder.svg"}
//                       alt={item.name}
//                       className="w-full h-40 object-cover rounded mb-2"
//                     />
//                     <h3 className="font-semibold text-lg">{item.name}</h3>
//                     <p className="text-gray-500 text-sm">{item.description || ""}</p>
//                     <p className="text-green-600 font-medium mt-2">{item.price}</p>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </TabsContent>

//         <TabsContent value="reviews">
//           <h2 className="text-xl font-bold mb-3">Đánh giá từ khách hàng</h2>
//           <div className="bg-gray-50 p-4 mb-6 space-y-3">
//             <input
//               type="number"
//               min={1}
//               max={10}
//               placeholder="Điểm (1-10)"
//               className="w-full border px-3 py-2 rounded text-sm"
//               value={newReview.rating === 0 ? "" : newReview.rating}
//               onChange={(e) =>
//                 setNewReview({ ...newReview, rating: e.target.value === "" ? 0 : parseInt(e.target.value) })
//               }
//             />
//             <textarea
//               placeholder="Viết bình luận..."
//               className="w-full border px-3 py-2 rounded text-sm"
//               rows={3}
//               value={newReview.comment}
//               onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
//             />
//             <Button className="mt-2" onClick={handleReviewSubmit}>Gửi đánh giá</Button>
//           </div>

//           {reviews.length === 0 ? (
//             <p className="text-gray-500">Chưa có đánh giá nào.</p>
//           ) : (
//             <div className="space-y-4">
//               {reviews.map((review) => (
//                 <Card key={review.id}>
//                   <CardContent className="p-4 space-y-2">
//                     <p className="font-medium">{review.user_name || "Người dùng ẩn danh"}</p>
//                     <p className="text-sm text-gray-600 italic">{review.comment}</p>
//                     <p className="text-sm text-green-600">{review.rating}/10 điểm</p>

//                     {review.reply && (
//                       <div className="mt-2 bg-gray-100 p-3 rounded text-sm">
//                         <p className="font-semibold text-gray-700">Phản hồi từ nhà hàng:</p>
//                         <p className="text-gray-600">{review.reply}</p>
//                       </div>
//                     )}

//                     <div className="mt-3">
//                       <textarea
//                         placeholder="Phản hồi đánh giá này..."
//                         className="w-full border px-3 py-2 rounded text-sm"
//                         rows={2}
//                         value={replyContent[review.id] || ""}
//                         onChange={(e) => setReplyContent({ ...replyContent, [review.id]: e.target.value })}
//                       />
//                       <Button size="sm" className="mt-2" onClick={() => handleReplySubmit(review.id)}>
//                         Gửi phản hồi
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import {
//   MapPin,
//   Clock,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs";
// import { Card, CardContent } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { submitReview, replyToReview, getReviewsByRestaurantId } from "@/lib/reviews";

// // Định nghĩa BASE_URL và lấy token từ localStorage
// const BASE_URL = "http://localhost:8000/api"; // Đặt URL backend của bạn ở đây

// export default function RestaurantPage() {
//   const params = useParams();
//   const [restaurant, setRestaurant] = useState<any>(null);
//   const [menu, setMenu] = useState<any[]>([]);
//   const [reviews, setReviews] = useState<any[]>([]);
//   const [newReview, setNewReview] = useState({ rating: 0, comment: "", images: "" });
//   const [replyContent, setReplyContent] = useState<{ [key: string]: string }>({});

//   // Lấy dữ liệu nhà hàng từ backend
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await fetch(`${BASE_URL}/restaurants/${params.id}`);
//         const data = await res.json();
//         setRestaurant(data);
//       } catch (error) {
//         console.error("Lỗi khi lấy dữ liệu nhà hàng:", error);
//       }
//     }
//     fetchData();
//   }, [params.id]);

//   // Lấy thực đơn và đánh giá
//   useEffect(() => {
//     async function fetchMenu() {
//       try {
//         const res = await fetch(`${BASE_URL}/restaurants/${params.id}/menu`);
//         const data = await res.json();
//         setMenu(data);
//       } catch (error) {
//         console.error("Lỗi khi lấy menu:", error);
//       }
//     }

//     async function fetchReviews() {
//       try {
//         const data = await getReviewsByRestaurantId(params.id as string);
//         setReviews(data);
//       } catch (error) {
//         console.error("Lỗi khi lấy đánh giá:", error);
//       }
//     }

//     fetchMenu();
//     fetchReviews();
//   }, [params.id]);

//   // Hàm gửi đánh giá
//   const handleReviewSubmit = async () => {
//     try {
//       const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
//       if (!token) throw new Error("Bạn cần đăng nhập để đánh giá");

//       await submitReview({
//         restaurant_id: params.id as string,
//         rating: newReview.rating,
//         comment: newReview.comment,
//         images: newReview.images,
//       });
//       setNewReview({ rating: 0, comment: "", images: "" });
//       const updatedReviews = await getReviewsByRestaurantId(params.id as string);
//       setReviews(updatedReviews);
//     } catch (error) {
//       const err = error as Error;
//       alert("Không thể gửi đánh giá: " + err.message);
//     }
//   };

//   // Hàm gửi phản hồi
//   const handleReplySubmit = async (reviewId: string) => {
//     const reply = replyContent[reviewId]?.trim();
//     if (!reply) return;
  
//     try {
//       const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
//       if (!token) {
//         alert("Bạn cần đăng nhập để phản hồi");
//         return;
//       }
  
//       // Gửi phản hồi
//       await replyToReview(reviewId, { reply_text: reply });
  
//       // Cập nhật lại danh sách đánh giá
//       const updatedReviews = await getReviewsByRestaurantId(params.id as string);
//       setReviews(updatedReviews);
//       setReplyContent((prev) => ({ ...prev, [reviewId]: "" }));
//     } catch (error: any) {
//       // Log chi tiết lỗi
//       console.error("Error caught:", error);
  
//       // Kiểm tra và xử lý lỗi
//       const errorMessage = error?.response?.data?.detail || error?.message || "Lỗi không xác định";
//       alert("Không thể gửi phản hồi: " + errorMessage);
//     }
//   };

//   if (!restaurant) {
//     return <div className="text-center py-10">Đang tải dữ liệu nhà hàng...</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Restaurant Header */}
//       <div className="flex flex-col md:flex-row gap-6 mb-8">
//         <div className="w-full md:w-2/3">
//           <div className="aspect-video w-full overflow-hidden rounded-lg shadow">
//             <img
//               src={restaurant.images || "/placeholder.svg"}
//               alt={restaurant.name}
//               className="object-cover w-full h-full"
//             />
//           </div>
//         </div>

//         <div className="w-full md:w-1/3">
//           <Card>
//             <CardContent className="p-6">
//               <div className="space-y-4">
//                 <div>
//                   <h1 className="text-2xl font-bold">{restaurant.name}</h1>
//                   <div className="flex items-center mt-2">
//                     <span className="font-medium">{restaurant.average_rating}/10</span>
//                     <span className="ml-1 text-gray-500">
//                       ({restaurant.total_reviews} đánh giá)
//                     </span>
//                     <span className="mx-2 text-gray-300">•</span>
//                     <span className="text-gray-500">{restaurant.price_range}</span>
//                   </div>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     <Badge variant="outline" className="bg-gray-50">{restaurant.category}</Badge>
//                     <Badge variant="outline" className="bg-gray-50">{restaurant.cuisine_style}</Badge>
//                   </div>
//                 </div>
//                 <Separator />
//                 <div className="space-y-3">
//                   <div className="flex items-start">
//                     <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
//                     <div>
//                       <p className="text-sm font-medium">Địa chỉ</p>
//                       <p className="text-sm text-gray-500">{restaurant.address}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start">
//                     <Clock className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
//                     <div>
//                       <p className="text-sm font-medium">Giờ mở cửa</p>
//                       <p className="text-sm text-gray-500">{restaurant.opening_hours}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <Separator />
//                 <div className="flex flex-col gap-3">
//                   <Button className="w-full bg-green-600 hover:bg-green-700">Đặt bàn</Button>
//                   <Button variant="outline" className="w-full">Xem bản đồ</Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       {/* Tabs */}
//       <Tabs defaultValue="about" className="w-full">
//         <TabsList className="w-full justify-start mb-6 bg-transparent border-b rounded-none h-auto p-0">
//           <TabsTrigger value="about" className="px-4 py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-transparent">
//             Giới thiệu
//           </TabsTrigger>
//           <TabsTrigger value="menu" className="px-4 py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-transparent">
//             Thực đơn
//           </TabsTrigger>
//           <TabsTrigger value="reviews" className="px-4 py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-transparent">
//             Đánh giá
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="about" className="mt-0">
//           <h2 className="text-xl font-bold mb-3">Giới thiệu</h2>
//           <p className="text-gray-700">{restaurant.description || "Chưa có mô tả."}</p>
//         </TabsContent>

//         <TabsContent value="menu">
//           <h2 className="text-xl font-bold mb-3">Thực đơn</h2>
//           {menu.length === 0 ? (
//             <p className="text-gray-500">Nhà hàng chưa cập nhật thực đơn.</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {menu.map((item) => (
//                 <Card key={item.id}>
//                   <CardContent className="p-4">
//                     <img
//                       src={item.image_url?.replace(/@resize.*$/, '') || "/placeholder.svg"}
//                       alt={item.name}
//                       className="w-full h-40 object-cover rounded mb-2"
//                     />
//                     <h3 className="font-semibold text-lg">{item.name}</h3>
//                     <p className="text-gray-500 text-sm">{item.description || ""}</p>
//                     <p className="text-green-600 font-medium mt-2">{item.price}</p>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </TabsContent>

//         <TabsContent value="reviews">
//           <h2 className="text-xl font-bold mb-3">Đánh giá từ khách hàng</h2>
//           <div className="bg-gray-50 p-4 mb-6 space-y-3">
//             <input
//               type="number"
//               min={1}
//               max={10}
//               placeholder="Điểm (1-10)"
//               className="w-full border px-3 py-2 rounded text-sm"
//               value={newReview.rating === 0 ? "" : newReview.rating}
//               onChange={(e) =>
//                 setNewReview({ ...newReview, rating: e.target.value === "" ? 0 : parseInt(e.target.value) })
//               }
//             />
//             <textarea
//               placeholder="Viết bình luận..."
//               className="w-full border px-3 py-2 rounded text-sm"
//               rows={3}
//               value={newReview.comment}
//               onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
//             />
//             <Button className="mt-2" onClick={handleReviewSubmit}>Gửi đánh giá</Button>
//           </div>

//           {reviews.length === 0 ? (
//             <p className="text-gray-500">Chưa có đánh giá nào.</p>
//           ) : (
//             <div className="space-y-4">
//               {reviews.map((review) => (
//                 <Card key={review.id}>
//                   <CardContent className="p-4 space-y-2">
//                     <p className="font-medium">{review.user_name || "Người dùng ẩn danh"}</p>
//                     <p className="text-sm text-gray-600 italic">{review.comment}</p>
//                     <p className="text-sm text-green-600">{review.rating}/10 điểm</p>

//                     {review.reply && (
//                       <div className="mt-2 bg-gray-100 p-3 rounded text-sm">
//                         <p className="font-semibold text-gray-700">Phản hồi từ nhà hàng:</p>
//                         <p className="text-gray-600">{review.reply}</p>
//                       </div>
//                     )}

//                     <div className="mt-3">
//                       <textarea
//                         placeholder="Phản hồi đánh giá này..."
//                         className="w-full border px-3 py-2 rounded text-sm"
//                         rows={2}
//                         value={replyContent[review.id] || ""}
//                         onChange={(e) => setReplyContent({ ...replyContent, [review.id]: e.target.value })}
//                       />
//                       <Button size="sm" className="mt-2" onClick={() => handleReplySubmit(review.id)}>
//                         Gửi phản hồi
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  MapPin,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { submitReview, replyToReview, getReviewsByRestaurantId } from "@/lib/reviews";

// Định nghĩa BASE_URL và lấy token từ localStorage
const BASE_URL = "http://localhost:8000/api"; // Đặt URL backend của bạn ở đây

export default function RestaurantPage() {
  const params = useParams();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [menu, setMenu] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "", images: "" });
  const [replyContent, setReplyContent] = useState<{ [key: string]: string }>({});

  // Lấy dữ liệu nhà hàng từ backend
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${BASE_URL}/restaurants/${params.id}`);
        const data = await res.json();
        setRestaurant(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu nhà hàng:", error);
      }
    }
    fetchData();
  }, [params.id]);

  // Lấy thực đơn và đánh giá
  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch(`${BASE_URL}/restaurants/${params.id}/menu`);
        const data = await res.json();
        setMenu(data);
      } catch (error) {
        console.error("Lỗi khi lấy menu:", error);
      }
    }

    async function fetchReviews() {
      try {
        const data = await getReviewsByRestaurantId(params.id as string);
        setReviews(data);
      } catch (error) {
        console.error("Lỗi khi lấy đánh giá:", error);
      }
    }

    fetchMenu();
    fetchReviews();
  }, [params.id]);

  // Hàm gửi đánh giá
  const handleReviewSubmit = async () => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) throw new Error("Bạn cần đăng nhập để đánh giá");

      await submitReview({
        restaurant_id: params.id as string,
        rating: newReview.rating,
        comment: newReview.comment,
        images: newReview.images,
      });
      setNewReview({ rating: 0, comment: "", images: "" });
      const updatedReviews = await getReviewsByRestaurantId(params.id as string);
      setReviews(updatedReviews);
    } catch (error) {
      const err = error as Error;
      alert("Không thể gửi đánh giá: " + err.message);
    }
  };

  // Hàm gửi phản hồi
  const handleReplySubmit = async (reviewId: string) => {
    const reply = replyContent[reviewId]?.trim();
    if (!reply) return;
  
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        alert("Bạn cần đăng nhập để phản hồi");
        return;
      }
  
      // Gửi phản hồi
      await replyToReview(reviewId, { reply_text: reply });
  
      // Cập nhật lại danh sách đánh giá
      const updatedReviews = await getReviewsByRestaurantId(params.id as string);
      setReviews(updatedReviews);
      setReplyContent((prev) => ({ ...prev, [reviewId]: "" }));
    } catch (error: any) {
      console.error("Error caught:", error);
      const errorMessage = error?.response?.data?.detail || error?.message || "Lỗi không xác định";
      alert("Không thể gửi phản hồi: " + errorMessage);
    }
  };

  if (!restaurant) {
    return <div className="text-center py-10">Đang tải dữ liệu nhà hàng...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Restaurant Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-2/3">
          <div className="aspect-video w-full overflow-hidden rounded-lg shadow">
            <img
              src={restaurant.images || "/placeholder.svg"}
              alt={restaurant.name}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="w-full md:w-1/3">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl font-bold">{restaurant.name}</h1>
                  <div className="flex items-center mt-2">
                    <span className="font-medium">{restaurant.average_rating}/10</span>
                    <span className="ml-1 text-gray-500">
                      ({restaurant.total_reviews} đánh giá)
                    </span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-gray-500">{restaurant.price_range}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className="bg-gray-50">{restaurant.category}</Badge>
                    <Badge variant="outline" className="bg-gray-50">{restaurant.cuisine_style}</Badge>
                  </div>
                </div>
                <Separator />
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Địa chỉ</p>
                      <p className="text-sm text-gray-500">{restaurant.district}, {restaurant.city}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Giờ mở cửa</p>
                      <p className="text-sm text-gray-500">{restaurant.opening_hours}</p>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="flex flex-col gap-3">
                  <Button className="w-full bg-green-600 hover:bg-green-700">Đặt bàn</Button>
                  <Button variant="outline" className="w-full">Xem bản đồ</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="about" className="w-full">
        <TabsList className="w-full justify-start mb-6 bg-transparent border-b rounded-none h-auto p-0">
          <TabsTrigger value="about" className="px-4 py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-transparent">
            Giới thiệu
          </TabsTrigger>
          <TabsTrigger value="menu" className="px-4 py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-transparent">
            Thực đơn
          </TabsTrigger>
          <TabsTrigger value="reviews" className="px-4 py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-transparent">
            Đánh giá
          </TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="mt-0">
          <h2 className="text-xl font-bold mb-3">Giới thiệu</h2>
          <p className="text-gray-700">{restaurant.description || "Chưa có mô tả."}</p>
        </TabsContent>

        <TabsContent value="menu">
          <h2 className="text-xl font-bold mb-3">Thực đơn</h2>
          {menu.length === 0 ? (
            <p className="text-gray-500">Nhà hàng chưa cập nhật thực đơn.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menu.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <img
                      src={item.image_url?.replace(/@resize.*$/, '') || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-40 object-cover rounded mb-2"
                    />
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-500 text-sm">{item.description || ""}</p>
                    <p className="text-green-600 font-medium mt-2">{item.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="reviews">
          <h2 className="text-xl font-bold mb-3">Đánh giá từ khách hàng</h2>
          <div className="bg-gray-50 p-4 mb-6 space-y-3">
            <input
              type="number"
              min={1}
              max={10}
              placeholder="Điểm (1-10)"
              className="w-full border px-3 py-2 rounded text-sm"
              value={newReview.rating === 0 ? "" : newReview.rating}
              onChange={(e) =>
                setNewReview({ ...newReview, rating: e.target.value === "" ? 0 : parseInt(e.target.value) })
              }
            />
            <textarea
              placeholder="Viết bình luận..."
              className="w-full border px-3 py-2 rounded text-sm"
              rows={3}
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            />
            <Button className="mt-2" onClick={handleReviewSubmit}>Gửi đánh giá</Button>
          </div>

          {reviews.length === 0 ? (
            <p className="text-gray-500">Chưa có đánh giá nào.</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-4 space-y-2">
                    <p className="font-medium">{review.user_name || "Người dùng ẩn danh"}</p>
                    <p className="text-sm text-gray-600 italic">{review.comment}</p>
                    <p className="text-sm text-green-600">{review.rating}/10 điểm</p>

                    {review.reply && (
                      <div className="mt-2 bg-gray-100 p-3 rounded text-sm">
                        <p className="font-semibold text-gray-700">Phản hồi:</p>
                        <p className="text-gray-600">{review.reply}</p>
                      </div>
                    )}

                    <div className="mt-3">
                      <textarea
                        placeholder="Phản hồi đánh giá này..."
                        className="w-full border px-3 py-2 rounded text-sm"
                        rows={2}
                        value={replyContent[review.id] || ""}
                        onChange={(e) => setReplyContent({ ...replyContent, [review.id]: e.target.value })}
                      />
                      <Button size="sm" className="mt-2" onClick={() => handleReplySubmit(review.id)}>
                        Gửi phản hồi
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
