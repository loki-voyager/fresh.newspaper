"use client";

import { UserType } from "@/service/User/UsersType";
import { FetchUsers } from "@/utils/FetchUsers";
import React, { useEffect, useState } from "react";
import { Pagination } from "../Pagination";
import { Search } from "../Search";
import { OneUser } from "./OneUser";
import { useUser } from "@/store";

const UsersList = () => {
  const { Auth, username, role } = useUser();
  if (!Auth || role != "admin") window.location.href = "/";

  const [users, setUsers] = useState<UserType[]>([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(200);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
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
  }, []);

  const handleSearch = () => {
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
  };

  const handleClear = () => {
    setSearch("");
    FetchUsers({
      limit,
      page,
      setError,
      setStatus,
      setText,
      setTotal,
      setUsers,
    });
  };

  const LimitChange = async ({ limit }: { limit: number }) => {
    FetchUsers({
      limit,
      page: 1,
      search,
      setError,
      setStatus,
      setText,
      setTotal,
      setUsers,
    });
  };

  const PageChange = async ({ page }: { page: number }) => {
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
  };

  const DATA =
    error.length > 0 ? (
      <h2>{error}</h2>
    ) : status == 500 ? (
      <h2>{text}</h2>
    ) : (
      <>
        {users.length ? (
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
            {users.map((user: UserType) => (
              <OneUser
                user={user}
                key={user.id}
                limit={limit}
                page={page}
                search={search}
                setError={setError}
                setStatus={setStatus}
                setText={setText}
                setTotal={setTotal}
                setUsers={setUsers}
                admin={username}
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
      <>
        <div className="line">
          <h1>{`{Users}`}</h1>
        </div>
        {error ? (
          <>{DATA}</>
        ) : (
          <>
            <Search
              search={search}
              setSearch={setSearch}
              clear={handleClear}
              searching={handleSearch}
            />
            {DATA}
          </>
        )}
      </>
    </>
  );
};

export { UsersList };
