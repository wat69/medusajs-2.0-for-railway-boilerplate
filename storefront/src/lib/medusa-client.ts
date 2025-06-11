// lib/medusa-client.ts
import { createMedusaClient } from "@medusajs/js-sdk"

const medusa = createMedusaClient({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL!,
  withCredentials: true,
})

export default medusa
