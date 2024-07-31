"use client";

import { auth } from "@/service/auth";
import React, { useEffect, useState } from "react";
import { NewsType } from "@/service/News/NewsType";
import { FetchDislikedNews } from "@/utils/FetchDislikedNews";
import { Search } from "@/components/Search";
import { Pagination } from "@/components/Pagination";
import Link from "next/link";
import { Data } from "../Data";

const DislikedNews = () => {
  const { username } = auth();
  const [news, setNews] = useState<NewsType[]>([]);
  const [limit, setLimit] = useState(20);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(200);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    username &&
      FetchDislikedNews({
        username,
        limit,
        page,
        setNews,
        setTotal,
        setStatus,
        setText,
        setError,
      });
  }, [username]);

  const handleSearch = () => {
    username &&
      FetchDislikedNews({
        username,
        limit,
        page,
        search,
        setNews,
        setTotal,
        setStatus,
        setText,
        setError,
      });
  };

  const handleClear = () => {
    setSearch("");
    username &&
      FetchDislikedNews({
        username,
        limit,
        page,
        setNews,
        setTotal,
        setStatus,
        setText,
        setError,
      });
  };

  const LimitChange = async ({ limit }: { limit: number }) => {
    username &&
      FetchDislikedNews({
        username,
        limit,
        page: 1,
        setNews,
        setTotal,
        setStatus,
        setText,
        setError,
      });
  };

  const PageChange = async ({ page }: { page: number }) => {
    username &&
      FetchDislikedNews({
        username,
        limit,
        page,
        setNews,
        setTotal,
        setStatus,
        setText,
        setError,
      });
  };

  const block =(
      <>
        {news.length ? (
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
              {news.map(
                ({ id, username: usernameM, generation, title }: NewsType) => (
                  <Link href={`/news/${id}`} className="button news" key={id}>
                    <div className="author">
                      <span className={username === usernameM ? "owner" : ""}>
                        {usernameM}
                      </span>{" "}
                      {generation}
                    </div>
                    <div>{title}</div>
                  </Link>
                )
              )}
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
        <h1>
          {"{"}Disliked news{"}"}
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

export { DislikedNews };
