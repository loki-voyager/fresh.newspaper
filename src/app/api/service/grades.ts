import db from "@/server/db";

export const CheckDislike = async (news_id: number, username: string) => {
    try {
        const user = await db.query(
            `SELECT * FROM users WHERE username = '${username}'`
        );
        return user.rows[0].dislikes.includes(news_id);
    } catch (error) {
        console.log({error})
        throw new Error(`${error}`);
    }
};
export const CheckLike = async (news_id: number, username: string) => {
    try {
        const user = await db.query(
            `SELECT * FROM users WHERE username = '${username}'`
        );
        return user.rows[0].likes.includes(news_id);
    } catch (error) {
        console.log({error})
        throw new Error(`${error}`);
    }
};
export const DislikeNews = async (news_id: number, username: string) => {
    try {
        const news_dislikes = await db.query(`UPDATE news
    SET dislikes = dislikes + 1
    WHERE id = ${news_id};`);
        if (news_dislikes.rowCount) {
            const user_dislikes = await db.query(
                `UPDATE users SET dislikes = array_append(dislikes, ${news_id}) WHERE username = '${username}';`
            );
            if (user_dislikes.rowCount) {
                return true;
            }
        }
        return false;
    } catch (error) {
        console.log({error})
        throw new Error(`${error}`);
    }
};
export const LikeNews = async (news_id: number, username: string) => {
    try {
        const news_likes = await db.query(`UPDATE news
    SET likes = likes + 1
    WHERE id = ${news_id};`);
        if (news_likes.rowCount) {
            const user_likes = await db.query(
                `UPDATE users SET likes = array_append(likes, ${news_id}) WHERE username = '${username}';`
            );
            if (user_likes.rowCount) {
                return true;
            }
        }
        return false;
    } catch (error) {
        console.log({error})
        throw new Error(`${error}`);
    }
};
export const UndislikeNews = async (news_id: number, username: string) => {
    try {
        const news_undislikes = await db.query(
            `UPDATE news SET dislikes = dislikes - 1 WHERE id = ${news_id};`
        );
        if (news_undislikes.rowCount) {
            const user_undislikes = await db.query(
                `UPDATE users SET dislikes = array_remove(dislikes, ${news_id}) WHERE username = '${username}';`
            );
            if (user_undislikes.rowCount) {
                return true;
            }
        }
        return false;
    } catch (error) {
        console.log({error})
        throw new Error(`${error}`);
    }
};
export const UnlikeNews = async (news_id: number, username: string) => {
    try {
        const news_unlikes = await db.query(
            `UPDATE news SET likes = likes - 1 WHERE id = ${news_id};`
        );
        if (news_unlikes.rowCount) {
            const user_unlikes = await db.query(
                `UPDATE users SET likes = array_remove(likes, ${news_id}) WHERE username = '${username}';`
            );
            if (user_unlikes.rowCount) {
                return true;
            }
        }
        return false;
    } catch (error) {
        console.log({error})
        throw new Error(`${error}`);
    }
};