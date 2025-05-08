"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function CreateRestaurant() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    district: "",
    city: "",
    price_range: "",
    category: "",
    cuisine_style: "",
    target_audience: "",
    opening_hours: "",
    images: "",
    description: "",
    menu_items: [] as { name: string; price: string; description: string; image_url: string }[],
  });

  const [newMenuItem, setNewMenuItem] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
  });

  const [alert, setAlert] = useState({ message: "", type: "" });
  const [step, setStep] = useState(1); // 1 for restaurant info, 2 for menu items
  const [createdRestaurantId, setCreatedRestaurantId] = useState(null);

  // Kiểm tra token trong localStorage khi client-side
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      setAlert({
        message: "Bạn cần đăng nhập để thực hiện chức năng này",
        type: "error",
      });
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNewMenuItemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewMenuItem({
      ...newMenuItem,
      [name]: value,
    });
  };

  const addMenuItem = () => {
    if (!newMenuItem.name || !newMenuItem.price) {
      setAlert({
        message: "Tên món ăn và giá là bắt buộc",
        type: "error",
      });
      return;
    }

    setFormData({
      ...formData,
      menu_items: [...formData.menu_items, { ...newMenuItem }],
    });

    // Reset new menu item form
    setNewMenuItem({
      name: "",
      description: "",
      price: "",
      image_url: "",
    });

    setAlert({ message: "", type: "" });
  };

  const removeMenuItem = (index: number) => {
    const updatedMenuItems = [...formData.menu_items];
    updatedMenuItems.splice(index, 1);
    setFormData({
      ...formData,
      menu_items: updatedMenuItems,
    });
  };

  const goToStep = (stepNumber: number) => {
    setStep(stepNumber);
    setAlert({ message: "", type: "" });
  };

  const validateRestaurantForm = () => {
    const requiredFields: (keyof typeof formData)[] = ["name", "district", "city", "price_range", "category", "opening_hours"];

    for (const field of requiredFields) {
      if (!formData[field]) {
        setAlert({
          message: `Vui lòng nhập đầy đủ thông tin bắt buộc`,
          type: "error",
        });
        return false;
      }
    }

    return true;
  };

  const handleCreateRestaurant = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      setAlert({
        message: "Bạn cần đăng nhập để thực hiện chức năng này",
        type: "error",
      });
      router.push("/login"); // Chuyển hướng đến trang đăng nhập nếu không có token
      return;
    }

    if (!validateRestaurantForm()) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/owner/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setAlert({
          message: "Tạo nhà hàng thành công!",
          type: "success",
        });
        const newId = data.id || data.restaurant?.id;
        if (!newId) {
          setAlert({ message: "Không lấy được ID nhà hàng từ server", type: "error" });
          return;
        }
        setCreatedRestaurantId(newId); // Lưu ID nhà hàng mới
      } else {
        const errorData = await response.json();
        setAlert({
          message: `Lỗi: ${errorData.detail || "Không thể tạo nhà hàng"}`,
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error creating restaurant:", error);
      setAlert({
        message: "Đã xảy ra lỗi khi tạo nhà hàng",
        type: "error",
      });
    }
  };

  const handleAddMenu = async () => {
    if (!createdRestaurantId) {
      setAlert({
        message: "Không tìm thấy ID nhà hàng. Vui lòng tạo nhà hàng trước",
        type: "error",
      });
      return;
    }

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      setAlert({
        message: "Bạn cần đăng nhập để thực hiện chức năng này",
        type: "error",
      });
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      return;
    }

    if (!newMenuItem.name || !newMenuItem.price) {
      setAlert({
        message: "Tên món ăn và giá là bắt buộc",
        type: "error",
      });
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/owner/${createdRestaurantId}/menu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newMenuItem),
      });

      if (response.ok) {
        setAlert({
          message: "Thêm món ăn thành công!",
          type: "success",
        });

        setFormData({
          ...formData,
          menu_items: [...formData.menu_items, { ...newMenuItem }],
        });

        setNewMenuItem({
          name: "",
          description: "",
          price: "",
          image_url: "",
        });
      } else {
        const errorData = await response.json();
        setAlert({
          message: `Lỗi: ${errorData.detail || "Không thể thêm món ăn"}`,
          type: "error",
        });
      }
    } catch (error:any) {
        if (error instanceof TypeError && error.message === "Failed to fetch") {
            setAlert({ message: "Không thể kết nối đến máy chủ. Vui lòng kiểm tra API hoặc mạng.", type: "error" });
          } else {
            console.error("Error adding menu item:", error);
          }; 
      setAlert({
        message: "Đã xảy ra lỗi khi thêm món ăn",
        type: "error",
      });
    }
  };

  const handleFinish = () => {
    router.push("/admin");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" className="mb-6" onClick={() => router.push("/admin")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Quay lại Dashboard
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Tạo nhà hàng mới</h1>
        <p className="text-gray-500">Nhập thông tin để tạo nhà hàng mới</p>
      </div>

      {/* Step indicator */}
      <div className="flex mb-8">
        <div
          className={`flex-1 p-4 text-center border-b-2 cursor-pointer ${
            step === 1 ? "border-blue-500 text-blue-500 font-medium" : "border-gray-200"
          }`}
          onClick={() => goToStep(1)}
        >
          1. Thông tin nhà hàng
        </div>
        <div
          className={`flex-1 p-4 text-center border-b-2 cursor-pointer ${
            step === 2 ? "border-blue-500 text-blue-500 font-medium" : "border-gray-200"
          }`}
          onClick={() => createdRestaurantId && goToStep(2)}
        >
          2. Thêm menu
        </div>
      </div>

      {alert.message && (
        <Alert
          className={`mb-6 ${
            alert.type === "success"
              ? "bg-green-50 text-green-800 border-green-200"
              : "bg-red-50 text-red-800 border-red-200"
          }`}
        >
          <AlertTitle>{alert.type === "success" ? "Thành công" : "Lỗi"}</AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}

      {/* Restaurant Info Form */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Thông tin nhà hàng</CardTitle>
            <CardDescription>Nhập thông tin chi tiết về nhà hàng</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Tên nhà hàng <span className="text-red-500">*</span></Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Nhập tên nhà hàng"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="district">Quận/Huyện <span className="text-red-500">*</span></Label>
                <Input
                  id="district"
                  name="district"
                  placeholder="Nhập quận/huyện"
                  value={formData.district}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Thành phố <span className="text-red-500">*</span></Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="Nhập thành phố"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price_range">Khoảng giá <span className="text-red-500">*</span></Label>
                <Input
                  id="price_range"
                  name="price_range"
                  placeholder="Nhập khoảng giá"
                  value={formData.price_range}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Danh mục <span className="text-red-500">*</span></Label>
                <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="restaurant">Nhà hàng</SelectItem>
                    <SelectItem value="cafe">Quán cà phê</SelectItem>
                    <SelectItem value="fast_food">Đồ ăn nhanh</SelectItem>
                    <SelectItem value="bistro">Bistro</SelectItem>
                    <SelectItem value="bar">Quán bar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cuisine_style">Phong cách ẩm thực</Label>
                <Input
                  id="cuisine_style"
                  name="cuisine_style"
                  placeholder="Nhập phong cách ẩm thực"
                  value={formData.cuisine_style}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="target_audience">Đối tượng khách hàng</Label>
                <Input
                  id="target_audience"
                  name="target_audience"
                  placeholder="Nhập đối tượng khách hàng"
                  value={formData.target_audience}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="opening_hours">Giờ mở cửa <span className="text-red-500">*</span></Label>
                <Input
                  id="opening_hours"
                  name="opening_hours"
                  placeholder="Ví dụ: 8:00 - 22:00"
                  value={formData.opening_hours}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="images">URL hình ảnh</Label>
                <Input
                  id="images"
                  name="images"
                  placeholder="Nhập URL hình ảnh (ngăn cách bằng dấu phẩy nếu có nhiều)"
                  value={formData.images}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Nhập mô tả về nhà hàng"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
              />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Menu món ăn (Tùy chọn)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg mb-4">
                <div className="space-y-2">
                  <Label htmlFor="item-name">Tên món ăn</Label>
                  <Input
                    id="item-name"
                    name="name"
                    placeholder="Nhập tên món ăn"
                    value={newMenuItem.name}
                    onChange={handleNewMenuItemChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="item-price">Giá</Label>
                  <Input
                    id="item-price"
                    name="price"
                    placeholder="Nhập giá"
                    value={newMenuItem.price}
                    onChange={handleNewMenuItemChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="item-description">Mô tả món ăn</Label>
                  <Textarea
                    id="item-description"
                    name="description"
                    placeholder="Nhập mô tả món ăn"
                    value={newMenuItem.description}
                    onChange={handleNewMenuItemChange}
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="item-image">URL hình ảnh món ăn</Label>
                  <Input
                    id="item-image"
                    name="image_url"
                    placeholder="Nhập URL hình ảnh món ăn"
                    value={newMenuItem.image_url}
                    onChange={handleNewMenuItemChange}
                  />
                </div>
                <div className="col-span-2 flex justify-end">
                  <Button type="button" variant="outline" onClick={addMenuItem}>
                    <Plus className="mr-2 h-4 w-4" />
                    Thêm món ăn
                  </Button>
                </div>
              </div>

              {formData.menu_items.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Danh sách món ăn đã thêm:</h4>
                  <div className="space-y-2">
                    {formData.menu_items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                        <div>
                          <span className="font-medium">{item.name}</span>
                          <span className="ml-2 text-gray-600">{item.price}</span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeMenuItem(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push("/admin")}>Hủy</Button>
            <Button onClick={handleCreateRestaurant}>Tạo nhà hàng</Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Thêm món ăn vào menu</CardTitle>
            <CardDescription>Thêm các món ăn vào menu của nhà hàng (ID: {createdRestaurantId})</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg mb-4">
              <div className="space-y-2">
                <Label htmlFor="menu-name">Tên món ăn <span className="text-red-500">*</span></Label>
                <Input
                  id="menu-name"
                  name="name"
                  placeholder="Nhập tên món ăn"
                  value={newMenuItem.name}
                  onChange={handleNewMenuItemChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="menu-price">Giá <span className="text-red-500">*</span></Label>
                <Input
                  id="menu-price"
                  name="price"
                  placeholder="Nhập giá"
                  value={newMenuItem.price}
                  onChange={handleNewMenuItemChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="menu-description">Mô tả món ăn</Label>
                <Textarea
                  id="menu-description"
                  name="description"
                  placeholder="Nhập mô tả món ăn"
                  value={newMenuItem.description}
                  onChange={handleNewMenuItemChange}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="menu-image">URL hình ảnh món ăn</Label>
                <Input
                  id="menu-image"
                  name="image_url"
                  placeholder="Nhập URL hình ảnh món ăn"
                  value={newMenuItem.image_url}
                  onChange={handleNewMenuItemChange}
                />
              </div>
              <div className="col-span-2 flex justify-end">
                <Button type="button" onClick={handleAddMenu} className="bg-green-600 hover:bg-green-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm món ăn vào menu
                </Button>
              </div>
            </div>

            {formData.menu_items.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Menu của nhà hàng:</h4>
                <div className="space-y-2">
                  {formData.menu_items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="ml-2 text-gray-600">{item.price}</span>
                        {item.description && (
                          <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => goToStep(1)}>Quay lại</Button>
            <Button onClick={handleFinish}>Hoàn thành</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
