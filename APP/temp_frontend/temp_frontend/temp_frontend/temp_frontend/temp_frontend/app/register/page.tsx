// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Eye, EyeOff } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { registerUser } from "@/lib/auth";


// // Định nghĩa interface cho tham số registerUser để đảm bảo TypeScript hiểu tất cả các trường
// interface RegisterUserParams {
//   username: string;
//   email: string;
//   password: string;
//   full_name: string;
//   age: number;
//   occupation: string;
//   role?: string;
//   city?: string;
//   district?: string;
//   favorite_cuisine?: string;
// }

// // Cuisine options ordered by popularity
// const cuisineOptions = [
//   { label: 'Món Việt', value: 'Món Việt' },
//   { label: 'Quốc tế', value: 'Quốc tế' },
//   { label: 'Món Bắc', value: 'Món Bắc' },
//   { label: 'Món Hàn', value: 'Món Hàn' },
//   { label: 'Hà Nội', value: 'Hà Nội' },
//   { label: 'Món Á', value: 'Món Á' },
//   { label: 'Món Nhật', value: 'Món Nhật' },
//   { label: 'Đài Loan', value: 'Đài Loan' },
//   { label: 'Pháp', value: 'Pháp' },
//   { label: 'Món Trung Hoa', value: 'Món Trung Hoa' },
//   { label: 'Món Thái', value: 'Món Thái' },
//   { label: 'Món Miền Nam', value: 'Món Miền Nam' },
//   { label: 'Mỹ', value: 'Mỹ' },
//   { label: 'Món Âu', value: 'Món Âu' },
//   { label: 'Ý', value: 'Ý' },
//   { label: 'Món Miền Trung', value: 'Món Miền Trung' },
//   { label: 'Singapore', value: 'Singapore' },
//   { label: 'Món Quảng', value: 'Món Quảng' },
//   { label: 'Châu Mỹ', value: 'Châu Mỹ' },
//   { label: 'Món Ấn Độ', value: 'Món Ấn Độ' },
//   { label: 'Món Huế', value: 'Món Huế' },
//   { label: 'Đặc biệt', value: 'Đặc biệt' },
//   { label: 'Malaysia', value: 'Malaysia' },
//   { label: 'Nha Trang', value: 'Nha Trang' },
//   { label: 'Đông Âu', value: 'Đông Âu' },
//   { label: 'Bánh Pizza', value: 'Bánh Pizza' },
//   { label: 'Tây Bắc', value: 'Tây Bắc' },
//   { label: 'Thổ Nhĩ Kỳ', value: 'Thổ Nhĩ Kỳ' },
//   { label: 'Tiệp (Séc)', value: 'Tiệp (Séc)' },
//   { label: 'Miền Tây', value: 'Miền Tây' },
//   { label: 'Brazil', value: 'Brazil' },
//   { label: 'Úc', value: 'Úc' },
//   { label: 'Trung Đông', value: 'Trung Đông' },
//   { label: 'Không xác định', value: 'undefined_cuisine' },
// ];

// export default function RegisterPage() {
//   const router = useRouter();
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     occupation: "",
//     age: "",
//     favorite_cuisine: "",
//     city: "",
//     district: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleRegister = async () => {
//     setError("");
//     setSuccess("");
//     if (form.password !== form.confirmPassword) {
//       setError("Mật khẩu xác nhận không khớp");
//       return;
//     }
    
//     // Convert undefined_cuisine value back to empty string for the API
//     const favoriteCuisine = form.favorite_cuisine === 'undefined_cuisine' ? '' : form.favorite_cuisine;
//     const extractedUsername = form.email.split("@")[0];

//     try {
//       await registerUser({
//         username: extractedUsername,
//         email: form.email,
//         password: form.password,
//         full_name: form.name,
//         age: parseFloat(form.age),
//         occupation: form.occupation,
//         favorite_cuisine: favoriteCuisine,
//         city: form.city,
//         district: form.district,
//       });
//       setSuccess("Đăng ký thành công!");
//       router.push("/login");
//     } catch (err: any) {
//       setError(err.message || "Đăng ký thất bại");
//     }
//   };

//   return (
//     <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-16rem)] py-12">
//       <Card className="w-full max-w-md">
//         <CardHeader className="space-y-1">
//           <CardTitle className="text-2xl font-bold text-center">Đăng ký tài khoản</CardTitle>
//           <CardDescription className="text-center">
//             Nhập thông tin của bạn để tạo tài khoản mới
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="name">Họ và tên</Label>
//             <Input
//               id="name"
//               name="name"
//               placeholder="Nguyễn Văn A"
//               value={form.name}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               name="email"
//               type="email"
//               placeholder="example@example.com"
//               value={form.email}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="age">Độ tuổi</Label>
//             <Input
//               id="age"
//               name="age"
//               type="number"
//               min={10}
//               max={100}
//               step="1"
//               placeholder="Nhập tuổi của bạn"
//               value={form.age}
//               onChange={(e) => setForm({ ...form, age: e.target.value })}
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="userGroup">Bạn thuộc nhóm nào?</Label>
//             <Select onValueChange={(value) => setForm({ ...form, occupation: value })}>
//               <SelectTrigger id="userGroup" className="w-full">
//                 <SelectValue placeholder="Chọn nhóm phù hợp" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Gia đình">Gia đình</SelectItem>
//                 <SelectItem value="Nhóm hội">Nhóm hội</SelectItem>
//                 <SelectItem value="Giới văn phòng">Giới văn phòng</SelectItem>
//                 <SelectItem value="Cặp đôi">Cặp đôi</SelectItem>
//                 <SelectItem value="Sinh viên">Sinh viên</SelectItem>
//                 <SelectItem value="Khách du lịch">Khách du lịch</SelectItem>
//                 <SelectItem value="Trẻ em">Trẻ em</SelectItem>
//                 <SelectItem value="Giới Manager">Giới Manager</SelectItem>
//                 <SelectItem value="Không xác định">Không xác định</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="city">Thành phố</Label>
//             <Input
//               id="city"
//               name="city"
//               placeholder="Nhập thành phố của bạn"
//               value={form.city}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="district">Quận/Huyện</Label>
//             <Input
//               id="district"
//               name="district"
//               placeholder="Nhập quận/huyện của bạn"
//               value={form.district}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="favoriteCuisine">Món ăn yêu thích</Label>
//             <Select onValueChange={(value) => setForm({ ...form, favorite_cuisine: value })}>
//               <SelectTrigger id="favoriteCuisine" className="w-full">
//                 <SelectValue placeholder="Chọn món ăn yêu thích" />
//               </SelectTrigger>
//               <SelectContent className="max-h-80">
//                 {cuisineOptions.map((cuisine) => (
//                   <SelectItem key={cuisine.value} value={cuisine.value}>
//                     {cuisine.label}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="password">Mật khẩu</Label>
//             <div className="relative">
//               <Input
//                 id="password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="••••••••"
//                 value={form.password}
//                 onChange={handleChange}
//               />
//               <Button
//                 type="button"
//                 variant="ghost"
//                 size="icon"
//                 className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? (
//                   <EyeOff className="h-4 w-4 text-gray-500" />
//                 ) : (
//                   <Eye className="h-4 w-4 text-gray-500" />
//                 )}
//               </Button>
//             </div>
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
//             <div className="relative">
//               <Input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type={showConfirmPassword ? "text" : "password"}
//                 placeholder="••••••••"
//                 value={form.confirmPassword}
//                 onChange={handleChange}
//               />
//               <Button
//                 type="button"
//                 variant="ghost"
//                 size="icon"
//                 className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 {showConfirmPassword ? (
//                   <EyeOff className="h-4 w-4 text-gray-500" />
//                 ) : (
//                   <Eye className="h-4 w-4 text-gray-500" />
//                 )}
//               </Button>
//             </div>
//           </div>
//           {error && <p className="text-sm text-red-600">{error}</p>}
//           {success && <p className="text-sm text-green-600">{success}</p>}
//         </CardContent>
//         <CardFooter className="flex flex-col">
//           <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleRegister}>
//             Đăng ký
//           </Button>
//           <div className="mt-4 text-center text-sm">
//             Đã có tài khoản?{" "}
//             <Link href="/login" className="text-green-600 hover:text-green-700 font-medium">
//               Đăng nhập
//             </Link>
//           </div>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { registerUser } from "@/lib/auth";

// Định nghĩa interface cho tham số registerUser để đảm bảo TypeScript hiểu tất cả các trường
interface RegisterUserParams {
  username: string;
  email: string;
  password: string;
  full_name: string;
  age: number;
  occupation: string;
  role?: string;
  city?: string;
  district?: string;
  favorite_cuisine?: string;
}

// Cuisine options ordered by popularity
const cuisineOptions = [
  { label: 'Món Việt', value: 'Món Việt' },
  { label: 'Quốc tế', value: 'Quốc tế' },
  { label: 'Món Bắc', value: 'Món Bắc' },
  { label: 'Món Hàn', value: 'Món Hàn' },
  { label: 'Hà Nội', value: 'Hà Nội' },
  { label: 'Món Á', value: 'Món Á' },
  { label: 'Món Nhật', value: 'Món Nhật' },
  { label: 'Đài Loan', value: 'Đài Loan' },
  { label: 'Pháp', value: 'Pháp' },
  { label: 'Món Trung Hoa', value: 'Món Trung Hoa' },
  { label: 'Món Thái', value: 'Món Thái' },
  { label: 'Món Miền Nam', value: 'Món Miền Nam' },
  { label: 'Mỹ', value: 'Mỹ' },
  { label: 'Món Âu', value: 'Món Âu' },
  { label: 'Ý', value: 'Ý' },
  { label: 'Món Miền Trung', value: 'Món Miền Trung' },
  { label: 'Singapore', value: 'Singapore' },
  { label: 'Món Quảng', value: 'Món Quảng' },
  { label: 'Châu Mỹ', value: 'Châu Mỹ' },
  { label: 'Món Ấn Độ', value: 'Món Ấn Độ' },
  { label: 'Món Huế', value: 'Món Huế' },
  { label: 'Đặc biệt', value: 'Đặc biệt' },
  { label: 'Malaysia', value: 'Malaysia' },
  { label: 'Nha Trang', value: 'Nha Trang' },
  { label: 'Đông Âu', value: 'Đông Âu' },
  { label: 'Bánh Pizza', value: 'Bánh Pizza' },
  { label: 'Tây Bắc', value: 'Tây Bắc' },
  { label: 'Thổ Nhĩ Kỳ', value: 'Thổ Nhĩ Kỳ' },
  { label: 'Tiệp (Séc)', value: 'Tiệp (Séc)' },
  { label: 'Miền Tây', value: 'Miền Tây' },
  { label: 'Brazil', value: 'Brazil' },
  { label: 'Úc', value: 'Úc' },
  { label: 'Trung Đông', value: 'Trung Đông' },
  { label: 'Không xác định', value: 'undefined_cuisine' },
];

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    occupation: "",
    age: "",
    favorite_cuisine: "",
    city: "",
    district: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setError("");
    setSuccess("");
    if (form.password !== form.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }
    
    // Convert undefined_cuisine value back to empty string for the API
    const favoriteCuisine = form.favorite_cuisine === 'undefined_cuisine' ? '' : form.favorite_cuisine;
    const extractedUsername = form.email.split("@")[0];

    try {
      await registerUser({
        username: extractedUsername,
        email: form.email,
        password: form.password,
        full_name: form.name,
        age: parseFloat(form.age),
        occupation: form.occupation,
        favorite_cuisine: favoriteCuisine,
        city: form.city,
        district: form.district,
      });
      setSuccess("Đăng ký thành công!");
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Đăng ký thất bại");
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-16rem)] py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Đăng ký tài khoản</CardTitle>
          <CardDescription className="text-center">
            Nhập thông tin của bạn để tạo tài khoản mới
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Họ và tên</Label>
            <Input
              id="name"
              name="name"
              placeholder="Nguyễn Văn A"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Độ tuổi</Label>
            <Input
              id="age"
              name="age"
              type="number"
              min={10}
              max={100}
              step="1"
              placeholder="Nhập tuổi của bạn"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="userGroup">Bạn thuộc nhóm nào?</Label>
            <Select onValueChange={(value) => setForm({ ...form, occupation: value })}>
              <SelectTrigger id="userGroup" className="w-full">
                <SelectValue placeholder="Chọn nhóm phù hợp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Gia đình">Gia đình</SelectItem>
                <SelectItem value="Nhóm hội">Nhóm hội</SelectItem>
                <SelectItem value="Giới văn phòng">Giới văn phòng</SelectItem>
                <SelectItem value="Cặp đôi">Cặp đôi</SelectItem>
                <SelectItem value="Sinh viên">Sinh viên</SelectItem>
                <SelectItem value="Khách du lịch">Khách du lịch</SelectItem>
                <SelectItem value="Trẻ em">Trẻ em</SelectItem>
                <SelectItem value="Giới Manager">Giới Manager</SelectItem>
                <SelectItem value="Không xác định">Không xác định</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">Thành phố</Label>
            <Input
              id="city"
              name="city"
              placeholder="Nhập thành phố của bạn"
              value={form.city}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="district">Quận/Huyện</Label>
            <Input
              id="district"
              name="district"
              placeholder="Nhập quận/huyện của bạn"
              value={form.district}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="favoriteCuisine">Món ăn yêu thích</Label>
            <Select onValueChange={(value) => setForm({ ...form, favorite_cuisine: value })}>
              <SelectTrigger id="favoriteCuisine" className="w-full">
                <SelectValue placeholder="Chọn món ăn yêu thích" />
              </SelectTrigger>
              <SelectContent className="max-h-80">
                {cuisineOptions.map((cuisine) => (
                  <SelectItem key={cuisine.value} value={cuisine.value}>
                    {cuisine.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleRegister}>
            Đăng ký
          </Button>
          <div className="mt-4 text-center text-sm">
            Đã có tài khoản?{" "}
            <Link href="/login" className="text-green-600 hover:text-green-700 font-medium">
              Đăng nhập
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
