import moment from "moment/moment";
import { GetNewsProps, GetNewsResProps } from "@/service/News/NewsType";

const GetNews = async ({ page, limit, search }: GetNewsProps) => {
  const res = await fetch(`http://localhost:3000/api/NewsGet`, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ page, limit, search }),
  });

  if (!res.ok) {
    throw new Error(
      `Failed to get news. Error code: ${res.status}, Message: ${res.statusText}`
    );
  }

  const { news, count, pages }: GetNewsResProps = await res.json();

  if (count == 0) {
    return { news: [], count: 0, pages: 0, status: 500 } as GetNewsResProps;
  }

  news.forEach((item: { generation: any }) => {
    item.generation = moment(item.generation).format("DD-MM-YYYY HH:mm:ss");
  });

  return { news, count, pages } as GetNewsResProps;
};

export { GetNews };
