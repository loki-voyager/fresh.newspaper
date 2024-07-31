"use client";
import { useUser } from "@/store";
import { ChangeEvent, FormEvent, useState } from "react";
import { handleSubmit } from "@/utils/SignUpHandle";
import { handleFileChange } from "@/utils/EditProfileHandle";

export default function SignUn() {
  const { setAuth, setUsername, setFirstName, setLastName, setEmail, setRole } =
    useUser();

  const [files, setFiles] = useState<FileList | null>();

  const interlayerHandlesubmit = (event: FormEvent<HTMLFormElement>) => {
    handleSubmit({
      event,
      setEmail,
      setFirstName,
      setLastName,
      files,
      setAuth,
      setUsername,
      setRole,
    });
  };

  const interlayerHandleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFileChange({
      event,
      setFiles,
    });
  };

  return (
    <>
      <div className="wrapper">
        <div className="sign">
          <div className="block">
            <form
              className="form"
              onSubmit={interlayerHandlesubmit}
              id="signupForm"
            >
              <input
                type="text"
                name="username"
                placeholder="username"
                id="username"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="password"
                id="password"
                required
              />
              <input
                type="text"
                name="first_name"
                placeholder="first name"
                id="first_name"
                required
              />
              <input
                type="text"
                name="last_name"
                placeholder="last name"
                id="last_name"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="email"
                id="email"
                required
              />
              <label className="input_file">
                <input
                  type="file"
                  name="pic"
                  accept="image/*"
                  onChange={interlayerHandleFileChange}
                />
                <span className="button in">Choose File</span>
              </label>
              <button type="submit" className="in">
                Sign Up
              </button>
            </form>
          </div>
        </div>
        {files && (
          <div>
            <div className="pic-col">
              <h3>Image previews:</h3>
              {Array.from(files).map((file, index) => (
                <div key={index}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                    style={{ maxWidth: "100%" }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
