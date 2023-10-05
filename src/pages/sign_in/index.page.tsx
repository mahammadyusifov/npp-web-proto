// src/pages/sign_in/index.page.tsx

import Link from "next/link";
import { useForm } from "react-hook-form";
import Logo from "@/assets/logo_2xl.svg";
import { usePostLogin } from "@/apis/auth/usePostLogin";
import { useRouter } from "next/router";
import { cssObj } from "./style";
import { ROUTER } from "@/constants/ROUTER";

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
    // loginMutate(data, {
    //   onSuccess: (data) => {
    //     router.push("/");
    //   },
    //   onError: (error) => {},
    // });
    console.log(JSON.stringify(data));
    fetch("http://0.0.0.0:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
        // router.push("/");
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
            placeholder="이메일주소"
            {...register("email", {
              required: "이메일을 입력해주세요.",
            })}
            required={true}
          />
          <input
            type="password"
            placeholder="비밀번호"
            {...register("password", {
              required: "비밀번호를 입력해주세요.",
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
