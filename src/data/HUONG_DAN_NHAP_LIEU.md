# Hướng dẫn nhập liệu — Basic CV

Mẫu CV **một trang**, hai cột — phù hợp IT, kinh doanh tổng quát, sinh viên mới ra trường. Nội dung lấy từ **`src/data/cv.ts`**.

| Tuỳ chỉnh | File | Hướng dẫn |
|-----------|------|-----------|
| Nội dung CV | `src/data/cv.ts` | File này |
| Ảnh đại diện | `src/avatar/config.ts` | `src/avatar/HUONG_DAN_ANH_DAI_DIEN.md` |
| Màu sắc | `src/color/theme.ts` | `src/color/HUONG_DAN_DOI_MAU.md` |
| Font chữ | `src/font/config.ts` + `src/app/layout.tsx` | `src/font/HUONG_DAN_DOI_FONT.md` |

## Layout chuẩn ngành

| Vùng | Nội dung | Ghi chú |
|------|----------|---------|
| **Header** | Họ tên, chức danh, tagline, ảnh | Căn giữa trên mobile, trái trên desktop |
| **Cột trái (sidebar)** | Liên hệ, kỹ năng mềm, kỹ năng kỹ thuật, ngôn ngữ, chứng chỉ | ~30% chiều rộng — ATS vẫn đọc được |
| **Cột phải (main)** | Tóm tắt → Kinh nghiệm → Học vấn → Dự án → Tham chiếu | Ưu tiên bullet có số liệu |

## Ngôn ngữ nhãn section

Đặt `personal.locale`: `"vi"` hoặc `"en"` trong `cv.ts`. Nhãn section chỉnh trong `src/components/CVPage.tsx` → object `labels`.

## Các khối dữ liệu trong `cv.ts`

| Khối | Ghi chú |
|------|---------|
| `personal` | Họ tên, chức danh, tagline, địa điểm, locale |
| `summary` | Tóm tắt 3–5 câu, nêu năm kinh nghiệm và điểm mạnh |
| `personalInfo` | Phương châm, kỹ năng mềm, sở thích, mong muốn — `""` / `[]` để ẩn |
| `contact` | Email, phone, LinkedIn… — mảng `{ label, href, icon }` |
| `experience` | Mới nhất trên cùng; `highlights` = bullet (bắt đầu bằng động từ) |
| `education` | Trường, bằng, thời gian |
| `skills` | `{ category, items[] }` — nhóm theo stack hoặc vai trò |
| `projects` | `[]` để ẩn section |
| `certifications`, `languages`, `references` | `[]` để ẩn |
| `meta` | `siteTitle`, `description`, `siteUrl` — SEO trang web |

## In PDF

Nút **In / PDF** trên thanh công cụ hoặc **Ctrl+P** → khổ **A4**, lề mặc định. Bật **In nền** nếu muốn giữ màu sidebar. Thanh công cụ có class `no-print` nên không xuất hiện trên bản in.

## Xem thay đổi

Sau khi sửa `cv.ts` (hoặc file cấu hình khác), **lưu file** và **làm mới trình duyệt** (F5) trên trang xem CV. Nếu chạy bản deploy, cần build và publish lại để thay đổi có hiệu lực trên web.
