
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Clock, Heart, ThumbsUp, Users, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addFavoriteRestaurant, removeFavoriteRestaurant, getFavorites } from "@/lib/favorite";
import React from "react";

// Define restaurant type
interface Restaurant {
  id: string;
  name: string;
  city: string;
  district: string;
  category?: string;
  images?: string;
  price_range?: string;
  average_rating?: number;
  opening_hours?: string;
  similarity_score?: number;
}

// Function to parse price range (retained from original code)
function parsePriceRange(priceRangeStr: string | undefined): [number, number] | null {
  if (!priceRangeStr) return null;

  const cleanStr = priceRangeStr.replace(/[đĐkK\s]/g, '');
  const parts = cleanStr.split('-');

  if (parts.length < 2) return null;

  let min = parseInt(parts[0].replace(/\./g, ''), 10) || 0;
  let max = parseInt(parts[1].replace(/\./g, ''), 10) || 0;

  if (min > max && max !== 0) [min, max] = [max, min];
  if (max === 0 && min > 0) max = min;

  return [min, max];
}

export default function RecommendationPage() {
  type RecommendationType = "contentBased" | "collaborative" | "hybrid";
  
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [recommendations, setRecommendations] = useState<{
    contentBased: Restaurant[];
    collaborative: Restaurant[];
    hybrid: Restaurant[];
  }>({
    contentBased: [],
    collaborative: [],
    hybrid: []
  });
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<RecommendationType>("hybrid");
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [loading, setLoading] = useState<{
    contentBased: boolean;
    collaborative: boolean;
    hybrid: boolean;
  }>({
    contentBased: false,
    collaborative: false,
    hybrid: false
  });
  const [userId, setUserId] = useState<string>("");

  // Fetch user ID from localStorage when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    
    if (user) {
      try {
        const userData = JSON.parse(user);
        setUserId(userData.id);
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }
    
    fetchFavorites();
  }, []);

  // Fetch recommendations when userId changes or tab changes
  useEffect(() => {
    if (userId) {
      if (activeTab === "contentBased") {
        fetchContentBasedRecommendations();
      } else if (activeTab === "collaborative") {
        fetchCollaborativeRecommendations();
      } else if (activeTab === "hybrid") {
        fetchHybridRecommendations();
      }
    }
  }, [userId, activeTab]);

  // Fetch favorites
  const fetchFavorites = async (): Promise<void> => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    try {
      const data = await getFavorites();
      const ids = data.map((item: { restaurant_id: string }) => item.restaurant_id);
      setFavorites(ids);
    } catch (error) {
      console.error("Không thể lấy danh sách yêu thích:", error);
    }
  };

  // Content-based recommendation API
  const fetchContentBasedRecommendations = async (): Promise<void> => {
    if (!userId) return;
    
    setLoading(prev => ({...prev, contentBased: true}));
    
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/recommend/content-based?user_id=${userId}`);
      if (!response.ok) throw new Error("Network response was not ok");
      
      const data = await response.json();
      setRecommendations(prev => ({...prev, contentBased: data}));
    } catch (error) {
      console.error("Error fetching content-based recommendations:", error);
    } finally {
      setLoading(prev => ({...prev, contentBased: false}));
    }
  };

  // Collaborative recommendation API
  const fetchCollaborativeRecommendations = async (): Promise<void> => {
    if (!userId) return;
    
    setLoading(prev => ({...prev, collaborative: true}));
    
    try {
      const response = await fetch("http://127.0.0.1:8000/api/recommend/collaborative", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }),
      });
      
      if (!response.ok) throw new Error("Network response was not ok");
      
      const data = await response.json();
      setRecommendations(prev => ({...prev, collaborative: data}));
    } catch (error) {
      console.error("Error fetching collaborative recommendations:", error);
    } finally {
      setLoading(prev => ({...prev, collaborative: false}));
    }
  };

  // Hybrid recommendation API
  const fetchHybridRecommendations = async (): Promise<void> => {
    if (!userId) return;
    
    setLoading(prev => ({...prev, hybrid: true}));
    
    try {
      const response = await fetch("http://127.0.0.1:8000/api/recommend/hybrid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }),
      });
      
      if (!response.ok) throw new Error("Network response was not ok");
      
      const data = await response.json();
      setRecommendations(prev => ({...prev, hybrid: data}));
    } catch (error) {
      console.error("Error fetching hybrid recommendations:", error);
    } finally {
      setLoading(prev => ({...prev, hybrid: false}));
    }
  };

  // Handle favorite toggle
  const handleFavorite = async (restaurantId: string): Promise<void> => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn cần đăng nhập để thêm yêu thích!");
      return;
    }
    
    try {
      if (favorites.includes(restaurantId)) {
        await removeFavoriteRestaurant(restaurantId);
        setFavorites(favorites.filter((id) => id !== restaurantId));
      } else {
        await addFavoriteRestaurant(restaurantId);
        setFavorites([...favorites, restaurantId]);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message || "Có lỗi xảy ra khi xử lý yêu thích.");
      } else {
        alert("Có lỗi xảy ra khi xử lý yêu thích.");
      }
    }
  };

  // Format price for display
  const formatPrice = (price: number): string => {
    return price.toLocaleString("vi-VN");
  };

  // Get current active recommendations based on tab
  const getCurrentRecommendations = (): Restaurant[] => {
    switch(activeTab) {
      case "contentBased": 
        return recommendations.contentBased;
      case "collaborative":
        return recommendations.collaborative;
      case "hybrid":
      default:
        return recommendations.hybrid;
    }
  };

  // Get loading state for current tab
  const isLoading = loading[activeTab];

  // Function to handle click feedback on a restaurant
  const handleClickRestaurant = async (restaurantId: string): Promise<void> => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn cần đăng nhập để sử dụng tính năng này!");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/feedback/recommend-click", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ restaurant_id: restaurantId }),
      });

      if (!response.ok) {
        throw new Error("Error recording feedback");
      }

      // Optionally, you can refresh recommendations or update state here
      console.log("Feedback recorded successfully");
    } catch (error) {
      console.error("Error recording feedback:", error);
      alert("Không thể ghi nhận lượt click của bạn.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
        Nhà hàng gợi ý cho bạn
      </h1>
      
      {/* Recommendation Tabs */}
      <Tabs defaultValue="hybrid" className="mb-8" onValueChange={(value: string) => setActiveTab(value as RecommendationType)} value={activeTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList className="bg-green-50">
            <TabsTrigger value="hybrid" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <Layers className="mr-2 h-4 w-4" />
              Kết hợp
            </TabsTrigger>
            <TabsTrigger value="contentBased" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <ThumbsUp className="mr-2 h-4 w-4" />
              Dựa trên hồ sở người dùng
            </TabsTrigger>
            <TabsTrigger value="collaborative" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <Users className="mr-2 h-4 w-4" />
              Người dùng tương tự
            </TabsTrigger>
          </TabsList>
          
          <div className="flex gap-4 items-center">
            {/* View switcher */}
            <div className="flex items-center">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-green-600 hover:bg-green-700" : ""}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <rect width="7" height="7" x="3" y="3" rx="1"></rect>
                  <rect width="7" height="7" x="14" y="3" rx="1"></rect>
                  <rect width="7" height="7" x="14" y="14" rx="1"></rect>
                  <rect width="7" height="7" x="3" y="14" rx="1"></rect>
                </svg>
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-green-600 hover:bg-green-700" : ""}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <line x1="8" x2="21" y1="6" y2="6"></line>
                  <line x1="8" x2="21" y1="12" y2="12"></line>
                  <line x1="8" x2="21" y1="18" y2="18"></line>
                  <line x1="3" x2="3.01" y1="6" y2="6"></line>
                  <line x1="3" x2="3.01" y1="12" y2="12"></line>
                  <line x1="3" x2="3.01" y1="18" y2="18"></line>
                </svg>
              </Button>
            </div>

            <Select 
              defaultValue="relevance" 
              onValueChange={(value) => setSortBy(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Liên quan nhất</SelectItem>
                <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
                <SelectItem value="price-asc">Giá thấp đến cao</SelectItem>
                <SelectItem value="price-desc">Giá cao đến thấp</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tab Contents */}
        <TabsContent value="hybrid" className="mt-0">
          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <h2 className="font-medium text-green-800 mb-2">Gợi ý kết hợp</h2>
            <p className="text-sm text-green-700">
              Những nhà hàng được đề xuất dựa trên hồ sơ cá nhân và đánh giá từ người dùng tương tự với bạn.
            </p>
          </div>
          {renderRestaurantList(recommendations.hybrid, loading.hybrid)}
        </TabsContent>
        
        <TabsContent value="contentBased" className="mt-0">
          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <h2 className="font-medium text-green-800 mb-2">Gợi ý theo sở thích</h2>
            <p className="text-sm text-green-700">
              Những nhà hàng được đề xuất dựa trên hồ sơ cá nhân của bạn về loại hình ẩm thực, vị trí, và khoảng giá.
            </p>
          </div>
          {renderRestaurantList(recommendations.contentBased, loading.contentBased)}
        </TabsContent>
        
        <TabsContent value="collaborative" className="mt-0">
          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <h2 className="font-medium text-green-800 mb-2">Gợi ý từ người dùng tương tự</h2>
            <p className="text-sm text-green-700">
              Những nhà hàng được đề xuất dựa trên đánh giá và lượt xem của những người dùng có sở thích tương tự như bạn.
            </p>
          </div>
          {renderRestaurantList(recommendations.collaborative, loading.collaborative)}
        </TabsContent>
      </Tabs>
    </div>
  );

  // Helper function to render restaurant list
  function renderRestaurantList(restaurants: Restaurant[] | undefined, isLoading: boolean): JSX.Element {
    if (isLoading) {
      return (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Đang tải gợi ý...</p>
        </div>
      );
    }
    
    if (!restaurants || restaurants.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">Không có gợi ý nào. Hãy trải nghiệm và đánh giá thêm!</p>
          <Button className="mt-4 bg-green-600 hover:bg-green-700">
            <Link href="/explore">Khám phá nhà hàng</Link>
          </Button>
        </div>
      );
    }

    return viewMode === "grid" ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => {
          const parsedPrice = parsePriceRange(restaurant.price_range);
          return (
            <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-shadow relative group">
              <Button
                variant="ghost"
                size="icon"
                className={`absolute top-3 left-3 bg-white/80 rounded-full z-10 ${favorites.includes(restaurant.id) ? "text-red-600" : "text-gray-400"} opacity-0 group-hover:opacity-100 transition-opacity`}
                onClick={() => handleFavorite(restaurant.id)}
              >
                <Heart className={`w-5 h-5 ${favorites.includes(restaurant.id) ? "fill-red-500" : "fill-none"}`} />
              </Button>
              <div className="relative h-48">
                <img
                  src={restaurant.images || "/placeholder.svg"}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white text-green-600">{restaurant.average_rating || "?"}/10</Badge>
                </div>
                {restaurant.similarity_score && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2">
                    <div className="flex justify-between">
                      <span>Độ tương đồng:</span>
                      <span className="font-semibold">{Math.round(restaurant.similarity_score * 100)}%</span>
                    </div>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-1 line-clamp-1">{restaurant.name}</h3>
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <MapPin className="h-3 w-3 mr-1" /> {restaurant.district}, {restaurant.city}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {restaurant.category && (
                    <Badge variant="outline" className="bg-gray-50">{restaurant.category}</Badge>
                  )}
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    {parsedPrice ? (
                      parsedPrice[0] === parsedPrice[1] 
                        ? `${formatPrice(parsedPrice[0])}₫` 
                        : `${formatPrice(parsedPrice[0])}₫ - ${formatPrice(parsedPrice[1])}₫`
                    ) : "Giá: Đang cập nhật"}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="h-3 w-3 mr-1" /> {restaurant.opening_hours || "Đang cập nhật"}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-end">
                <Button variant="ghost" className="text-green-600 hover:text-green-700 hover:bg-green-50 p-0" onClick={() => handleClickRestaurant(restaurant.id)}>
                  <Link href={`/restaurant/${restaurant.id}`} className="px-4 py-2">Chi tiết</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    ) : (
      <div className="space-y-4">
        {restaurants.map((restaurant) => {
          const parsedPrice = parsePriceRange(restaurant.price_range);
          return (
            <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="flex flex-col md:flex-row">
                <div className="relative md:w-1/4 h-48 md:h-auto">
                  <img
                    src={restaurant.images || "/placeholder.svg"}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`absolute top-3 left-3 bg-white/80 rounded-full z-10 ${favorites.includes(restaurant.id) ? "text-red-600" : "text-gray-400"} opacity-0 group-hover:opacity-100 transition-opacity`}
                    onClick={() => handleFavorite(restaurant.id)}
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(restaurant.id) ? "fill-red-500" : "fill-none"}`} />
                  </Button>
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white text-green-600">{restaurant.average_rating || "?"}/10</Badge>
                  </div>
                </div>
                <div className="md:w-3/4 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg mb-1">{restaurant.name}</h3>
                      <div className="flex items-center text-gray-500 text-sm mb-2">
                        <MapPin className="h-3 w-3 mr-1" /> {restaurant.district}, {restaurant.city}
                      </div>
                    </div>
                    {restaurant.similarity_score && (
                      <Badge variant="outline" className="bg-green-50">
                        Độ phù hợp: {Math.round(restaurant.similarity_score * 100)}%
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 my-2">
                    {restaurant.category && (
                      <Badge variant="outline" className="bg-gray-50">{restaurant.category}</Badge>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-600">
                      {parsedPrice ? (
                        parsedPrice[0] === parsedPrice[1] 
                          ? `${formatPrice(parsedPrice[0])}₫` 
                          : `${formatPrice(parsedPrice[0])}₫ - ${formatPrice(parsedPrice[1])}₫`
                      ) : "Giá: Đang cập nhật"}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-3 w-3 mr-1" /> {restaurant.opening_hours || "Đang cập nhật"}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Button variant="ghost" className="text-green-600 hover:text-green-700 hover:bg-green-50 p-0" onClick={() => handleClickRestaurant(restaurant.id)}>
                      <Link href={`/restaurant/${restaurant.id}`} className="px-4 py-2">Chi tiết</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    );
  }
}
