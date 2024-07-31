import db from "@/server/db";
import { NextResponse } from "next/server";

export async function POST(req: NextResponse) {
  try {
    let com;
    const { id, username, page, limit, search } = await req.json();

    let request = `SELECT * FROM comments `;
    let options = ``;
    let order: string;
    if (id) options = `WHERE news_id = ${id}`;

    if (
      typeof username != "undefined" &&
      typeof username != undefined &&
      username.length > 0 &&
      id
    ) {
      options = options + ` AND username ILIKE '%${username}%'`;
    } else if (
      typeof username != "undefined" &&
      typeof username != undefined &&
      username.length > 0 &&
      !id
    ) {
      options = `WHERE username ILIKE '%${username}%'`;
    }
    if (
      typeof search != "undefined" &&
      typeof search != undefined &&
      search.length > 0
    ) {
      options =
        options +
        ` AND body ILIKE '%${search}%' OR mention ILIKE '%${search}%'`;
    }

    if (page && limit) {
      order = ` ORDER BY id LIMIT ${limit} OFFSET ${(page - 1) * limit}`;
    } else {
      order = ` ORDER BY id`;
    }

    const count = (await db.query(`SELECT COUNT(*) FROM comments ${options}`))
      .rows[0].count;

    com = await db.query(request + options + order);

    const pages = Math.ceil(count / limit) || 1;

    return NextResponse.json(
      { comment: com.rows, count, pages },
      { status: 200 }
    );
  } catch (error) {
    console.log({ comment_get: error });
    return NextResponse.json({ error: `${error}` }, { status: 400 });
  }
}
