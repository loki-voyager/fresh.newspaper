import { FormEvent } from "react";
import { convertFilesToBase64Array } from "@/utils/ToBase64";
import { NewsEdit } from "@/service/News/OneNews/OneNewsEdit";

type handleSubmitProps = {
  event: FormEvent<HTMLFormElement>;
  newBase64Images: string[] | null;
  files: FileList | null | undefined;
  image_data: string[];
  owner: string;
  id: number;
};

async function handleSubmit({
  event,
  newBase64Images,
  files,
  image_data,
  owner,
  id,
}: handleSubmitProps): Promise<void> {
  event.preventDefault();
  let base64Array: string[] = [];
  const formData = new FormData(event.currentTarget);
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;

  if (files && files.length > 0) {
    base64Array = await convertFilesToBase64Array(files);
  }
  if (newBase64Images) {
    newBase64Images.map((data) => {
      base64Array.push(data);
    });
  } else if (image_data) {
    image_data.map((data) => {
      base64Array.push(data);
    });
  }
  try {
    const res = await NewsEdit({
      id,
      title,
      body,
      image_data: base64Array,
    });
    if (res) {
      window.location.reload();
    }
  } catch (error: any) {
    console.log({ error });
    alert("Error by creating news");
  }
}

export { handleSubmit };
