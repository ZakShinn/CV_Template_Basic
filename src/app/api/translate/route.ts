import { cv } from "@/resume";
import { normalizeCV } from "@/lib/normalize-cv";
import { translateCVData } from "@/lib/translate-cv";
import { NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    let body = cv;
    const contentType = request.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      const parsed = await request.json();
      if (parsed && typeof parsed === "object") {
        body = normalizeCV(parsed as Record<string, unknown>);
      }
    }

    const translated = normalizeCV(
      (await translateCVData(body)) as unknown as Record<string, unknown>,
    );
    return NextResponse.json({ data: translated });
  } catch (e) {
    console.error("[translate]", e);
    return NextResponse.json(
      { error: "Không thể dịch nội dung. Vui lòng thử lại sau." },
      { status: 500 },
    );
  }
}
