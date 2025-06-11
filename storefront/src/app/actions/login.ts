import { cookies } from "next/headers"
import medusa from "@lib/medusa-client"

export async function login(_: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return "Email och lösenord krävs."
  }

  try {
    const { access_token } = await medusa.auth.authenticate({ email, password })

    // Skapa en cookie
    cookies().set({
      name: "_medusa_jwt",
      value: access_token,
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 dagar
    })

    return null
  } catch (err: any) {
    return err?.message || "Inloggning misslyckades"
  }
}
