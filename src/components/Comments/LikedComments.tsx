"use client";

import Link from "next/link";
import { OneComments } from "@/components/Comments/NewsOneComments";
import { CommentsType } from "@/service/Comments/CommentsType";
import { Search } from "@/components/Search";
import { auth } from "@/service/auth";
import React, { useEffect, useState } from "react";
import { FetchLikedComments } from "@/utils/FetchLikedComments";
import { Pagination } from "@/components/Pagination";
import { Data } from "../Data";

const LikedCom = () => {
  const { username } = auth();
  const [com, setCom] = useState<CommentsType[]>([]);
  const [limit, setLimit] = useState(20);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(200);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    username &&
      FetchLikedComments({
        username,
        limit,
        page,
        search,
        setCom,
        setTotal,
        setStatus,
        setText,
        setError,
      });
  }, [username]);

  const handleSearch = async () => {
    username &&
      FetchLikedComments({
        username,
        limit,
        page,
        search,
        setCom,
        setTotal,
        setStatus,
        setText,
        setError,
      });
  };

  const handleClear = () => {
    setSearch("");
    username &&
      FetchLikedComments({
        username,
        limit,
        page,
        setCom,
        setTotal,
        setStatus,
        setText,
        setError,
      });
  };

  const LimitChange = async ({ limit }: { limit: number }) => {
    username &&
      FetchLikedComments({
        username,
        limit,
        page: 1,
        search,
        setCom,
        setTotal,
        setStatus,
        setText,
        setError,
      });
  };

  const PageChange = async ({ page }: { page: number }) => {
    username &&
      FetchLikedComments({
        username,
        limit,
        page,
        search,
        setCom,
        setTotal,
        setStatus,
        setText,
        setError,
      });
  };

  const block =(
      <>
        {com.length && username ? (
          <>
            <Pagination
              total={total}
              page={page}
              limit={limit}
              setPage={setPage}
              setLimit={setLimit}
              limit_change={LimitChange}
              page_change={PageChange}
            />
            <ul className="news-list">
              {com.map((com: CommentsType) => (
                <Link
                  key={com.id}
                  className="line com"
                  href={`/news/${com.news_id}`}
                >
                  <OneComments com={com} username={username} />
                </Link>
              ))}
            </ul>
            <Pagination
              total={total}
              page={page}
              limit={limit}
              setPage={setPage}
              setLimit={setLimit}
              limit_change={LimitChange}
              page_change={PageChange}
            />
          </>
        ) : (
          <h2>{"{Loading...}"}</h2>
        )}
      </>
    );

  return (
    <>
      <div className="line">
        {" "}
        <h1>
          {"{"}Liked comments{"}"}
        </h1>
      </div>
      {error ? (
        <>
          <Data error={error} status={status} text={text} block={block} />
        </>
      ) : (
        <>
          <Search
            search={search}
            setSearch={setSearch}
            clear={handleClear}
            searching={handleSearch}
          />
          <Data error={error} status={status} text={text} block={block} />
        </>
      )}
    </>
  );
};

export { LikedCom };
