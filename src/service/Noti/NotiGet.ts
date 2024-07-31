import { GetNotiProps, GetNotiRes } from "@/service/Noti/NotiType";
import moment from "moment";

const NotiGet = async ({ username, limit, page, search }: GetNotiProps) => {
  const res = await fetch(`http://localhost:3000/api/NotiGet`, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, limit, page, search }),
  });

  if (!res.ok) {
    throw new Error(
      `Failed to get notifications. Error code: ${res.status}, Message: ${res.statusText}`
    );
  }

  const { noti, count, pages }: GetNotiRes = await res.json();

  if (count == 0) {
    return {
      noti: [],
      count: 0,
      pages: 0,
      status: 500,
    } as GetNotiRes;
  }

  noti.forEach((item: { generation: any }) => {
    item.generation = moment(item.generation).format("DD-MM-YYYY HH:mm:ss");
  });

  return { noti, count, pages } as GetNotiRes;
};

export { NotiGet };
