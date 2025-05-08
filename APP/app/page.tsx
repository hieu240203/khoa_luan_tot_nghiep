"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchTopRestaurants } from "@/lib/api";
import { Search, MapPin, Star, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function HomePage() {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function loadRestaurants() {
      try {
        const data = await fetchTopRestaurants(3);
        setRestaurants(data);
      } catch (error) {
        console.error("Lỗi khi tải nhà hàng:", error);
      }
    }
    loadRestaurants();
  }, []);

  const handleSearch = () => {
    const query = new URLSearchParams();
    if (keyword) query.append("keyword", keyword);
    if (city) query.append("city", city);

    router.push(`/search?${query.toString()}`);
  };

  const handleCategoryClick = (categoryName: string) => {
    const query = new URLSearchParams();
    query.append("category", categoryName);
    router.push(`/search?${query.toString()}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 to-orange-500/90 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/placeholder.svg?height=1080&width=1920')" }}
        />
        <div className="relative z-20 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Khám Phá Ẩm Thực Xung Quanh Bạn</h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Tìm kiếm, đánh giá và khám phá những quán ăn tuyệt vời phù hợp với khẩu vị của bạn
          </p>
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Tìm kiếm quán ăn, món ăn..."
                className="pl-10 h-12 bg-white/95 border-0 text-black"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Địa điểm"
                className="pl-10 h-12 bg-white/95 border-0 text-black"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button className="h-12 px-6 bg-orange-500 hover:bg-orange-600" onClick={handleSearch}>
              Tìm Kiếm
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Khám Phá Theo Phong Cách</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(category.name)}
                className="group flex flex-col items-center p-4 rounded-lg transition-all hover:bg-white hover:shadow-md focus:outline-none"
              >
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
                  <img
                    src={`/placeholder.svg?height=64&width=64&text=${encodeURIComponent(category.name)}`}
                    alt={category.name}
                    className="w-8 h-8"
                  />
                </div>
                <span className="text-sm font-medium text-gray-800">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Restaurants */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Đề Xuất Cho Bạn</h2>
            <Link href="/discover" className="text-green-600 hover:text-green-700 flex items-center">
              Xem tất cả <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">Không có dữ liệu nhà hàng.</div>
            ) : (
              restaurants.map((restaurant) => (
                <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`} className="h-full">
                  <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative aspect-[3/2] w-full overflow-hidden">
                      <img
                        src={restaurant.images || "/placeholder.svg"}
                        alt={restaurant.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-white text-green-600 hover:bg-white">
                          {restaurant.average_rating || 0}/10
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{restaurant.name}</h3>
                        <p className="text-gray-500 text-sm">{restaurant.address}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {restaurant.category && <Badge variant="outline">{restaurant.category}</Badge>}
                          {restaurant.cuisine_style && <Badge variant="outline">{restaurant.cuisine_style}</Badge>}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center mt-auto">
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="h-3 w-3 mr-1" /> {restaurant.opening_hours}
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-500 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Tại Sao Chọn Chúng Tôi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Danh sách Categories
const categories = [
  { name: "Món Việt" },
  { name: "Quốc tế" },
  { name: "Món Bắc" },
  { name: "Món Hàn" },
  { name: "Hà Nội" },
  { name: "Món Á" },
  { name: "Món Nhật" },
  { name: "Đài Loan" },
];

// Danh sách Features
const features = [
  {
    icon: <Search className="h-8 w-8" />,
    title: "Tìm Kiếm Thông Minh",
    description: "Dễ dàng tìm kiếm quán ăn theo vị trí, loại món ăn hoặc đánh giá",
  },
  {
    icon: <Star className="h-8 w-8" />,
    title: "Đánh Giá Chân Thực",
    description: "Xem đánh giá từ cộng đồng và chia sẻ trải nghiệm của bạn",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    title: "Đề Xuất Cá Nhân Hóa",
    description: "Nhận đề xuất phù hợp với sở thích và lịch sử tìm kiếm của bạn",
  },
];

