import moment from "moment";
import {
  CommentsType,
  GetCommentsProps,
  GetCommentsResProps,
} from "@/service/Comments/CommentsType";

const GetComments = async ({
  id,
  username,
  page,
  limit,
  search,
}: GetCommentsProps) => {
  // console.log({ id, username, page, limit, search });
  const res = await fetch(`http://localhost:3000/api/CommentsGet`, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, username, page, limit, search }),
  });

  if (!res.ok) {
    throw new Error(`Failed to get comments for news #${id}. Error code: ${res.status} Message: ${res.statusText}`);
  }

  const { comment, count, pages }: GetCommentsResProps = await res.json();

  if (count == 0) {
    return {
      comment: [],
      count: 0,
      pages: 0,
      status: 500,
    } as GetCommentsResProps;
  }

  comment.forEach((item: { generation: any }) => {
    item.generation = moment(item.generation).format("DD-MM-YYYY HH:mm:ss");
  });

  return { comment, count, pages } as GetCommentsResProps;
};

export { GetComments };
