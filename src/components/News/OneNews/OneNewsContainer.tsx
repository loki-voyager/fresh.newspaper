"use client";

import { NewsType } from "@/service/News/NewsType";
import React, { useState } from "react";
import { auth } from "@/service/auth";
import { OneNews } from "@/components/News/OneNews/OneNews";
import { EditNews } from "@/components/News/OneNews/EditNews";

type OneNewsProps = {
  news: NewsType;
};

const OneNewsContainer = ({ news }: OneNewsProps) => {
  const [edit, setEdit] = useState(false);

  const { username, role } = auth();

  return (
    <>
      {edit ? (
        <EditNews
          news={news}
          username={username}
          role={role}
          setEdit={setEdit}
        />
      ) : (
        <OneNews
          news={news}
          username={username}
          role={role}
          edit={edit}
          setEdit={setEdit}
        />
      )}
    </>
  );
};

export { OneNewsContainer };
