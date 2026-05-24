# CV-Basic

Trang CV cá nhân chuyên nghiệp, dễ chỉnh sửa, deploy miễn phí trên [Vercel](https://vercel.com).

## Layout chuẩn

Hai cột A4: **sidebar trái** (liên hệ, kỹ năng, ngôn ngữ) · **cột phải** (tóm tắt, kinh nghiệm, học vấn, dự án). Phù hợp IT, kinh doanh, sinh viên.

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

**Hướng dẫn chi tiết:** [`src/data/HUONG_DAN_NHAP_LIEU.md`](src/data/HUONG_DAN_NHAP_LIEU.md)

**Nội dung CV:** `src/data/cv.ts`

## Chỉnh sửa & xem thay đổi

1. Mở và sửa `src/data/cv.ts` (và file cấu hình trong `src/color/`, `src/font/`, `src/avatar/` nếu cần).
2. Lưu file và làm mới trình duyệt trên trang xem CV.
3. Deploy: đẩy lên GitHub → import trên [vercel.com/new](https://vercel.com/new) → Framework Next.js (tự nhận).

Sau deploy, cập nhật `meta.siteUrl` trong `cv.ts` bằng URL thật (SEO / Open Graph).

## In hoặc xuất PDF

Bấm **In / PDF** trên toolbar hoặc **Ctrl+P** → khổ **A4** → **Save as PDF**. Bật **In nền** nếu muốn giữ màu sidebar.

## Ngôn ngữ

Đổi `personal.locale` thành `"en"` để hiển thị nhãn section tiếng Anh.

## Tech stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · tối ưu in A4
