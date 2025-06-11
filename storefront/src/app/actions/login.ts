'use server'

import { cookies } from 'next/headers'
import medusa from '@lib/medusa-client'

export async function login(_: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return 'Email och lösenord krävs.'
  }

  try {
    const session = await medusa.auth.login("customer", "emailpass", {
      email,
      password,
    })

    if (!session?.access_token) {
      console.error("Ingen access_token:", session)
      return "Inloggning misslyckades - token saknas"
    }

    cookies().set({
      name: '_medusa_jwt',
      value: session.access_token,
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
    })

    return null
  } catch (err: any) {
    console.error("Fel vid inloggning:", err)
    return err?.message || 'Inloggning misslyckades'
  }
}
