import { SetStateAction } from "react";
import {
  CommentsType,
  GetCommentsResProps,
  RatedCommentsProps,
} from "@/service/Comments/CommentsType";
import { DislikedCommentsGet } from "@/service/Comments/DislikedCommentsGet";

type FetchDislikedCommentsProps = RatedCommentsProps & {
  setCom?: (value: SetStateAction<CommentsType[]>) => void;
  setCount?: (value: SetStateAction<number>) => void;
  setTotal?: (value: SetStateAction<number>) => void;
  setStatus?: React.Dispatch<React.SetStateAction<number>>;
  setText?: React.Dispatch<React.SetStateAction<string>>;
  setError?: React.Dispatch<React.SetStateAction<string>>;
};

async function FetchDislikedComments({
  username,
  limit,
  page,
  search,
  setCom,
  setCount,
  setTotal,
  setStatus,
  setText,
  setError,
}: FetchDislikedCommentsProps) {
  await DislikedCommentsGet({
    username,
    limit,
    page,
    search,
  }).then(({ comment, pages, count, status }: GetCommentsResProps) => {
    try {
      if (status == 500) {
        setStatus && setStatus(status);
        search
          ? setText &&
            setText(
              "We did not find any disliked comments items matching your request. :C"
            )
          : setText && setText("U don't have any disliked comments yet :C");
      } else {
        setStatus && setStatus(200);
      }
      setCom && setCom(comment);
      setCount && setCount(count);
      setTotal && setTotal(pages);
    } catch (error: any) {
      setError && setError(error.message);
    }
  });
}

export { FetchDislikedComments };
