"use client";
import { useUser } from "@/store";
import { FormEvent } from "react";
import { handleSubmit } from "@/utils/SignInHandle";

export default function SignIn() {
  const { setAuth, setUsername, setFirstName, setLastName, setEmail,setRole} =
    useUser();

  const interlayerHandlesubmit = (event: FormEvent<HTMLFormElement>) => {
    handleSubmit({
      event,
      setAuth,
      setUsername,
      setFirstName,
      setLastName,
      setEmail,
      setRole
    });
  };

  return (
    <>
      <div className="wrapper">
        <div className="sign">
          <div className="block">
            <form onSubmit={interlayerHandlesubmit} id="signinForm">
              <input
                type="data"
                name="data"
                placeholder="username"
                id="data"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="password"
                id="password"
                required
              />
              <button type="submit" className="in" id="singinSubmit">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
