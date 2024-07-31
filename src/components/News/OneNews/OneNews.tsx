import { NewsType } from "@/service/News/NewsType";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GradesProps } from "@/service/Grades/GradesGet";
import { FetchGrades } from "@/utils/FetchGrades";
import Link from "next/link";
import { Base64Pic } from "@/components/Base64Pic";
import { HandleDeleteOneNews } from "@/utils/DeleteOneNewsHandle";
import { NewsComments } from "@/components/Comments/NewsComments";
import { Grades } from "@/components/Grades/Grades";

type OneNewsProps = {
  news: NewsType;
  username: string;
  role: string;
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
};

const OneNews = ({ news, username, role, edit, setEdit }: OneNewsProps) => {
  const { title, body, image_data, generation, username: owner, id } = news;

  const base64Images =
    image_data?.length > 0
      ? image_data.map((image) => `data:image/png;base64, ${image}`)
      : [];

  const paragraphs = body.split("\n").map((paragraph, index) => (
    <div key={index}>
      {paragraph}
      <br />
    </div>
  ));

  const interlayerHandleDeleteOneNews = () => {
    HandleDeleteOneNews({ id });
  };

  return (
    <>
      <div className="news-list">
        <div className="line">
          {" "}
          <h1>
            {"{"}
            {title}
            {"}"}
          </h1>
          {(owner == username || role == "admin") && (
            <div className="line">
              <button className="out" onClick={interlayerHandleDeleteOneNews}>
                Delete
              </button>
              <button
                className="in"
                onClick={() => {
                  setEdit(!edit);
                }}
              >
                Edit
              </button>
            </div>
          )}
        </div>
        <Base64Pic base64Images={base64Images} blocked/>
        <div className="author">
          {owner} {generation}
        </div>
        <div>{paragraphs}</div>
        <Grades
          id={id}
          // fetch_grades={fetch_grades}
          username={username || null}
        />
        <NewsComments id={id} username={username} role={role} />
      </div>
    </>
  );
};

export { OneNews };
