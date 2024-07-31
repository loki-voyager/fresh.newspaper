import { FormEvent, FormEventHandler } from "react";
import { UserAuth } from "@/service/User/UserAuth";

type handleSubmitProps = {
  event: FormEvent<HTMLFormElement>;
  setAuth(Auth: boolean): void;
  setUsername(username: string | null): void;
  setFirstName(first_name: string | null): void;
  setLastName(last_name: string | null): void;
  setEmail(email: string | null): void;
  setRole: (role: string | null) => void;
};

async function handleSubmit({
  event,
  setAuth,
  setUsername,
  setFirstName,
  setLastName,
  setEmail,
  setRole
}: handleSubmitProps) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const data = formData.get("data");
  const password = formData.get("password");
  try {
    const res = await UserAuth({
      data: data as string,
      password: password as string,
    });
    if (res) {
      setAuth(true);
      setUsername(res.username);
      setFirstName(res.first_nsame);
      setLastName(res.last_name);
      setEmail(res.email);
      setRole(res.role)
      const userStr = JSON.stringify({
        username: res.username,
        first_name: res.first_name,
        last_name: res.last_name,
        email: res.email,
        role: res.role
      });
      localStorage.setItem("user", userStr);
      window.location.href = "/";
    }
  } catch (error:any) {
    console.log(error.message);
    alert(
      "There was an error signing in. Please check your username/email and password."
    );
  }
}

export { handleSubmit };
