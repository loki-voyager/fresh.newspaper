import { GetUsers } from "@/service/User/UserGet";
import {
  GetUserProps,
  GetUserResProps,
  UserType,
} from "@/service/User/UsersType";

type FetchUsersProps = GetUserProps & {
  setUsers?: (value: React.SetStateAction<UserType[]>) => void | null;
  setTotal?: (value: React.SetStateAction<number>) => void | null;
  setStatus?: React.Dispatch<React.SetStateAction<number>>;
  setText?: React.Dispatch<React.SetStateAction<string>>;
  setError?: React.Dispatch<React.SetStateAction<string>>;
};

async function FetchUsers({
  limit,
  page,
  search,
  setError,
  setUsers,
  setStatus,
  setText,
  setTotal,
}: FetchUsersProps) {
  try {
    await GetUsers({ limit, page, search }).then(
      ({ count, pages, users, status }: GetUserResProps) => {
        if (status == 500) {
          setStatus && setStatus(status);
          search
            ? setText &&
              setText(
                "We did not find any user items matching your request. :C"
              )
            : setText && setText("We don't have any users yet :C");
        } else {
          setStatus && setStatus(200);
        }
        setUsers && setUsers(users);
        setTotal && setTotal(pages);
      }
    );
  } catch (error: any) {
    setError && setError(error.message);
  }
}

export { FetchUsers };
