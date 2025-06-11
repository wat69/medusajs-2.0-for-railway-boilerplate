// src/app/api/vendor/promote-vendor/route.ts
import { NextResponse } from "next/server";
import { getCustomer } from "@lib/data/customer";  // alias till src/lib/data/customer

export async function POST(request: Request) {
  // 1) Läs ut den JSON-body vi skickade från klienten
  const { password } = await request.json();
  if (!password) {
    return NextResponse.json({ error: "Lösenord krävs" }, { status: 400 });
  }

  // 2) Hämta inloggad kund på serversidan
  const customer = await getCustomer();
  if (!customer?.email) {
    return NextResponse.json({ error: "Inte inloggad" }, { status: 401 });
  }

  // 3) Skicka vidare till Medusa-vendor-register
  const medusaRes = await fetch(
    `${process.env.BACKEND_URL}/auth/vendor/emailpass/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: customer.email,
        password,
      }),
    }
  );

  const payload = await medusaRes.json();
  if (!medusaRes.ok) {
    return NextResponse.json({ error: payload.message || "Misslyckades" }, {
      status: medusaRes.status,
    });
  }

  return NextResponse.json({ success: true });
}
