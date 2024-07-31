import db from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { page, limit, search, username } = await body;
    let news;
    let request = `SELECT * FROM news `;
    let options = ``;
    let order = ``;

    if (
      typeof username != "undefined" &&
      typeof username != undefined &&
      username.length > 0
    ) {
      options = `WHERE username ILIKE '%${username}%'`;
    } else if (typeof search != "undefined") {
      options = `WHERE title ILIKE '%${search}%' 
            OR body ILIKE '%${search}%'
            OR username ILIKE '%${search}%'`;
    }

    if (page && limit) {
      order = ` ORDER BY id DESC LIMIT ${limit} OFFSET ${(page - 1) * limit};`;
    } else {
      order = ` ORDER BY id DESC;`;
    }

    const count = Number(
      (await db.query(`SELECT COUNT(*) FROM news ${options}`)).rows[0].count
    );
    news = await db.query(request + options + order);

    const pages = Math.ceil(count / limit) || 1;

    return NextResponse.json(
      {
        news: news.rows,
        count,
        pages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log({ "news.error": error });
    return NextResponse.json({ error: `${error}` }, { status: 400 });
  }
}
