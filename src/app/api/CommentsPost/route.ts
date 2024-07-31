import db from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { news_id, mention, username, data } = await req.json();
    // console.log({ news_id, mention, username, data });

    let comment;
    if (mention) {
      // console.log({mention:true});
      comment = await db.query(
        `INSERT INTO comments (news_id, mention, username, body) VALUES (${news_id},'${mention}', '${username}', '${data}');`
      );
      try {
        const notification = await db.query(
          `INSERT INTO notifications (body, mention, com_body, news_id, username) VALUES ('Your comment was responded','${username}','${data}',${news_id},'${mention}');`
        );
      } catch (error) {
        console.log({ "notification.error": error });
        return NextResponse.json({ error: `${error}` }, { status: 400 });
      }
    } else {
      // console.log({mention:false});
      comment = await db.query(
        `INSERT INTO comments (news_id, username, body) VALUES (${news_id},'${username}', '${data}');`
      );
      try {
        const { username: news_username } = (
          await db.query(`SELECT * FROM news WHERE id = '${news_id}';`)
        ).rows[0];

        if (news_username && news_username != username) {
          const notification = await db.query(
            `INSERT INTO notifications (body, com_body, news_id, username) VALUES ('A comment was written on your news','${data}',${news_id},'${news_username}');`
          );
        }
      } catch (error) {
        console.log({ "notification.error": error });
        return NextResponse.json({ error: `${error}` }, { status: 400 });
      }
    }
    if (comment.rowCount)
      return NextResponse.json({ comment: true }, { status: 200 });
  } catch (error) {
    console.log({ comment: error });
    return NextResponse.json({ error: `${error}` }, { status: 400 });
  }
}
