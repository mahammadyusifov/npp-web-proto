// src/pages/sign_in/index.page.tsx

import Link from "next/link";
import { useForm } from "react-hook-form";
import Logo from "@/assets/logo_2xl.svg";
import { usePostLogin } from "@/apis/auth/usePostLogin";
import { useRouter } from "next/router";
import { cssObj } from "./style";
import { ROUTER } from "@/constants/ROUTER";
import { API_URL } from "@/constants/API_URL";

type FormValues = {
  email: string;
  password: string;
};

export default function SignIn() {
  const router = useRouter();
  const { mutate: loginMutate } = usePostLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => {
    fetch(API_URL.AUTH.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers":
          "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        router.push("/");
        console.log("login success");
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  });

  return (
    <div css={cssObj.wrapper}>
      <section>
        <Logo />
        <h1>Sign In</h1>
        <p>Use your email and password to sign in</p>

        <form onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="email address"
            {...register("email", {
              required: "please enter your email address",
            })}
            required={true}
          />
          <input
            type="password"
            placeholder="password"
            {...register("password", {
              required: "please enter your password",
            })}
          />
          <button type="submit">Sign In</button>
        </form>

        <div>
          <Link href={ROUTER.SIGN_UP}>Sign Up</Link>
        </div>
      </section>
    </div>
  );
}
