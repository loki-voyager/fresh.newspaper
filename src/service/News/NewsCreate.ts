type CreateNewsProps = {
  title: string;
  body: string;
  username: string;
  image_data?: string[];
};

const CreateNews = async ({
  title,
  body,
  username,
  image_data,
}: CreateNewsProps) => {

  image_data = image_data || [];

  const res = await fetch(`http://localhost:3000/api/NewsCreate`, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      body,
      username,
      image_data,
    }),
  });
  if (!res.ok) {
    console.log(res);
    if (res.status === 500) {
      throw new Error(
        `${await res.json().then((r_error) => {
          return r_error.error;
        })}`
      );
    } else {
      throw new Error(
        `Error during create news request. Error code: ${res.status}`
      );
    }
  }
  const data = await res.json();
  return data.new_news;
};
export { CreateNews };
