type UserEditProps = {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  old_username: string;
  pic?: string[];
};

export const UserEdit = async ({
  username,
  password,
  first_name,
  last_name,
  email,
  old_username,
  pic,
}: UserEditProps) => {
  if (pic == undefined) {
    pic = [];
  }
  const res = await fetch(`http://localhost:3000/api/UserEdit`, {
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
      old_username,
    }),
  });

  if (!res.ok) {
    if (res.status === 500) {
      return false;
    } else {
      throw new Error(`Failed to edit user. Error code: ${res.status}`);
    }
  }
  return await res.json();
};
