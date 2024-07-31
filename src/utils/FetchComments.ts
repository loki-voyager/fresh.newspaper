import { GetComments } from "@/service/Comments/GetComments";
import { SetStateAction } from "react";
import {
  CommentsType,
  GetCommentsProps,
  GetCommentsResProps,
} from "@/service/Comments/CommentsType";

type FetchComments = GetCommentsProps & {
  setCom?: (value: SetStateAction<CommentsType[]>) => void;
  setTotal?: (value: React.SetStateAction<number>) => void;
  setStatus?: React.Dispatch<React.SetStateAction<number>>;
  setText?: React.Dispatch<React.SetStateAction<string>>;
  setError?: React.Dispatch<React.SetStateAction<string>>;
};

async function FetchComments({
  id,
  page,
  limit,
  search,
  username,
  setCom,
  setTotal,
  setStatus,
  setText,
  setError,
}: FetchComments) {
  try {
    await GetComments({
      id,
      page,
      limit,
      search,
      username,
    }).then(({ comment, count, pages, status }: GetCommentsResProps) => {
      if (status == 500) {
        setStatus && setStatus(status);
        search
          ? setText &&
            setText(
              "We did not find any comments items matching your request. :C"
            )
          : setText && setText("Its news don't have any commets yet :C");
      } else {
        setStatus && setStatus(200);
      }
      setCom && setCom(comment);
      setTotal && setTotal(pages);
    });
  } catch (error: any) {
    setError && setError(error.message);
  }
}

export { FetchComments };
