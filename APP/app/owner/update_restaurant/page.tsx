"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface RestaurantFormData {
  name: string;
  district: string;
  city: string;
  price_range: string;
  category: string;
  cuisine_style: string;
  target_audience: string;
  opening_hours: string;
  images: string;
  description: string;
}

export default function UpdateRestaurantPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<RestaurantFormData>({
    name: "",
    district: "",
    city: "",
    price_range: "",
    category: "",
    cuisine_style: "",
    target_audience: "",
    opening_hours: "",
    images: "",
    description: ""
  });
  const [alert, setAlert] = useState({ message: "", type: "" });

  const restaurantId = typeof window !== "undefined" ? localStorage.getItem("restaurant_id_to_update") : null;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!restaurantId || !token) {
      setAlert({ message: "Thiếu thông tin ID hoặc token", type: "error" });
      router.push("/owner");
      return;
    }

    fetch(`http://127.0.0.1:8000/api/owner/${restaurantId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setFormData({
          name: data.name || "",
          district: data.district || "",
          city: data.city || "",
          price_range: data.price_range || "",
          category: data.category || "",
          cuisine_style: data.cuisine_style || "",
          target_audience: data.target_audience || "",
          opening_hours: data.opening_hours || "",
          images: data.images || "",
          description: data.description || ""
        });
      })
      .catch(() => {
        setAlert({ message: "Không thể tải dữ liệu nhà hàng", type: "error" });
      });
  }, [restaurantId, router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token || !restaurantId) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/owner/${restaurantId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setAlert({ message: "Cập nhật thành công", type: "success" });
      } else {
        const error = await res.json();
        setAlert({ message: error.detail || "Cập nhật thất bại", type: "error" });
      }
    } catch (err) {
      console.error(err);
      setAlert({ message: "Lỗi khi gửi yêu cầu", type: "error" });
    }
  };

  const fieldLabels: Record<keyof RestaurantFormData, string> = {
    name: "Tên nhà hàng",
    district: "Quận/Huyện",
    city: "Thành phố",
    price_range: "Khoảng giá",
    category: "Loại hình quán ăn",
    cuisine_style: "Phong cách ẩm thực",
    target_audience: "Đối tượng khách hàng",
    opening_hours: "Giờ mở cửa",
    images: "URL hình ảnh",
    description: "Mô tả"
  };

  const fieldPlaceholders: Record<keyof RestaurantFormData, string> = {
    name: "Nhập tên nhà hàng",
    district: "Nhập quận/huyện",
    city: "Nhập thành phố",
    price_range: "Nhập khoảng giá (VD: 100.000 - 300.000)",
    category: "Nhập loại hình quán ăn (VD: Nhà hàng, Quán cà phê, Đồ ăn nhanh...)",
    cuisine_style: "Nhập phong cách ẩm thực",
    target_audience: "Nhập đối tượng khách hàng",
    opening_hours: "Ví dụ: 8:00 - 22:00",
    images: "Nhập URL hình ảnh (ngăn cách bằng dấu phẩy nếu có nhiều)",
    description: "Nhập mô tả về nhà hàng"
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Cập nhật thông tin nhà hàng</h1>

      {alert.message && (
        <Alert className="mb-4">
          <AlertTitle>{alert.type === "success" ? "Thành công" : "Lỗi"}</AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Thông tin nhà hàng</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {(Object.keys(formData) as (keyof RestaurantFormData)[]).map((key) => (
            <div key={key} className="space-y-1">
              <Label htmlFor={key}>{fieldLabels[key]}</Label>
              {key === "description" ? (
                <Textarea
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  rows={4}
                  placeholder={fieldPlaceholders[key]}
                />
              ) : (
                <Input
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  placeholder={fieldPlaceholders[key]}
                />
              )}
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSubmit}>Lưu thay đổi</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
