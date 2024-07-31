import { CommentsType } from "@/service/Comments/CommentsType";
import { FormEventHandler, useEffect, useState } from "react";
import { FetchComments } from "@/utils/FetchComments";
import { OneComments } from "@/components/Comments/NewsOneComments";
import { DeleteComments } from "@/service/Comments/DeleteComments";
import { handleSubmit } from "@/utils/CreateCommentsHandle";
import { Search } from "@/components/Search";
import { Pagination } from "@/components/Pagination";

type NewsCommentsType = {
  id: number;
  username: string;
  role: string;
};

const NewsComments = ({ id, username, role }: NewsCommentsType) => {
  const [com, setCom] = useState<CommentsType[]>([]);
  const [data, setData] = useState("");
  const [mention, setMention] = useState("");
  const [create, setCreate] = useState(false);
  const [limit, setLimit] = useState(20);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(200);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    FetchComments({
      id,
      page,
      limit,
      setCom,
      setTotal,
      setStatus,
      setText,
      setError,
    });
  }, []);

  const interlayerHandleSubmits: FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();
    handleSubmit({
      event,
      data,
      mention,
      setData,
      username,
      setMention,
      setCom,
      id,
    }).then(() => {
      FetchComments({
        id,
        page,
        limit,
        search,
        setCom,
        setTotal,
        setStatus,
        setText,
        setError,
      });
    });
  };

  const handleDelete = async ({ ComId }: { ComId: number }) => {
    await DeleteComments({ id: ComId })
      .then((res) => {
        if (res == true)
          FetchComments({ id, setCom, setTotal, setStatus, setText });
      })
      .then(() => {
        FetchComments({
          id,
          page,
          limit,
          search,
          setCom,
          setTotal,
          setStatus,
          setText,
          setError,
        });
      });
  };

  const handleSearch = async () => {
    FetchComments({
      id,
      page,
      limit,
      search,
      setCom,
      setTotal,
      setStatus,
      setText,
      setError,
    });
  };

  const handleClear = async () => {
    setSearch("");
    FetchComments({
      id,
      page,
      limit,
      setCom,
      setTotal,
      setStatus,
      setText,
      setError,
    });
  };

  const LimitChange = async ({ limit }: { limit: number }) => {
    FetchComments({
      id,
      page: 1,
      limit,
      search,
      setCom,
      setTotal,
      setStatus,
      setText,
      setError,
    });
  };

  const PageChange = async ({ page }: { page: number }) => {
    FetchComments({
      id,
      page,
      limit,
      search,
      setCom,
      setTotal,
      setStatus,
      setText,
      setError,
    });
  };

  const DATA =
    error.length > 0 ? (
      <h2>{error}</h2>
    ) : status == 500 ? (
      <h2>{text}</h2>
    ) : (
      <>
        {com.length > 0 ? (
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
            {com.map((com: CommentsType) => (
              <div key={com.id} className="line com">
                <OneComments com={com} username={username} />
                {username == com.username ||
                  (role == "admin" && (
                    <button
                      onClick={() => {
                        handleDelete({ ComId: com.id });
                      }}
                      className="out"
                    >
                      Delete
                    </button>
                  ))}
              </div>
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
      <button
        className="in"
        id="comments-btn"
        onClick={() => {
          setCreate(!create);
        }}
      >
        {create ? "Cancel" : "Create comment"}
      </button>
      {create && (
        <div className="comments">
          <h2>
            {"{"}Create comments{"}"}
          </h2>
          <form
            className="com-form"
            id="create-comment"
            onSubmit={interlayerHandleSubmits}
          >
            <div className="flex">
              <input
                type="text"
                name="mention"
                placeholder="mention"
                id="mention"
                value={mention}
                onChange={(e) => {
                  setMention(e.target.value);
                }}
              />
            </div>
            <textarea
              typeof="text"
              name="body"
              placeholder="body"
              value={data}
              id="body"
              onChange={(e) => {
                setData(e.target.value);
              }}
              required
            />
            <button className="in" type="submit">
              Add comments
            </button>
          </form>
        </div>
      )}
      <div className="comments">
        <h2>
          {"{"}Comments{"}"}
        </h2>

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
      </div>
    </>
  );
};

export { NewsComments };
