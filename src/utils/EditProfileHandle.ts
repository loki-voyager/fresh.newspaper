import { ChangeEvent, FormEvent, SetStateAction } from "react";
import { UserCheck } from "@/service/User/UserCheck";
import { convertFilesToBase64Array } from "@/utils/ToBase64";
import { UserEdit } from "@/service/User/UserEdit";
import { UserAuth } from "@/service/User/UserAuth";
import { UserType } from "@/service/User/UsersType";
import { auth } from "@/service/auth";

type handleSubmitProps = {
  event: FormEvent<HTMLFormElement>;
  user: UserType;
  newBase64Images: string[] | null;
  files: FileList | null | undefined;
  pic?: string[];
  setAuth: (Auth: boolean) => void;
  setUsername: (username: string | null) => void;
  setFirstName: (first_name: string | null) => void;
  setLastName: (last_name: string | null) => void;
  setRole: (role: string | null) => void;
  setEmail: (email: string | null) => void;
  role: string | null;
};

async function handleSubmit({
  event,
  user,
  newBase64Images,
  files,
  pic,
  setAuth,
  setUsername,
  setFirstName,
  setLastName,
  setRole,
  setEmail,
  role
}: handleSubmitProps): Promise<void> {
  event.preventDefault();
  let base64Array: string[] = [];
  const formData = new FormData(event.currentTarget);
  const username = (formData.get("username") as string) || user.username;
  const old_password = formData.get("old_password") as string;
  const new_password = (formData.get("new_password") as string) || old_password;
  const first_name = (formData.get("first_name") as string) || user.first_name;
  const last_name = (formData.get("last_name") as string) || user.last_name;
  const email = (formData.get("email") as string) || user.email;

  const check = await UserCheck({
    data: user.username,
    password: old_password,
  });

  if (!check.exists) {
    alert("Incorrect old password");
    return;
  }

  if (files && files.length > 0) {
    base64Array = await convertFilesToBase64Array(files);
  }

  if (newBase64Images) {
    newBase64Images.map((data) => {
      base64Array.push(data);
    });
  } else if (pic) {
    pic.map((data) => {
      base64Array.push(data);
    });
  }

  try {
    const res = await UserEdit({
      username,
      password: new_password,
      first_name,
      last_name,
      email,
      old_username: user.username,
      pic: base64Array,
    });

    if (res) {
      const userFetch = await UserAuth({
        data: username,
        password: new_password,
      });
      if (userFetch) {
        const userStr = JSON.stringify({
          username: userFetch.username,
          first_name: userFetch.first_name,
          last_name: userFetch.last_name,
          email: userFetch.email,
          role: role,
        });

        localStorage.setItem("user", userStr);
        setAuth(true);
        setUsername(username);
        setFirstName(first_name);
        setLastName(last_name);
        setEmail(email);
        setRole(role);
        window.location.reload();
      }
    }
  } catch (error: any) {
    console.log({ error });
    alert("UserType with this data(username/email) already exist");
  }
}

type handleFileChangeProps = {
  event: ChangeEvent<HTMLInputElement>;
  setFiles: (value: SetStateAction<FileList | null | undefined>) => void;
};

async function handleFileChange({
  event,
  setFiles,
}: handleFileChangeProps): Promise<void> {
  const selectedFiles = event.target.files;
  if (selectedFiles) {
    setFiles(selectedFiles);
  }
}

export { handleSubmit, handleFileChange };
