import { handleRead } from "@/utils/NotiReadHandle";
import { SetStateAction } from "react";
import { NotiType } from "@/service/Noti/NotiType";
import { NotiRead } from "@/service/Noti/NotiRead";
import { FetchNoti } from "@/utils/FetchNoti";
import { NotiDelete } from "@/service/Noti/NotiDelete";

type OneNotiProps = {
  notiOne: NotiType;
  page: number | undefined;
  search: string | undefined;
  limit: number | undefined;
  setNoti: ((value: SetStateAction<NotiType[]>) => void) | undefined;
  setTotal: ((value: SetStateAction<number>) => void) | undefined;
  username: string;
  setStatus?: React.Dispatch<React.SetStateAction<number>>;
  setText?: React.Dispatch<React.SetStateAction<string>>;
  setError?: React.Dispatch<React.SetStateAction<string>>;
};

const OneNoti = ({
  notiOne,
  search,
  page,
  setNoti,
  setTotal,
  limit,
  username,
  setStatus,
  setText,
  setError,
}: OneNotiProps) => {
  const {
    id,
    body,
    com_body,
    generation,
    is_read,
    mention,
    news_id,
    username: notiUsername,
  } = notiOne;

  const UnRead = ({ id, username }: { id: number; username: string }) => {
    NotiRead({
      id,
      username,
    }).then(() => {
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
    });
  };

  const Delete = ({ id, username }: { id: number; username: string }) => {
    NotiDelete({ id, username }).then(() => {
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
    });
  };

  return (
    <>
      <div className="noti" key={id}>
        <button
          className={"button news noti" + (is_read ? " readed" : "")}
          onClick={(e) => {
            handleRead({
              page,
              search,
              setNoti,
              limit,
              username,
              news_id,
              is_read,
              e,
              id,
              setTotal,
            });
          }}
        >
          <div className="author">
            {generation} {mention && <span className="mention">{mention}</span>}
          </div>
          <div>{body}</div>
          {com_body && (
            <div className="com_body">
              {com_body.length > 100
                ? `${com_body.slice(0, 200)}...`
                : com_body}
            </div>
          )}
        </button>
        <button
          className={is_read ? "in" : "inout"}
          onClick={() => UnRead({ id, username })}
        >
          {is_read ? "unRead" : "Read"}
        </button>
        <button className="out" onClick={() => Delete({ id, username })}>
          Delete
        </button>
      </div>
    </>
  );
};

export { OneNoti };
