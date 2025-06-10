// src/pages/api/promote-vendor.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getCustomer } from "@lib/data/customer";  // samma funktion som i frontend

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: "Lösenord krävs" });
  }

  const customer = await getCustomer();  
  if (!customer?.email) {
    return res.status(401).json({ error: "Ingen inloggad användare" });
  }

  try {
    const medusaRes = await fetch(
      `${process.env.BACKEND_URL}/auth/vendor/emailpass/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: customer.email, password }),
      }
    );

    const json = await medusaRes.json();
    if (!medusaRes.ok) {
      return res.status(medusaRes.status).json({ error: json.message });
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("API promote-vendor error:", err);
    return res.status(500).json({ error: "Serverfel vid registrering av säljare" });
  }
}
