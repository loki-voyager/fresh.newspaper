type NewsEditProps = {
  id: number;
  title: string;
  body: string;
  image_data?: string[];
};

export const NewsEdit = async ({
  id,
  title,
  body,
  image_data,
}: NewsEditProps) => {
    
  image_data = image_data || [];

  const res = await fetch(`http://localhost:3000/api/OneNewsEdit`, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      title,
      body,
      image_data,
    }),
  });
  if (!res.ok) {
    if (res.status === 500) {
      return false;
    } else {
      throw new Error(`Failed to edit news. Error code: ${res.status}`);
    }
  }
  return (await res.json()).edit_news;
};
