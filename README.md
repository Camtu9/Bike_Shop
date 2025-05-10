# 🚲 Bike Shop

**Bike Shop** là một ứng dụng web thương mại điện tử dành cho cửa hàng bán xe đạp, được xây dựng với các công nghệ hiện đại như Next.js, MongoDB. Người dùng có thể duyệt qua các sản phẩm, thêm vào giỏ hàng, đăng ký, đăng nhập và đặt hàng trực tuyến.

## 🔧 Tính năng

- **Hiển thị sản phẩm xe đạp**: Duyệt các loại xe đạp với hình ảnh, giá cả và mô tả chi tiết.
- **Giỏ hàng & đặt hàng**: Thêm sản phẩm vào giỏ hàng, cập nhật số lượng.
- **Xác thực người dùng bằng JWT**: Đăng ký, đăng nhập, lưu trữ token để xác thực qua API.
- **Upload ảnh sản phẩm với Cloudinary**: Tối ưu hóa lưu trữ và hiển thị hình ảnh.

## 🚀 Cài đặt và chạy dự án

### 1. Clone repository

```bash
git clone https://github.com/Camtu9/Bike_Shop.git
cd Bike_Shop
```

### 2. Cài đặt các gói phụ thuộc

```bash
npm install
```

### 3. Cấu hình MongoDB

- Tạo tài khoản và cluster tại [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- Lấy connection string và thêm vào `.env.local`:

```env
MONGODB_URI=<YOUR_MONGODB_CONNECTION_URL>
```
### 4. Cấu hình môi trường 
- Thêm vào file `.env.local`

```env
JWT_SECRET=<your_jwt_secret>
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>
```
### 5. Khởi chạy ứng dụng

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: [http://localhost:3000](http://localhost:3000)

## 🛠️ Công nghệ sử dụng

- **Next.js** – Framework React hỗ trợ SSR và tối ưu hóa hiệu năng.
- **MongoDB** – Cơ sở dữ liệu NoSQL lưu trữ thông tin người dùng, sản phẩm và đơn hàng.
- **Axios** – Thư viện HTTP client để giao tiếp với API.
- **Tailwind CSS** – Framework CSS tiện dụng, nhanh chóng cho việc thiết kế giao diện.
- **Cloudinary** - Dịch vụ lưu trữ & xử lý ảnh
- **JWT** - Xác thực người dùng bảo mật qua token

