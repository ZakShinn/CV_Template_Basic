# CV-Basic

Trang CV cá nhân chuyên nghiệp, dễ chỉnh sửa, deploy miễn phí trên [Vercel](https://vercel.com).

## Cấu trúc CV

| Section | File cấu hình |
|---------|----------------|
| Họ tên, chức danh, ảnh | `src/data/cv.ts` → `personal` |
| Liên hệ | `contact` |
| Phương châm, kỹ năng mềm, sở thích, mong muốn | `personalInfo` |
| Tóm tắt | `summary` |
| Kinh nghiệm | `experience` |
| Học vấn | `education` |
| Kỹ năng | `skills` |
| Dự án | `projects` |
| Chứng chỉ | `certifications` |
| Ngôn ngữ | `languages` |
| Người tham chiếu (tùy chọn) | `references` |

**Hướng dẫn chi tiết** (dữ liệu, màu, font, ẩn section, PDF, …): [`src/data/HUONG-DAN.md`](src/data/HUONG-DAN.md)

**Nội dung CV:** `src/data/cv.ts`

## Chạy local

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Deploy lên Vercel

1. Đẩy repo lên GitHub.
2. Vào [vercel.com/new](https://vercel.com/new) → Import repository.
3. Framework: **Next.js** (tự nhận diện).
4. Deploy — không cần biến môi trường.

Hoặc dùng CLI:

```bash
npx vercel
```

Sau khi deploy, cập nhật `meta.siteUrl` trong `cv.ts` bằng URL Vercel thật (SEO / Open Graph).

## In hoặc xuất PDF

Trên trang web, bấm **In / PDF** (hoặc `Ctrl+P` / `Cmd+P`) → chọn **Save as PDF**.

## Ảnh đại diện

Đặt URL ảnh vào `personal.avatarUrl` (HTTPS). Để trống `""` sẽ hiển thị chữ cái đầu tên.

Hoặc đặt file trong `public/avatar.jpg` và dùng:

```ts
avatarUrl: "/avatar.jpg",
```

## Ngôn ngữ

Đổi `personal.locale` thành `"en"` để hiển thị nhãn section tiếng Anh.

## Tech stack

- Next.js 15 · React 19 · TypeScript
- Tailwind CSS 4
- Tối ưu in ấn (A4)
