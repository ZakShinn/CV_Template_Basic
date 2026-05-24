/**
 * Dịch miễn phí VI → EN (không cần API key).
 *
 * 1. Lingva — proxy Google Translate (mã nguồn mở)
 * 2. MyMemory — dự phòng khi Lingva lỗi
 *
 * Tùy chọn: MYMEMORY_EMAIL trong .env để tăng giới hạn MyMemory.
 */

const LINGVA_INSTANCES = [
  "https://lingva.ml",
  "https://lingva.lunar.icu",
  "https://translate.plausibility.cloud",
];

const FETCH_TIMEOUT_MS = 12_000;

function normalizeTranslation(text: string): string {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();
}

function fetchWithTimeout(url: string, init?: RequestInit) {
  return fetch(url, { ...init, signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
}

async function translateViaLingva(text: string): Promise<string> {
  const chunk = text.trim().slice(0, 1800);
  const encoded = encodeURIComponent(chunk);

  let lastError: Error | null = null;

  for (const base of LINGVA_INSTANCES) {
    try {
      const res = await fetchWithTimeout(`${base}/api/v1/vi/en/${encoded}`);
      if (!res.ok) {
        lastError = new Error(`Lingva ${res.status}`);
        continue;
      }

      const json = (await res.json()) as { translation?: string; error?: string };
      if (json.translation) {
        return normalizeTranslation(json.translation);
      }
      lastError = new Error(json.error || "Lingva empty response");
    } catch (e) {
      lastError = e instanceof Error ? e : new Error(String(e));
    }
  }

  throw lastError ?? new Error("Lingva unavailable");
}

async function translateViaMyMemory(text: string): Promise<string> {
  const chunk = text.trim().slice(0, 450);
  const url = new URL("https://api.mymemory.translated.net/get");
  url.searchParams.set("q", chunk);
  url.searchParams.set("langpair", "vi|en");

  const email = process.env.MYMEMORY_EMAIL?.trim();
  if (email) {
    url.searchParams.set("de", email);
  }

  const res = await fetchWithTimeout(url.toString());
  if (!res.ok) throw new Error(`MyMemory HTTP ${res.status}`);

  const json = (await res.json()) as {
    responseData?: { translatedText?: string };
    responseStatus?: number;
    responseDetails?: string;
  };

  if (json.responseStatus && json.responseStatus !== 200) {
    throw new Error(json.responseDetails || "MyMemory limit or error");
  }

  const translated = json.responseData?.translatedText?.trim();
  if (!translated) throw new Error("MyMemory empty response");

  return normalizeTranslation(translated);
}

const cache = new Map<string, string>();

export async function translateTextFree(text: string): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed) return text;

  const hit = cache.get(trimmed);
  if (hit) return hit;

  let translated: string;
  try {
    translated = await translateViaLingva(trimmed);
  } catch {
    translated = await translateViaMyMemory(trimmed);
  }

  cache.set(trimmed, translated);
  return translated;
}
