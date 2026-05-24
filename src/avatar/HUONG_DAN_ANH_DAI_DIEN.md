# Hướng dẫn ảnh đại diện

Ảnh tròn trên header cấu hình tại **[`config.ts`](./config.ts)**.

## Thêm ảnh

1. Đặt ảnh vào `public/` (vd: `public/avatar.jpg`).
2. Mở `src/avatar/config.ts`:

```ts
enabled: true,
src: "/avatar.jpg",
alt: "Nguyễn Văn A",
```

3. Lưu file và làm mới trình duyệt.

Không cần sửa `cv.ts`.

## Không dùng ảnh

```ts
enabled: true,
src: "",
```

Trang hiển thị **2 chữ cái đầu** họ tên (vd: Nguyễn Văn A → **VA**).

## Các tuỳ chọn

| Trường | Ý nghĩa |
|--------|---------|
| `enabled` | `false` = luôn dùng chữ cái đầu |
| `src` | Đường dẫn từ `public/` hoặc URL HTTPS |
| `alt` | Mô tả accessibility — trống = dùng họ tên |
| `objectFit` | `cover` hoặc `contain` |
| `hideInPrint` | `true` = không in ảnh ra PDF |

## Khuyến nghị

- JPG/WebP, vuông hoặc gần vuông, ≥ 400×400 px, &lt; 500 KB.
- Nền trung tính — phù hợp khung tròn header.
