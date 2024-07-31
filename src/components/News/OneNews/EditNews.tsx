import { NewsType } from "@/service/News/NewsType";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { Base64Pic } from "@/components/Base64Pic";
import { handleFileChange } from "@/utils/EditProfileHandle";
import { handleSubmit } from "@/utils/EditNewsHandle";

type EditNewsProps = {
  news: NewsType;
  username: string;
  role: string;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditNews = ({ news, username, role, setEdit }: EditNewsProps) => {
  const { title, body, image_data, username: owner, id } = news;

  if (role == "admin") owner == news.username;

  const [editTitle, setEditTitle] = useState(title);
  const [editBody, setEditBody] = useState(body);
  const base64Images = image_data?.map(
    (data: string) => `data:image/png;base64, ${data}`
  );

  const [files, setFiles] = useState<FileList | null>();

  const [newBase64Images, setNewBase64Images] = useState<string[] | null>(null);

  const interlayerHandlesubmit = (event: FormEvent<HTMLFormElement>) => {
    handleSubmit({
      event,
      id,
      owner,
      image_data,
      newBase64Images,
      files,
    });
  };

  const interlayerHandleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFileChange({
      event,
      setFiles,
    });
  };

  return (
    <>
      <div className="line">
        {" "}
        <h1>
          {"{"}
          Edit News:
          {title}
          {"}"}
        </h1>
        <Link className="button" href={"/"}>
          Home
        </Link>
        <Link className="button" href={`/news?username=${username}`}>
          News
        </Link>
        {owner == username && (
          <div className="line">
            <button
              className="in"
              onClick={() => {
                setEdit(false);
              }}
            >
              Clear Edit
            </button>
          </div>
        )}
      </div>
      <form className="news-form" onSubmit={interlayerHandlesubmit}>
        <div className="flex">
          <input
            type="text"
            name="title"
            value={editTitle}
            onChange={(e) => {
              setEditTitle(e.target.value);
            }}
          />
        </div>
        <textarea
          typeof="text"
          name="body"
          value={editBody}
          onChange={(e) => {
            setEditBody(e.target.value);
          }}
        />
        <label className="input_file">
          <input
            type="file"
            name="pic"
            accept="image/*"
            onChange={interlayerHandleFileChange}
            multiple
          />
          <span className="button in">Choose File</span>
        </label>
        <button className="in" type="submit">
          Edit news
        </button>
      </form>

      {base64Images && base64Images.length > 0 && (
        <div>
          Old Pic:
          <Base64Pic
            base64Images={base64Images}
            setBase64Images={setNewBase64Images}
          />
        </div>
      )}
      {files && (
        <div>
          <div className="pic-col">
            <h3>Image previews:</h3>
            {Array.from(files).map((file, index) => (
              <div key={index}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index}`}
                  style={{ maxWidth: "100%" }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export { EditNews };
