"use client";

import { UserType } from "@/service/User/UsersType";
import { Base64Pic } from "../Base64Pic";
import { useCallback, useEffect, useState } from "react";
import { GetUserPic } from "@/service/User/UserPic";
import { auth } from "@/service/auth";
import { useUser } from "@/store";
import { UserDelete } from "@/service/User/UserDelete";
import { FetchUsers } from "@/utils/FetchUsers";

type OneUserProps = {
  user: UserType;
  limit: number;
  page: number;
  search: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<number>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
  admin: string | null;
};

const OneUser = ({
  user,
  limit,
  page,
  search,
  setError,
  setStatus,
  setText,
  setTotal,
  setUsers,
  admin,
}: OneUserProps) => {
  const {
    id,
    username,
    first_name,
    last_name,
    password,
    likes,
    dislikes,
    com_dislikes,
    com_likes,
    image_data,
  } = user;

  const { setAuth, setUsername } = useUser();

  const base64Images = image_data?.map(
    (data: string) => `data:image/png;base64, ${data}`
  );

  const interlayerHandleDeleteOneUser = async () => {
    if (confirm("Are you sure you want to delete this user?")) {
      user && (await UserDelete({ username: user.username as string }));
      if (user.username == admin) {
        setAuth(false), setUsername(null);
        localStorage.removeItem("user");
      }
      FetchUsers({
        limit,
        page,
        search,
        setError,
        setStatus,
        setText,
        setTotal,
        setUsers,
      });
    }
  };
  return (
    <div className="users-list">
      <Base64Pic base64Images={base64Images as []} blocked />
      <div className="user" key={id}>
        <div>id:{id}</div>
        <div>username: {username}</div>
        <div>first_name: {first_name}</div>
        <div>last_name: {last_name}</div>
        <div>password: {password}</div>
        <div>likes: {likes.length ? likes : 0}</div>
        <div>dislikes: {dislikes.length ? dislikes : 0}</div>
        <div>com_dislikes: {com_dislikes.length ? com_dislikes : 0}</div>
        <div>com_likes: {com_likes.length ? com_likes : 0}</div>
      </div>
      <button onClick={interlayerHandleDeleteOneUser} className="out">
        DELETE
      </button>
    </div>
  );
};

export { OneUser };
