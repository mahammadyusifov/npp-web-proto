import Link from "next/link";
import { useForm } from "react-hook-form";
import Logo from "@/assets/logo_2xl.svg";
import { cssObj } from "./style";
import { ROUTER } from "@/constants/ROUTER";

type FormValues = {
  email: string;
  password: string;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <div css={cssObj.wrapper}>
      <section>
        <Logo />
        <h1>Sign Up</h1>
        <p>Create an account with your email and password</p>

        <form onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="이메일주소"
            {...(register("email"),
            {
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
          <button type="submit">Sign Up</button>
        </form>

        <div>
          <Link href={ROUTER.SIGN_IN}>Sign In</Link>
        </div>
      </section>
    </div>
  );
}
