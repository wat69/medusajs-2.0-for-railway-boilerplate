// src/app/api/admin/products/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // 1) Logga env-vars för att verifiera att de är satta
    console.log("▶︎ BACKEND_URL:", process.env.BACKEND_URL);
    console.log("▶︎ MEDUSA_ADMIN_TOKEN?", Boolean(process.env.MEDUSA_ADMIN_TOKEN));

    // 2) Läs in FormData
    const formData = await request.formData();

    // 3) Skicka till Medusa
    const medusaRes = await fetch(
      `${process.env.BACKEND_URL}/admin/products`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.MEDUSA_ADMIN_TOKEN}`,
        },
        body: formData,
      }
    );

    // 4) Läs hela kroppen som text först (för bättre felsökning)
    const text = await medusaRes.text();
    console.log(`◾︎ Medusa svarade ${medusaRes.status} med body:`, text);

    // 5) Om det inte är OK, skicka vidare felet
    if (!medusaRes.ok) {
      return NextResponse.json(
        { success: false, error: text },
        { status: medusaRes.status }
      );
    }

    // 6) Parsad JSON vid 2xx
    const data = JSON.parse(text);
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    // 7) Full loggning av eventuellt undantag
    console.error("❌ /api/admin/products crashed:", err);
    return NextResponse.json(
      { success: false, error: "Serverfel mot Medusa – se loggar" },
      { status: 500 }
    );
  }
}
