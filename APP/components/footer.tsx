import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="h-6 w-6 rounded-full bg-green-600"></span>
              <span className="font-bold text-xl text-white">FoodFinder</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Khám phá, đánh giá và chia sẻ trải nghiệm ẩm thực của bạn với cộng đồng.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Khám Phá</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/search" className="text-gray-400 hover:text-white">
                  Tìm kiếm quán ăn
                </Link>
              </li>
              <li>
                <Link href="/discover" className="text-gray-400 hover:text-white">
                  Đề xuất cho bạn
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-400 hover:text-white">
                  Danh mục món ăn
                </Link>
              </li>
              <li>
                <Link href="/top-rated" className="text-gray-400 hover:text-white">
                  Quán ăn được yêu thích
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Dành Cho Chủ Quán</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/restaurant/register" className="text-gray-400 hover:text-white">
                  Đăng ký quán ăn
                </Link>
              </li>
              <li>
                <Link href="/restaurant/login" className="text-gray-400 hover:text-white">
                  Đăng nhập
                </Link>
              </li>
              <li>
                <Link href="/restaurant/dashboard" className="text-gray-400 hover:text-white">
                  Quản lý quán ăn
                </Link>
              </li>
              <li>
                <Link href="/restaurant/marketing" className="text-gray-400 hover:text-white">
                  Giải pháp marketing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Hỗ Trợ</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-white">
                  Trung tâm trợ giúp
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white">
                  Điều khoản sử dụng
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center text-gray-400">
          <p>© {new Date().getFullYear()} FoodFinder. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}

