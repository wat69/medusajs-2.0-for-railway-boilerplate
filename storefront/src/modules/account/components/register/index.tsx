"use client"

import { useFormState } from "react-dom"

import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(signup, null)

  return (
    <div
      className="max-w-sm flex flex-col items-center"
      data-testid="register-page"
    >
      <h1 className="text-large-semi uppercase mb-6">
        Skapa konto
      </h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-4">
        Skapa ett konto om du vill skapa en egen annons. Det underlättar också om du vill genomföra ett köp eller kanske skicka in en fråga kring produkten (kanske lägga ett eget bud?) - eller bara vill spara en favorit-lista eller en kundvagn.
      </p>
      <form className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Förnamn"
            name="first_name"
            required
            autoComplete="Förnamn"
            data-testid="first-name-input"
          />
          <Input
            label="Efternamn"
            name="last_name"
            required
            autoComplete="Efternamn"
            data-testid="last-name-input"
          />
          <Input
            label="Email"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label="Mobil"
            name="phone"
            type="tel"
            autoComplete="Tele"
            data-testid="phone-input"
          />
          <Input
            label="Lösenord"
            name="password"
            required
            type="password"
            autoComplete="Eget lösenord (minst 6 tecken)"
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="register-error" />
        <span className="text-center text-ui-fg-base text-small-regular mt-6">
          När du skapar ditt konto så kommer vi hantera din data och dina personuppgifter enligt vår integritetspolicy&apos;s{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="underline"
          >
            Integritetspolicy
          </LocalizedClientLink>{" "}
          and{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="underline"
          >
            Köpvillkor
          </LocalizedClientLink>
          .
        </span>
        <SubmitButton className="w-full mt-6" data-testid="register-button">
          Skapa konto
        </SubmitButton>
      </form>
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        Har du redan ett konto?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Logga in
        </button>
        .
      </span>
    </div>
  )
}

export default Register
