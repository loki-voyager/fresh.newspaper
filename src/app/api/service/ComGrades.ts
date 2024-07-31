import db from "@/server/db";

export const CheckComDislike = async (
    {
        com_id,
        username,
    }: {
        com_id: number;
        username: string;
    }) => {
    try {
        const dislike_check = (
            await db.query(`SELECT EXISTS (
      SELECT  
      FROM users 
      WHERE username = '${username}' 
      AND ${com_id} = ANY(com_dislikes)
  );`)
        ).rows[0].exists;
        return dislike_check;
    } catch (error) {
        console.log({error});
        throw new Error(`${error}`);
    }
};
export const CheckComLike = async (
    {
        com_id,
        username,
    }: {
        com_id: number;
        username: string;
    }) => {
    try {
        const like_check = (
            await db.query(`SELECT EXISTS (
      SELECT  
      FROM users 
      WHERE username = '${username}' 
      AND ${com_id} = ANY(com_likes)
  );`)
        ).rows[0].exists;
        return like_check;
    } catch (error) {
        console.log({error});
        throw new Error(`${error}`);
    }
};
export const DislikeCom = async (news_id: number, username: string) => {
    try {
        const news_dislikes = await db.query(`UPDATE comments
    SET dislikes = dislikes + 1
    WHERE id = ${news_id};`);
        if (news_dislikes.rowCount) {
            const user_dislikes = await db.query(
                `UPDATE users SET com_dislikes = array_append(com_dislikes, ${news_id}) WHERE username = '${username}';`
            );
            if (user_dislikes.rowCount) {
                return true;
            }
        }
        return false;
    } catch (error) {
        console.log({error});
        throw new Error(`${error}`);
    }
};
export const LikeCom = async (id: number, username: string) => {
    try {
        const news_likes = await db.query(`UPDATE comments
    SET likes = likes + 1
    WHERE id = ${id};`);
        if (news_likes.rowCount) {
            const user_likes = await db.query(
                `UPDATE users SET com_likes = array_append(com_likes, ${id}) WHERE username = '${username}';`
            );
            if (user_likes.rowCount) {
                return true;
            }
        }
        return false;
    } catch (error) {
        console.log({"like_com.error": error});
        throw new Error(`${error}`);
    }
};
export const UndislikeCom = async (news_id: number, username: string) => {
    try {
        const news_undislikes = await db.query(
            `UPDATE comments SET dislikes = dislikes - 1 WHERE id = ${news_id};`
        );
        if (news_undislikes.rowCount) {
            const user_undislikes = await db.query(
                `UPDATE users SET com_dislikes = array_remove(com_dislikes, ${news_id}) WHERE username = '${username}';`
            );
            if (user_undislikes.rowCount) {
                return true;
            }
        }
        return false;
    } catch (error) {
        console.log({error});
        throw new Error(`${error}`);
    }
};
export const UnlikeCom = async (news_id: number, username: string) => {
    try {
        const news_unlikes = await db.query(
            `UPDATE comments SET likes = likes - 1 WHERE id = ${news_id};`
        );
        if (news_unlikes.rowCount) {
            const user_unlikes = await db.query(
                `UPDATE users SET com_likes = array_remove(com_likes, ${news_id}) WHERE username = '${username}';`
            );
            if (user_unlikes.rowCount) {
                return true;
            }
        }
        return false;
    } catch (error) {
        console.log({error});
        throw new Error(`${error}`);
    }
};
