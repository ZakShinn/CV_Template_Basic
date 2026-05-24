# Hướng dẫn đổi font

Font khai báo tại [`config.ts`](./config.ts) và tải qua **next/font** trong `src/app/layout.tsx`.

## Cách đổi

1. Chọn font trên [Google Fonts](https://fonts.google.com/) (ưu tiên có **Vietnamese**).
2. Sửa `family` trong `src/font/config.ts`.
3. Đổi import trong `layout.tsx` cho khớp `nextFontId` (vd: `Open_Sans` cho "Open Sans").
4. Lưu file và làm mới trình duyệt.

## Hai vai trò

| Vai trò | Dùng cho |
|---------|----------|
| `sans` | Body, liên hệ, mô tả |
| `serif` | Họ tên, tiêu đề section (`font-serif`) |

## Ví dụ đổi sans sang Inter

`config.ts`:

```ts
sans: { family: "Inter", nextFontId: "Inter", variable: "--font-dm-sans" },
```

`layout.tsx`:

```ts
import { Inter, Source_Serif_4 } from "next/font/google";
const inter = Inter({ ... });
```

Giữ `variable` trùng với `config.ts`.
