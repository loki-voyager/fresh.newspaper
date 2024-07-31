export type CreateUserProps = {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  pic?: string[];
};

const UserCreate = async ({
  username,
  password,
  first_name,
  last_name,
  email,
  pic,
}: CreateUserProps) => {
  if (pic == undefined) {
    pic = [];
  }

  const res = await fetch(`http://localhost:3000/api/UserCreate`, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      first_name,
      last_name,
      email,
      pic,
    }),
  });

  if (!res.ok) {
    if (res.status === 500) {
      throw new Error(
        `${await res.json().then((r_error) => {
          return r_error.error;
        })}`
      );
    } else {
      throw new Error(`Failed to create new user: ${res.status}`);
    }
  }
  return res.json();
};

export { UserCreate };
