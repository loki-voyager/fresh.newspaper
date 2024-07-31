"use client";

import { Dispatch, SetStateAction, useState } from "react";

type Base64PicProps = {
  base64Images: string[];
  setBase64Images?: Dispatch<SetStateAction<string[] | null>>;
  blocked?: boolean;
};

const Base64Pic = ({
  base64Images,
  setBase64Images,
  blocked,
}: Base64PicProps) => {
  const [deletedImages, setDeletedImages] = useState<number[]>([]);

  const handleDelete = (index: number) => {
    if (deletedImages.includes(index)) {
      setDeletedImages(deletedImages.filter((item) => item !== index));
    } else {
      setDeletedImages([...deletedImages, index]);
    }
  };

  const isDeleted = (index: number) => {
    return deletedImages.includes(index);
  };

  const handleShow = () => {
    const updatedImages = base64Images.filter(
      (_, idx) => !deletedImages.includes(idx)
    );

    setBase64Images &&
      setBase64Images(
        updatedImages.map((image) =>
          image.replace("data:image/png;base64, ", "")
        )
      );
  };

  return (
    <>
      {base64Images && base64Images.length > 0 && (
        <div className="pic-col">
          {base64Images.map((base64Data, index) => (
            <div key={index}>
              <img
                className={`${
                  blocked
                    ? ""
                    : isDeleted(index)
                    ? "deleted cursor-pointer"
                    : "cursor-pointer"
                }`}
                src={base64Data}
                alt={`Image ${index}-${base64Data}`}
                onClick={() => {
                  if (!blocked) {
                    handleDelete(index);
                  }
                }}
              />
            </div>
          ))}
          {setBase64Images && (
            <button className="in" onClick={handleShow}>
              Apply
            </button>
          )}
        </div>
      )}
    </>
  );
};

export { Base64Pic };
