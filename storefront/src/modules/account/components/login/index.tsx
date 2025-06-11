'use client'

import { useFormState } from 'react-dom'
import { LOGIN_VIEW } from '@modules/account/templates/login-template'
import Input from '@modules/common/components/input'
import ErrorMessage from '@modules/checkout/components/error-message'
import { SubmitButton } from '@modules/checkout/components/submit-button'
import { login } from '@app/actions/login'

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(login, null)

  return (
    <div className="max-w-sm w-full flex flex-col items-center">
      <h1 className="text-large-semi uppercase mb-6">Logga in</h1>
      <p className="text-center text-base-regular mb-6">
        Logga in för att skapa annonser och hantera dina köp.
      </p>
      <form className="w-full" action={formAction}>
        <div className="flex flex-col gap-y-2">
          <Input label="E-post" name="email" type="email" required />
          <Input label="Lösenord" name="password" type="password" required />
        </div>
        <ErrorMessage error={message} />
        <SubmitButton className="w-full mt-6">Logga in</SubmitButton>
      </form>
      <p className="mt-6 text-sm text-center">
        Inte medlem?{" "}
        <button onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)} className="underline">
          Skapa konto
        </button>
      </p>
    </div>
  )
}

export default Login
