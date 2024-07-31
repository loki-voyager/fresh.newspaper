import { UserType } from "@/service/User/UsersType";
import { useUser } from "@/store";
import { ChangeEvent, FormEvent, useState } from "react";
import { handleFileChange, handleSubmit } from "@/utils/EditProfileHandle";
import { Base64Pic } from "@/components/Base64Pic";

type EditProfileProps = {
  user: UserType;
  pic?: string[];
};

const EditProfile = ({ user, pic }: EditProfileProps) => {
  const { setAuth, setUsername, setFirstName, setLastName, setEmail,setRole,role } =
    useUser();

  const [files, setFiles] = useState<FileList | null>();

  const base64Images = pic?.map(
    (data: string) => `data:image/png;base64, ${data}`
  );

  const [newBase64Images, setNewBase64Images] = useState<string[] | null>(null);

  const interlayerHandlesubmit = (event: FormEvent<HTMLFormElement>) => {
    handleSubmit({
      event,
      pic,
      user,
      setUsername,
      setAuth,
      setEmail,
      newBase64Images,
      setLastName,
      setFirstName,
      files,
      setRole,
      role
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
      <h2>Edit Profile:</h2>
      <div className="block">
        <form className="form" onSubmit={interlayerHandlesubmit}>
          <input type="text" name="username" placeholder={`${user.username}`} />
          <input
            type="password"
            name="old_password"
            placeholder="old password"
            required
          />
          <input
            type="password"
            name="new_password"
            placeholder="new password"
          />
          <input
            type="text"
            name="first_name"
            placeholder={`${user.first_name}`}
          />
          <input
            type="text"
            name="last_name"
            placeholder={`${user.last_name}`}
          />
          <input type="email" name="email" placeholder={`${user.email}`} />
          <label className="input_file">
            <input
              type="file"
              name="pic"
              accept="image/*"
              onChange={interlayerHandleFileChange}
            />
            <span className="button in">Choose File</span>
          </label>
          <button type="submit" className="in">
            Edit
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
        {base64Images && base64Images.length > 0 && (
          <div className="block">
            Old Pic:
            <Base64Pic
              base64Images={base64Images}
              setBase64Images={setNewBase64Images}
            />
          </div>
        )}
      </div>
    </>
  );
};

export { EditProfile };
