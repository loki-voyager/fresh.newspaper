import { UserType } from "@/service/User/UsersType";
import { useUser } from "@/store";
import { useEffect, useState } from "react";

const getUserFromLocalStorage = () => {
  const userString = localStorage.getItem("user");
  if (userString) {
    return JSON.parse(userString) as UserType;
  }
  return null;
};

const auth = () => {
  const {
    Auth,
    setAuth,
    setUsername,
    setFirstName,
    setLastName,
    setEmail,
    setRole,
  } = useUser();

  const [user, setUser] = useState<UserType>({} as UserType);

  useEffect(() => {
    let localStorageUser;
    const buff = localStorage.getItem("user");
    if (buff) {
      localStorageUser = JSON.parse(buff);
    }

    if (localStorageUser) {
      if (!Auth) {
        setAuth(true);
        setUsername(localStorageUser.username);
        setFirstName(localStorageUser.first_name);
        setLastName(localStorageUser.last_name);
        setEmail(localStorageUser.email);
        setRole(localStorageUser.role);
      }
      setUser(localStorageUser);
    }
  }, [Auth, setAuth, setEmail, setFirstName, setLastName, setUsername]);
  return { Auth, user, username: user.username, role: user.role };
};

export { getUserFromLocalStorage, auth };
