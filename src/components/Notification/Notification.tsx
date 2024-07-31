"use client";
import { auth } from "@/service/auth";
import { useEffect, useState } from "react";
import { NotiType } from "@/service/Noti/NotiType";
import { FetchNoti } from "@/utils/FetchNoti";
import { OneNoti } from "@/components/Comments/OneNoti";
import { Pagination } from "../Pagination";
import { Search } from "../Search";
import { Data } from "../Data";

const Noti = () => {
  const { username } = auth();

  const [noti, setNoti] = useState<NotiType[]>([]);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(200);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    username &&
      FetchNoti({
        page,
        search,
        limit,
        username,
        setNoti,
        setTotal,
        setStatus,
        setText,
        setError,
      });
  }, [username]);

  const handleSearch = async () => {
    username &&
      FetchNoti({
        page,
        search,
        limit,
        username,
        setNoti,
        setTotal,
        setStatus,
        setText,
        setError,
      });
  };

  const handleClear = () => {
    setSearch("");
    username &&
      FetchNoti({
        page,
        limit,
        username,
        setNoti,
        setTotal,
        setStatus,
        setText,
        setError,
      });
  };

  const LimitChange = async ({ limit }: { limit: number }) => {
    username &&
      FetchNoti({
        page: 1,
        search,
        limit,
        username,
        setNoti,
        setTotal,
        setStatus,
        setText,
        setError,
      });
  };

  const PageChange = async ({ page }: { page: number }) => {
    username &&
      FetchNoti({
        page,
        search,
        limit,
        username,
        setNoti,
        setTotal,
        setStatus,
        setText,
        setError,
      });
  };

  const block =(
      <>
        {noti.length && username ? (
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
            {noti.map((notiOne: NotiType) => (
              <OneNoti
                key={notiOne.id}
                notiOne={notiOne}
                limit={limit}
                page={page}
                search={search}
                setNoti={setNoti}
                username={username}
                setTotal={setTotal}
                setError={setError}
                setText={setText}
                setStatus={setStatus}
              />
            ))}
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
        <h1>{`{Noti ${username}}`}</h1>
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

export { Noti };
