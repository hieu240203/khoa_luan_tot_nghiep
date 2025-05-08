"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, Clock, Filter, ChevronDown, Sparkles, TrendingUp, Clock3, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DiscoverPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Khám Phá</h1>
          <p className="text-gray-500">Đề xuất dành riêng cho bạn dựa trên sở thích của bạn</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" /> Bộ lọc
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Tùy chỉnh đề xuất</SheetTitle>
                <SheetDescription>Điều chỉnh đề xuất theo sở thích của bạn</SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Khoảng giá</h3>
                  <div className="space-y-4">
                    <Slider defaultValue={[0, 75]} max={100} step={1} />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>0đ</span>
                      <span>500.000đ+</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">Đánh giá tối thiểu</h3>
                  <div className="space-y-2">
                    {[9, 8, 7, 6, 5].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox id={`rating-${rating}`} />
                        <Label htmlFor={`rating-${rating}`}>{rating}+ điểm</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">Loại hình ẩm thực ưa thích</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.slice(0, 8).map((category, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox id={`category-${index}`} />
                        <Label htmlFor={`category-${index}`}>{category.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">Khoảng cách</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="distance-1" />
                      <Label htmlFor="distance-1">Dưới 1km</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="distance-2" />
                      <Label htmlFor="distance-2">1km - 3km</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="distance-3" />
                      <Label htmlFor="distance-3">3km - 5km</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="distance-4" />
                      <Label htmlFor="distance-4">5km - 10km</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">Đề xuất dựa trên</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pref-1" defaultChecked />
                      <Label htmlFor="pref-1">Quán đã lưu</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pref-2" defaultChecked />
                      <Label htmlFor="pref-2">Đề xuất quán ăn</Label>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Đặt lại
                  </Button>
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">Áp dụng</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Select defaultValue="relevance">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sắp xếp theo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Phù hợp nhất</SelectItem>
              <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
              <SelectItem value="trending">Xu hướng</SelectItem>
              <SelectItem value="distance">Gần nhất</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-md overflow-hidden">
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
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-4">Đề xuất dựa trên</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="desktop-pref-1" defaultChecked />
                  <Label htmlFor="desktop-pref-1">Quán đã lưu</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="desktop-pref-2" defaultChecked />
                  <Label htmlFor="desktop-pref-2">Đề xuất quán ăn</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-medium">Khoảng giá</h3>
              <div className="space-y-4">
                <Slider defaultValue={[0, 75]} max={100} step={1} />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>0đ</span>
                  <span>500.000đ+</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-3">
              <h3 className="font-medium">Đánh giá tối thiểu</h3>
              <div className="space-y-2">
                {[9, 8, 7, 6, 5].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox id={`desktop-rating-${rating}`} />
                    <Label htmlFor={`desktop-rating-${rating}`}>{rating}+ điểm</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-3">
              <h3 className="font-medium">Loại hình ẩm thực ưa thích</h3>
              <div className="space-y-2">
                {categories.slice(0, 8).map((category, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox id={`desktop-category-${index}`} />
                    <Label htmlFor={`desktop-category-${index}`}>{category.name}</Label>
                  </div>
                ))}
              </div>
              <Button variant="link" className="p-0 h-auto text-green-600">
                Xem thêm <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-3">
              <h3 className="font-medium">Khoảng cách</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="desktop-distance-1" />
                  <Label htmlFor="desktop-distance-1">Dưới 1km</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="desktop-distance-2" />
                  <Label htmlFor="desktop-distance-2">1km - 3km</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="desktop-distance-3" />
                  <Label htmlFor="desktop-distance-3">3km - 5km</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="desktop-distance-4" />
                  <Label htmlFor="desktop-distance-4">5km - 10km</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Discover Results */}
        <div className="flex-1">
          <Tabs defaultValue="for-you" className="w-full mb-6">
            <TabsList>
              <TabsTrigger value="for-you" className="flex items-center gap-1">
                <Sparkles className="h-4 w-4" /> Dành cho bạn
              </TabsTrigger>
              <TabsTrigger value="trending" className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" /> Xu hướng
              </TabsTrigger>
              <TabsTrigger value="new" className="flex items-center gap-1">
                <Clock3 className="h-4 w-4" /> Mới mở
              </TabsTrigger>
              <TabsTrigger value="top-rated" className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" /> Đánh giá cao
              </TabsTrigger>
            </TabsList>

            <TabsContent value="for-you" className="mt-4">
              <div className="mb-4">
                <h2 className="text-xl font-bold">Đề xuất dành cho bạn</h2>
                <p className="text-gray-500">Dựa trên sở thích và hoạt động của bạn</p>
              </div>

              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedRestaurants.map((restaurant, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <img
                          src={restaurant.image || "/placeholder.svg"}
                          alt={restaurant.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-white text-green-600 hover:bg-white">{restaurant.rating}/10</Badge>
                        </div>
                        {restaurant.reason && (
                          <div className="absolute bottom-3 left-3">
                            <Badge className="bg-green-600 text-white hover:bg-green-700">{restaurant.reason}</Badge>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg mb-1">{restaurant.name}</h3>
                            <div className="flex items-center text-gray-500 text-sm mb-2">
                              <MapPin className="h-3 w-3 mr-1" /> {restaurant.location}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {restaurant.tags.map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="bg-gray-50">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between items-center">
                        <div className="flex items-center text-gray-500 text-sm">
                          <Clock className="h-3 w-3 mr-1" /> {restaurant.openHours}
                        </div>
                        <Button variant="ghost" className="text-green-600 hover:text-green-700 hover:bg-green-50 p-0">
                          <Link href={`/restaurant/${restaurant.id}`} className="px-4 py-2">
                            Chi tiết
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {recommendedRestaurants.map((restaurant, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative w-full md:w-64 h-48 md:h-auto">
                          <img
                            src={restaurant.image || "/placeholder.svg"}
                            alt={restaurant.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-white text-green-600 hover:bg-white">{restaurant.rating}/10</Badge>
                          </div>
                          {restaurant.reason && (
                            <div className="absolute bottom-3 left-3">
                              <Badge className="bg-green-600 text-white hover:bg-green-700">{restaurant.reason}</Badge>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-lg mb-1">{restaurant.name}</h3>
                              <div className="flex items-center text-gray-500 text-sm mb-2">
                                <MapPin className="h-3 w-3 mr-1" /> {restaurant.location}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {restaurant.tags.map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="bg-gray-50">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center text-gray-500 text-sm">
                              <Clock className="h-3 w-3 mr-1" /> {restaurant.openHours}
                            </div>
                            <Button
                              variant="ghost"
                              className="text-green-600 hover:text-green-700 hover:bg-green-50 p-0"
                            >
                              <Link href={`/restaurant/${restaurant.id}`} className="px-4 py-2">
                                Chi tiết
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="trending" className="mt-4">
              <div className="mb-4">
                <h2 className="text-xl font-bold">Xu hướng hiện tại</h2>
                <p className="text-gray-500">Quán ăn đang được nhiều người quan tâm</p>
              </div>

              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trendingRestaurants.map((restaurant, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <img
                          src={restaurant.image || "/placeholder.svg"}
                          alt={restaurant.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-white text-green-600 hover:bg-white">{restaurant.rating}/10</Badge>
                        </div>
                        {restaurant.trendingReason && (
                          <div className="absolute bottom-3 left-3">
                            <Badge className="bg-orange-500 text-white hover:bg-orange-600">
                              {restaurant.trendingReason}
                            </Badge>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg mb-1">{restaurant.name}</h3>
                            <div className="flex items-center text-gray-500 text-sm mb-2">
                              <MapPin className="h-3 w-3 mr-1" /> {restaurant.location}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {restaurant.tags.map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="bg-gray-50">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between items-center">
                        <div className="flex items-center text-gray-500 text-sm">
                          <Clock className="h-3 w-3 mr-1" /> {restaurant.openHours}
                        </div>
                        <Button variant="ghost" className="text-green-600 hover:text-green-700 hover:bg-green-50 p-0">
                          <Link href={`/restaurant/${restaurant.id}`} className="px-4 py-2">
                            Chi tiết
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {trendingRestaurants.map((restaurant, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative w-full md:w-64 h-48 md:h-auto">
                          <img
                            src={restaurant.image || "/placeholder.svg"}
                            alt={restaurant.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-white text-green-600 hover:bg-white">{restaurant.rating}/10</Badge>
                          </div>
                          {restaurant.trendingReason && (
                            <div className="absolute bottom-3 left-3">
                              <Badge className="bg-orange-500 text-white hover:bg-orange-600">
                                {restaurant.trendingReason}
                              </Badge>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-lg mb-1">{restaurant.name}</h3>
                              <div className="flex items-center text-gray-500 text-sm mb-2">
                                <MapPin className="h-3 w-3 mr-1" /> {restaurant.location}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {restaurant.tags.map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="bg-gray-50">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center text-gray-500 text-sm">
                              <Clock className="h-3 w-3 mr-1" /> {restaurant.openHours}
                            </div>
                            <Button
                              variant="ghost"
                              className="text-green-600 hover:text-green-700 hover:bg-green-50 p-0"
                            >
                              <Link href={`/restaurant/${restaurant.id}`} className="px-4 py-2">
                                Chi tiết
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="new" className="mt-4">
              <div className="mb-4">
                <h2 className="text-xl font-bold">Quán mới mở</h2>
                <p className="text-gray-500">Khám phá những quán ăn mới trong khu vực của bạn</p>
              </div>

              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {newRestaurants.map((restaurant, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <img
                          src={restaurant.image || "/placeholder.svg"}
                          alt={restaurant.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-white text-green-600 hover:bg-white">{restaurant.rating}/10</Badge>
                        </div>
                        <div className="absolute bottom-3 left-3">
                          <Badge className="bg-blue-600 text-white hover:bg-blue-700">
                            Mới mở {restaurant.openedDaysAgo} ngày
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg mb-1">{restaurant.name}</h3>
                            <div className="flex items-center text-gray-500 text-sm mb-2">
                              <MapPin className="h-3 w-3 mr-1" /> {restaurant.location}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {restaurant.tags.map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="bg-gray-50">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between items-center">
                        <div className="flex items-center text-gray-500 text-sm">
                          <Clock className="h-3 w-3 mr-1" /> {restaurant.openHours}
                        </div>
                        <Button variant="ghost" className="text-green-600 hover:text-green-700 hover:bg-green-50 p-0">
                          <Link href={`/restaurant/${restaurant.id}`} className="px-4 py-2">
                            Chi tiết
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {newRestaurants.map((restaurant, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative w-full md:w-64 h-48 md:h-auto">
                          <img
                            src={restaurant.image || "/placeholder.svg"}
                            alt={restaurant.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-white text-green-600 hover:bg-white">{restaurant.rating}/10</Badge>
                          </div>
                          <div className="absolute bottom-3 left-3">
                            <Badge className="bg-blue-600 text-white hover:bg-blue-700">
                              Mới mở {restaurant.openedDaysAgo} ngày
                            </Badge>
                          </div>
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-lg mb-1">{restaurant.name}</h3>
                              <div className="flex items-center text-gray-500 text-sm mb-2">
                                <MapPin className="h-3 w-3 mr-1" /> {restaurant.location}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {restaurant.tags.map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="bg-gray-50">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center text-gray-500 text-sm">
                              <Clock className="h-3 w-3 mr-1" /> {restaurant.openHours}
                            </div>
                            <Button
                              variant="ghost"
                              className="text-green-600 hover:text-green-700 hover:bg-green-50 p-0"
                            >
                              <Link href={`/restaurant/${restaurant.id}`} className="px-4 py-2">
                                Chi tiết
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="top-rated" className="mt-4">
              <div className="mb-4">
                <h2 className="text-xl font-bold">Đánh giá cao nhất</h2>
                <p className="text-gray-500">Những quán ăn được đánh giá tốt nhất</p>
              </div>

              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {topRatedRestaurants.map((restaurant, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <img
                          src={restaurant.image || "/placeholder.svg"}
                          alt={restaurant.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-white text-green-600 hover:bg-white">{restaurant.rating}/10</Badge>
                        </div>
                        <div className="absolute bottom-3 left-3">
                          <Badge className="bg-purple-600 text-white hover:bg-purple-700">
                            Top {restaurant.topRank}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg mb-1">{restaurant.name}</h3>
                            <div className="flex items-center text-gray-500 text-sm mb-2">
                              <MapPin className="h-3 w-3 mr-1" /> {restaurant.location}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {restaurant.tags.map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="bg-gray-50">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between items-center">
                        <div className="flex items-center text-gray-500 text-sm">
                          <Clock className="h-3 w-3 mr-1" /> {restaurant.openHours}
                        </div>
                        <Button variant="ghost" className="text-green-600 hover:text-green-700 hover:bg-green-50 p-0">
                          <Link href={`/restaurant/${restaurant.id}`} className="px-4 py-2">
                            Chi tiết
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {topRatedRestaurants.map((restaurant, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative w-full md:w-64 h-48 md:h-auto">
                          <img
                            src={restaurant.image || "/placeholder.svg"}
                            alt={restaurant.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-white text-green-600 hover:bg-white">{restaurant.rating}/10</Badge>
                          </div>
                          <div className="absolute bottom-3 left-3">
                            <Badge className="bg-purple-600 text-white hover:bg-purple-700">
                              Top {restaurant.topRank}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-lg mb-1">{restaurant.name}</h3>
                              <div className="flex items-center text-gray-500 text-sm mb-2">
                                <MapPin className="h-3 w-3 mr-1" /> {restaurant.location}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {restaurant.tags.map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="bg-gray-50">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center text-gray-500 text-sm">
                              <Clock className="h-3 w-3 mr-1" /> {restaurant.openHours}
                            </div>
                            <Button
                              variant="ghost"
                              className="text-green-600 hover:text-green-700 hover:bg-green-50 p-0"
                            >
                              <Link href={`/restaurant/${restaurant.id}`} className="px-4 py-2">
                                Chi tiết
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="mt-8 flex justify-center">
            <Button variant="outline">Xem thêm đề xuất</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const categories = [
  { name: "Việt Nam", slug: "vietnamese" },
  { name: "Nhật Bản", slug: "japanese" },
  { name: "Hàn Quốc", slug: "korean" },
  { name: "Ý", slug: "italian" },
  { name: "Đồ Chay", slug: "vegetarian" },
  { name: "Đồ Ngọt", slug: "dessert" },
  { name: "Đồ Uống", slug: "drinks" },
  { name: "Buffet", slug: "buffet" },
  { name: "Hải Sản", slug: "seafood" },
  { name: "Lẩu", slug: "hotpot" },
  { name: "Nướng", slug: "bbq" },
  { name: "Ăn Vặt", slug: "snacks" },
]

const recommendedRestaurants = [
  {
    id: 1,
    name: "Nhà Hàng Xanh",
    image: "/placeholder.svg?height=300&width=500&text=Nhà+Hàng+Xanh",
    rating: 9.6,
    location: "Quận 1, TP.HCM",
    tags: ["Việt Nam", "Sang trọng"],
    openHours: "08:00 - 22:00",
    reason: "Phù hợp với sở thích",
  },
  {
    id: 2,
    name: "Sushi Toro",
    image: "/placeholder.svg?height=300&width=500&text=Sushi+Toro",
    rating: 9.2,
    location: "Quận 3, TP.HCM",
    tags: ["Nhật Bản", "Sushi"],
    openHours: "10:00 - 22:00",
    reason: "Dựa trên đánh giá của bạn",
  },
  {
    id: 3,
    name: "Phở Ngon",
    image: "/placeholder.svg?height=300&width=500&text=Phở+Ngon",
    rating: 9.0,
    location: "Quận 2, TP.HCM",
    tags: ["Việt Nam", "Phở"],
    openHours: "06:00 - 22:00",
    reason: "Gần vị trí của bạn",
  },
  {
    id: 4,
    name: "Quán Cà Phê Sân Vườn",
    image: "/placeholder.svg?height=300&width=500&text=Quán+Cà+Phê",
    rating: 8.6,
    location: "Quận 5, TP.HCM",
    tags: ["Cà phê", "Bánh ngọt"],
    openHours: "07:00 - 23:00",
    reason: "Phù hợp với sở thích",
  },
  {
    id: 5,
    name: "Bánh Mì Thịt Nguội",
    image: "/placeholder.svg?height=300&width=500&text=Bánh+Mì",
    rating: 9.4,
    location: "Quận 1, TP.HCM",
    tags: ["Việt Nam", "Ăn vặt"],
    openHours: "06:00 - 20:00",
    reason: "Dựa trên tìm kiếm gần đây",
  },
  {
    id: 6,
    name: "Lẩu Thái Cay",
    image: "/placeholder.svg?height=300&width=500&text=Lẩu+Thái",
    rating: 8.8,
    location: "Quận 7, TP.HCM",
    tags: ["Thái Lan", "Lẩu"],
    openHours: "11:00 - 22:00",
    reason: "Phù hợp với sở thích",
  },
]

const trendingRestaurants = [
  {
    id: 7,
    name: "BBQ Garden",
    image: "/placeholder.svg?height=300&width=500&text=BBQ+Garden",
    rating: 9.3,
    location: "Quận 3, TP.HCM",
    tags: ["Nướng", "Hàn Quốc"],
    openHours: "16:00 - 23:00",
    trendingReason: "Tăng 120% lượt xem",
  },
  {
    id: 8,
    name: "Pizza Express",
    image: "/placeholder.svg?height=300&width=500&text=Pizza+Express",
    rating: 8.9,
    location: "Quận 1, TP.HCM",
    tags: ["Ý", "Pizza"],
    openHours: "10:00 - 22:00",
    trendingReason: "Đang giảm giá 30%",
  },
  {
    id: 9,
    name: "Bún Đậu Mắm Tôm",
    image: "/placeholder.svg?height=300&width=500&text=Bún+Đậu",
    rating: 9.1,
    location: "Quận 10, TP.HCM",
    tags: ["Việt Nam", "Bún đậu"],
    openHours: "10:00 - 21:00",
    trendingReason: "Đang viral trên mạng xã hội",
  },
  {
    id: 10,
    name: "Dimsum House",
    image: "/placeholder.svg?height=300&width=500&text=Dimsum+House",
    rating: 8.7,
    location: "Quận 5, TP.HCM",
    tags: ["Trung Hoa", "Dimsum"],
    openHours: "08:00 - 21:00",
    trendingReason: "Tăng 85% lượt đánh giá",
  },
  {
    id: 11,
    name: "Cơm Tấm Sài Gòn",
    image: "/placeholder.svg?height=300&width=500&text=Cơm+Tấm",
    rating: 9.5,
    location: "Quận 1, TP.HCM",
    tags: ["Việt Nam", "Cơm tấm"],
    openHours: "06:00 - 22:00",
    trendingReason: "Đang được tìm kiếm nhiều",
  },
  {
    id: 12,
    name: "Highlands Coffee",
    image: "/placeholder.svg?height=300&width=500&text=Highlands+Coffee",
    rating: 8.5,
    location: "Quận 7, TP.HCM",
    tags: ["Cà phê", "Bánh ngọt"],
    openHours: "07:00 - 22:00",
    trendingReason: "Khuyến mãi mới",
  },
]

const newRestaurants = [
  {
    id: 13,
    name: "Mì Cay Seoul",
    image: "/placeholder.svg?height=300&width=500&text=Mì+Cay+Seoul",
    rating: 8.8,
    location: "Quận 1, TP.HCM",
    tags: ["Hàn Quốc", "Mì cay"],
    openHours: "10:00 - 22:00",
    openedDaysAgo: 7,
  },
  {
    id: 14,
    name: "Bò Né 3 Ngon",
    image: "/placeholder.svg?height=300&width=500&text=Bò+Né",
    rating: 9.0,
    location: "Quận 3, TP.HCM",
    tags: ["Việt Nam", "Bò né"],
    openHours: "06:00 - 14:00",
    openedDaysAgo: 14,
  },
  {
    id: 15,
    name: "Trà Sữa Đài Loan",
    image: "/placeholder.svg?height=300&width=500&text=Trà+Sữa",
    rating: 8.5,
    location: "Quận 7, TP.HCM",
    tags: ["Đồ uống", "Trà sữa"],
    openHours: "09:00 - 22:00",
    openedDaysAgo: 10,
  },
  {
    id: 16,
    name: "Bánh Canh Cua",
    image: "/placeholder.svg?height=300&width=500&text=Bánh+Canh+Cua",
    rating: 9.2,
    location: "Quận 5, TP.HCM",
    tags: ["Việt Nam", "Bánh canh"],
    openHours: "06:00 - 21:00",
    openedDaysAgo: 21,
  },
  {
    id: 17,
    name: "Kem Ý Gelato",
    image: "/placeholder.svg?height=300&width=500&text=Kem+Ý",
    rating: 8.9,
    location: "Quận 1, TP.HCM",
    tags: ["Ý", "Kem"],
    openHours: "10:00 - 22:00",
    openedDaysAgo: 5,
  },
  {
    id: 18,
    name: "Bún Riêu Cua",
    image: "/placeholder.svg?height=300&width=500&text=Bún+Riêu",
    rating: 9.1,
    location: "Quận 10, TP.HCM",
    tags: ["Việt Nam", "Bún riêu"],
    openHours: "06:00 - 14:00",
    openedDaysAgo: 18,
  },
]

const topRatedRestaurants = [
  {
    id: 19,
    name: "Quán Ăn Ngon",
    image: "/placeholder.svg?height=300&width=500&text=Quán+Ăn+Ngon",
    rating: 9.8,
    location: "Quận 1, TP.HCM",
    tags: ["Việt Nam", "Đa dạng"],
    openHours: "07:00 - 22:00",
    topRank: 1,
  },
  {
    id: 20,
    name: "Sushi Hokkaido",
    image: "/placeholder.svg?height=300&width=500&text=Sushi+Hokkaido",
    rating: 9.7,
    location: "Quận 3, TP.HCM",
    tags: ["Nhật Bản", "Sushi"],
    openHours: "11:00 - 22:00",
    topRank: 2,
  },
  {
    id: 21,
    name: "Phở Lệ",
    image: "/placeholder.svg?height=300&width=500&text=Phở+Lệ",
    rating: 9.7,
    location: "Quận 5, TP.HCM",
    tags: ["Việt Nam", "Phở"],
    openHours: "06:00 - 22:00",
    topRank: 3,
  },
  {
    id: 22,
    name: "Gogi House",
    image: "/placeholder.svg?height=300&width=500&text=Gogi+House",
    rating: 9.6,
    location: "Quận 7, TP.HCM",
    tags: ["Hàn Quốc", "Nướng"],
    openHours: "10:00 - 22:00",
    topRank: 4,
  },
  {
    id: 23,
    name: "Hủ Tiếu Nam Vang",
    image: "/placeholder.svg?height=300&width=500&text=Hủ+Tiếu",
    rating: 9.6,
    location: "Quận 5, TP.HCM",
    tags: ["Việt Nam", "Hủ tiếu"],
    openHours: "06:00 - 14:00",
    topRank: 5,
  },
  {
    id: 24,
    name: "Pizza 4P's",
    image: "/placeholder.svg?height=300&width=500&text=Pizza+4Ps",
    rating: 9.5,
    location: "Quận 1, TP.HCM",
    tags: ["Ý", "Pizza"],
    openHours: "11:00 - 22:00",
    topRank: 6,
  },
]

