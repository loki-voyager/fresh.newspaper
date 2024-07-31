import { GetUserProps, GetUserResProps } from "./UsersType";

const GetUsers = async ({ page, limit, search }: GetUserProps) => {
  const res = await fetch(`http://localhost:3000/api/UserGet`, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ page, limit, username:search }),
  });

  if (!res.ok) {
    throw new Error(
      `Failed to get users. Error code: ${res.status}, Message: ${res.statusText}`
    );
  }

  const { users, count, pages }: GetUserResProps = await res.json();

  if (count == 0) {
    return { users: [], count: 0, pages: 0, status: 500 } as GetUserResProps;
  }

  return { users, count, pages } as GetUserResProps;
};
export { GetUsers };
