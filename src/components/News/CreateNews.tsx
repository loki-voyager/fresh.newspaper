"use client";

import { useUser } from "@/store";
import { ChangeEvent, FormEvent, useState } from "react";
import { handleSubmit } from "@/utils/CreateNewsHandle";
import { handleFileChange } from "@/utils/EditProfileHandle";

const NewsCreate = () => {
  const { Auth, username } = useUser();
  if (!Auth) window.location.href = "/";

  const [files, setFiles] = useState<FileList | null>();

  const interlayerHandlesubmit = (event: FormEvent<HTMLFormElement>) => {
    handleSubmit({
      event,
      username,
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
      <form className="news-form" onSubmit={interlayerHandlesubmit}>
        <div className="flex">
          <input type="text" name="title" id="title" placeholder="title" />
        </div>
        <textarea typeof="text" name="body" id="body" placeholder="body" />
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
          Add news
        </button>
      </form>
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

export { NewsCreate };
