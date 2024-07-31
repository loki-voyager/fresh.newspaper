import { NotiGet } from "@/service/Noti/NotiGet";
import { GetNotiProps, GetNotiRes, NotiType } from "@/service/Noti/NotiType";
import { SetStateAction } from "react";

type FetchNotiProps = GetNotiProps & {
  setNoti?: (value: SetStateAction<NotiType[]>) => void;
  setTotal?: (value: SetStateAction<number>) => void;
  setStatus?: React.Dispatch<React.SetStateAction<number>>;
  setText?: React.Dispatch<React.SetStateAction<string>>;
  setError?: React.Dispatch<React.SetStateAction<string>>;
};

async function FetchNoti({
  username,
  search,
  limit,
  page,
  setNoti,
  setTotal,
  setStatus,
  setText,
  setError,
}: FetchNotiProps) {
  await NotiGet({
    username,
    page,
    limit,
    search,
  }).then(({ noti, pages, count, status }: GetNotiRes) => {
    try {
      if (status == 500) {
        setStatus && setStatus(status);
        search
          ? setText &&
            setText(
              "We did not find any notifications items matching your request. :C"
            )
          : setText && setText("U don't have any notification yet :C");
      } else {
        setStatus && setStatus(200);
      }
      setNoti && setNoti(noti);
      setTotal && setTotal(pages);
    } catch (error: any) {
      setError && setError(error.message);
    }
  });
}

export { FetchNoti };

export type { FetchNotiProps };
