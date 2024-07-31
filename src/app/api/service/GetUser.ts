import db from "@/server/db";

export const GetUser = async ({data}: { data: string }) => {
    try {
        const usersByName = await db.query(
            `SELECT * FROM users WHERE username = '${data}';`
        );
        if (usersByName.rowCount) return usersByName.rows[0];
        const usersByMail = await db.query(
            `SELECT * FROM users WHERE email = '${data}';`
        );
        if (usersByMail.rowCount) return usersByMail.rows[0];
        return {user:[]};
    } catch (error) {
        console.log({error});
        throw new Error(`${error}`);
    }
}
