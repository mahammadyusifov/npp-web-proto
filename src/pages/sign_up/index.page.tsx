import Link from "next/link";
import { useForm } from "react-hook-form";
import Logo from "@/assets/logo_2xl.svg";
import { cssObj } from "./style";
import { ROUTER } from "@/constants/ROUTER";
import { useRouter } from "next/router";
import { API_URL } from "@/constants/API_URL";

type FormValues = {
  email: string;
  password: string;
};

export default function SignUp() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => {
    fetch(API_URL.AUTH.REGISTER, {
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
        console.log("signup success");
        router.push(ROUTER.SIGN_IN);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  });

  return (
    <div css={cssObj.wrapper}>
      <section>
        <Logo />
        <h1>Sign Up</h1>
        <p>Create an account with your email and password</p>

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
          <button type="submit">Sign Up</button>
        </form>

        <div>
          <Link href={ROUTER.SIGN_IN}>Sign In</Link>
        </div>
      </section>
    </div>
  );
}
