import { CommentsType } from "@/service/Comments/CommentsType";
import { useEffect, useState } from "react";
import { FetchCommentGrades } from "@/utils/FetchCommentGrades";
import { ComGrades } from "@/components/Grades/ComGrades";

type OneCommentsProps = {
  com: CommentsType;
  username: string;
};

const OneComments = ({ com, username }: OneCommentsProps) => {
  const { id, username: comUsername, generation, mention, body, news_id } = com;
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  useEffect(() => {
    FetchCommentGrades({ id }).then((data) => {
      const { likes, dislikes } = data;
      setLikes(likes);
      setDislikes(dislikes);
    });
  }, []);

  return (
    <>
      <div className="frame">
        <div>{body}</div>
        <div className="author">
          {"{"}
          <span className={username == comUsername ? "owner" : ""}>
            {comUsername}
          </span>{" "}
          {generation}{" "}
          {mention && (
            <span className={username == mention ? "mention" : ""}>
              {mention}
            </span>
          )}
          {"}"}
        </div>
        <ComGrades id={id} username={username} />
      </div>
    </>
  );
};

export { OneComments };
