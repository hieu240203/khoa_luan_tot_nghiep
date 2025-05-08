

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, MapPin, Clock, Filter, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Sheet,  
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { searchRestaurants } from "@/lib/api";
import { addFavoriteRestaurant, removeFavoriteRestaurant, getFavorites } from "@/lib/favorite";
import { useSearchParams, useRouter } from "next/navigation"; // ✅ Thêm dòng này

function parsePriceRange(priceRangeStr: string): [number, number] | null {
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

export default function SearchPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState(""); // Thêm district
  const [priceRange, setPriceRange] = useState([0, 75]);
  const [rating, setRating] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevance");

  const router = useRouter();
  const searchParams = useSearchParams();

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleSearch = async (options?: {
    keyword?: string;
    city?: string;
    district?: string; // Sửa để truyền district
    selectedCategories?: string[];
  }) => {
    try {
      const data = await searchRestaurants({
        keyword: options?.keyword ?? keyword,
        city: options?.city ?? city,
        district: options?.district ?? district, // Sửa để truyền district
        priceRange,
        rating: rating.join(","),
        categories: (options?.selectedCategories ?? selectedCategories).join(","),
        features: features.join(","),
        sortBy,
      });
      setRestaurants(data);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm nhà hàng:", error);
    }
  };

  const fetchFavorites = async () => {
    if (!token) return;
    try {
      const data = await getFavorites();
      const ids = data.map((item: any) => item.restaurant_id);
      setFavorites(ids);
    } catch (error) {
      console.error("Không thể lấy danh sách yêu thích:", error);
    }
  };

  const handleFavorite = async (restaurantId: string) => {
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
    } catch (error: any) {
      alert(error.message || "Có lỗi xảy ra khi xử lý yêu thích.");
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN");
  };

  useEffect(() => {
    const keywordParam = searchParams.get("keyword") || "";
    const cityParam = searchParams.get("city") || "";
    const districtParam = searchParams.get("district") || ""; // Lấy district từ params
    const categoryParam = searchParams.get("category") || "";

    setKeyword(keywordParam);
    setCity(cityParam);
    setDistrict(districtParam); // Cập nhật district

    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    } else {
      setSelectedCategories([]);
    }

    handleSearch({
      keyword: keywordParam,
      city: cityParam,
      district: districtParam, // Truyền district vào khi tìm kiếm
      selectedCategories: categoryParam ? [categoryParam] : [],
    });

    fetchFavorites();
  }, [searchParams]);

  useEffect(() => {
    if (keyword || city || district || selectedCategories.length > 0) {
      handleSearch();
    }
    fetchFavorites();
  }, [keyword, city, district, selectedCategories, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Thanh tìm kiếm */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Tìm kiếm quán ăn, món ăn..."
              className="pl-10"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onBlur={() => handleSearch()}
            />
          </div>
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Thành phố"
              className="pl-10"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onBlur={() => handleSearch()}
            />
          </div>
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Quận/Huyện"
              className="pl-10"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              onBlur={() => handleSearch()}
            />
          </div>
        </div>

        {/* Thanh chọn hiển thị cùng hàng với bộ lọc */}
        <div className="flex gap-4 items-center">
          {/* Chuyển đổi giữa chế độ grid và list */}
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

          {/* Bộ lọc */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" /> Bộ lọc
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Bộ lọc tìm kiếm</SheetTitle>
                <SheetDescription>Tùy chỉnh kết quả tìm kiếm theo nhu cầu của bạn</SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Khoảng giá</h3>
                  <div className="space-y-4">
                    <Slider
                      defaultValue={priceRange}
                      max={100}
                      step={1}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>0đ</span>
                      <span>500.000đ+</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">Đánh giá</h3>
                  <div className="space-y-2">
                    {[9, 8, 7, 6, 5].map((ratingValue) => (
                      <div key={ratingValue} className="flex items-center space-x-2">
                        <Checkbox
                          id={`rating-${ratingValue}`}
                          checked={rating.includes(ratingValue)}
                          onChange={() => {
                            setRating((prev) =>
                              prev.includes(ratingValue)
                                ? prev.filter((r) => r !== ratingValue)
                                : [...prev, ratingValue]
                            );
                          }}
                        />
                        <Label htmlFor={`rating-${ratingValue}`}>{ratingValue}+ điểm</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">Loại hình ẩm thực</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category.name}`}
                          checked={selectedCategories.includes(category.name)}
                          onChange={() => {
                            setSelectedCategories((prev) =>
                              prev.includes(category.name)
                                ? prev.filter((c) => c !== category.name)
                                : [...prev, category.name]
                            );
                          }}
                        />
                        <Label htmlFor={`category-${category.name}`}>{category.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">Tiện ích</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {["Có bãi đỗ xe", "Wifi miễn phí", "Phòng riêng", "Thanh toán thẻ"].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox
                          id={`feature-${feature}`}
                          checked={features.includes(feature)}
                          onChange={() => {
                            setFeatures((prev) =>
                              prev.includes(feature)
                                ? prev.filter((f) => f !== feature)
                                : [...prev, feature]
                            );
                          }}
                        />
                        <Label htmlFor={`feature-${feature}`}>{feature}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      setPriceRange([0, 75]);
                      setRating([]);
                      setSelectedCategories([]);
                      setFeatures([]);
                    }}
                  >
                    Đặt lại
                  </Button>
                  <Button className="flex-1 bg-green-600 hover:bg-green-700" onBlur={() => handleSearch()}>
                    Áp dụng
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {restaurants.length === 0 ? (
        <div className="text-center text-gray-500">Không tìm thấy nhà hàng nào.</div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => {
            const parsedPrice = parsePriceRange(restaurant.price_range);
            return (
              <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-shadow relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`absolute top-3 left-3 bg-white/80 rounded-full z-10 ${favorites.includes(restaurant.id) ? "text-red-600" : "text-gray-400"}`}
                  onClick={() => handleFavorite(restaurant.id)}
                >
                  <Heart className={`w-5 h-5 ${favorites.includes(restaurant.id) ? "fill-red-500" : "fill-none"}`} />
                </Button>
                <div className="relative h-48">
                  <img
                    src={restaurant.images || "/placeholder.svg"}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white text-green-600">{restaurant.average_rating || "?"}/10</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-1">{restaurant.name}</h3>
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
                  <Button variant="ghost" className="text-green-600 hover:text-green-700 hover:bg-green-50 p-0">
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
              <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-shadow relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`absolute top-3 left-3 bg-white/80 rounded-full z-10 ${favorites.includes(restaurant.id) ? "text-red-600" : "text-gray-400"}`}
                  onClick={() => handleFavorite(restaurant.id)}
                >
                  <Heart className={`w-5 h-5 ${favorites.includes(restaurant.id) ? "fill-red-500" : "fill-none"}`} />
                </Button>
                <div className="relative h-48">
                  <img
                    src={restaurant.images || "/placeholder.svg"}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white text-green-600">{restaurant.average_rating || "?"}/10</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-1">{restaurant.name}</h3>
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
                  <Button variant="ghost" className="text-green-600 hover:text-green-700 hover:bg-green-50 p-0">
                    <Link href={`/restaurant/${restaurant.id}`} className="px-4 py-2">Chi tiết</Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
