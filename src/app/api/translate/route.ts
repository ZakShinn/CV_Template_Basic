import { cv, type CVContent } from "@/data/cv";
import { translateCVData } from "@/lib/translate-cv";
import { NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    let body: CVContent = JSON.parse(JSON.stringify(cv)) as CVContent;
    const contentType = request.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      const parsed = await request.json();
      if (parsed && typeof parsed === "object") body = parsed as CVContent;
    }

    const translated = await translateCVData(body);
    return NextResponse.json({ data: translated });
  } catch (e) {
    console.error("[translate]", e);
    return NextResponse.json(
      { error: "Không thể dịch nội dung. Vui lòng thử lại sau." },
      { status: 500 },
    );
  }
}
