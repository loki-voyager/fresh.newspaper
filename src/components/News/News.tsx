"use client";

import { auth } from "@/service/auth";
import React, { useEffect, useState } from "react";
import { NewsType } from "@/service/News/NewsType";
import Link from "next/link";
import { NewsMap } from "@/components/News/NewsMap";
import { FetchNews } from "@/utils/FetchNews";
import { Search } from "@/components/Search";
import { Pagination } from "@/components/Pagination";
import { Data } from "../Data";

const NewsList = () => {
  const { username } = auth();
  const [news, setNews] = useState<NewsType[]>([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(200);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    FetchNews({ limit, page, setNews, setTotal, setStatus, setText, setError });
  }, []);

  const handleSearch = () => {
    FetchNews({
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
    FetchNews({ limit, page, setNews, setTotal, setStatus, setText, setError });
  };

  const LimitChange = async ({ limit }: { limit: number }) => {
    FetchNews({
      limit,
      page: 1,
      search,
      setNews,
      setTotal,
      setStatus,
      setText,
      setError,
    });
  };

  const PageChange = async ({ page }: { page: number }) => {
    FetchNews({
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

  const block = (
    <>
      {news.length > 0 ? (
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
          <ul className="news-list" id="news-list">
            {news.map((onenews) => (
              <div key={onenews.id}>
                <NewsMap news={onenews} username={username} />
              </div>
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
          {"{"}News{"}"}
        </h1>
        {username && (
          <Link className="button in" id="create_news" href={`/news/new`}>
            Create
          </Link>
        )}
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

export { NewsList };
