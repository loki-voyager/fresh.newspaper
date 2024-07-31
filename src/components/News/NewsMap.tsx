"use client";

import React from "react";
import Link from "next/link";
import { Base64Pic } from "@/components/Base64Pic";
import { Grades } from "@/components/Grades/Grades";
import { NewsType } from "@/service/News/NewsType";

type NewsMapProps = {
  news: NewsType;
  username: string;
};

const NewsMap = ({ news, username }: NewsMapProps) => {
  const {
    id,
    title,
    body,
    generation,
    username: authorUsername,
    image_data,
  } = news;

  const base64Images =
    image_data?.[0]?.length > 0
      ? [`data:image/png;base64, ${image_data[0]}`]
      : [];

  return (
    <div className="button news">
      <Link href={`/news/${id}`} key={id}>
        <div className="author">
          <span className={username === authorUsername ? "owner" : ""}>
            {authorUsername}
          </span>{" "}
          {generation}
        </div>
        {base64Images.length > 0 && <Base64Pic base64Images={base64Images} blocked/>}
        <div>{title}</div>
        <div>{body.length > 100 ? `${body.substring(0, 400)}...` : body}</div>
      </Link>
      <Grades id={id} username={username || null} />
    </div>
  );
};

export { NewsMap };
