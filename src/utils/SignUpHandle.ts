import { FormEvent, FormEventHandler } from "react";
import { convertFilesToBase64Array } from "@/utils/ToBase64";
import { UserCreate } from "@/service/User/UserCreate";
import { UserAuth } from "@/service/User/UserAuth";

type handleSubmitProps = {
  event: FormEvent<HTMLFormElement>;
  setAuth(Auth: boolean): void;
  setUsername(username: string | null): void;
  setFirstName(first_name: string | null): void;
  setLastName(last_name: string | null): void;
  setEmail(email: string | null): void;
  setRole: (role: string | null) => void;
  files: FileList | null | undefined;
};

async function handleSubmit({
  event,
  setAuth,
  setUsername,
  setFirstName,
  setLastName,
  setEmail,
  setRole,
  files,
}: handleSubmitProps) {
  event.preventDefault();
  let base64Array: string[] = [];
  const formData = new FormData(event.currentTarget);
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;
  const email = formData.get("email") as string;

  if (files && files.length > 0) {
    base64Array = await convertFilesToBase64Array(files);
  }

  try {
    let res;
    if (base64Array.length > 0) {
      res = await UserCreate({
        username,
        password,
        first_name,
        last_name,
        email,
        pic: base64Array,
      });
    } else {
      res = await UserCreate({
        username,
        password,
        first_name,
        last_name,
        email,
      });
    }
    if (res) {
      const user = await UserAuth({ data: username, password });
      if (user) {
        const userStr = JSON.stringify({
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role: user.role,
        });

        localStorage.setItem("user", userStr);
        setAuth(true);
        setUsername(username);
        setFirstName(first_name);
        setLastName(last_name);
        setEmail(email);
        setRole(user.role);
        window.location.href = "/";
      }
    }
  } catch (error) {
    console.log({ error });
    alert("User with this data(username/email) already exist");
  }
}

export { handleSubmit };
