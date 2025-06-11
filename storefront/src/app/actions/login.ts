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
    const session = await medusa.auth.authenticate({ email, password })

    if (!session?.access_token) {
      console.error("access_token saknas i session:", session)
      return "Inloggning misslyckades – inget access_token"
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
    console.error("Autentiseringsfel:", err)
    return err?.message || 'Inloggning misslyckades'
  }
}
