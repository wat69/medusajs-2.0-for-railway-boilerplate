// src/app/api/admin/products/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();

  try {
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

    const json = await medusaRes.json();
    return NextResponse.json(json, { status: medusaRes.status });
  } catch (err) {
    return NextResponse.json(
      { error: "Serverfel vid anrop mot Medusa" },
      { status: 500 }
    );
  }
}
