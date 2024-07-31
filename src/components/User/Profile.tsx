import { UserType } from "@/service/User/UsersType";
import { useCallback, useEffect, useState } from "react";
import { GetUserPic } from "@/service/User/UserPic";
import { UserInfo } from "@/components/User/UserInfo";
import { EditProfile } from "@/components/User/EditProfile";

type ProfileProps = {
  user: UserType;
};

const Profile = ({ user }: ProfileProps) => {
  const [pic, setPic] = useState<string[]>();
  const [edit, setEdit] = useState(false);

  const fetchPic = useCallback(async ({ user }: ProfileProps) => {
    const { image_data } = await GetUserPic({ data: user.username });
    image_data && setPic(image_data);
  }, []);

  useEffect(() => {
    user && fetchPic({ user });
  }, [user, fetchPic]);

  return (
    <>
      <div className="profile">
        {!edit ? (
          <>
            <UserInfo user={user} pic={pic} />
            <div>
              <button
                className="in"
                onClick={() => {
                  setEdit(!edit);
                }}
              >
                Edit
              </button>
            </div>
          </>
        ) : (
          <>
            <EditProfile user={user} pic={pic} />
            <div>
              <button
                className="in"
                onClick={() => {
                  setEdit(!edit);
                }}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export { Profile };
