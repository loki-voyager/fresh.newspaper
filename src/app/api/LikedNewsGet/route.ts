import db from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    let liked;

    const { username, page, limit, search } = await req.json();

    const user = (
      await db.query(
        `SELECT * FROM users WHERE username ILIKE '%${username}%';`
      )
    ).rows[0];
    if (!user.likes.length) {
      return NextResponse.json(
        {
          news: [],
          count: 0,
          pages: 0,
        },
        { status: 200 }
      );
    }

    let request = `SELECT * FROM news `;
    let options = `WHERE id IN (${user.likes}) `;
    let order = ``;

    if (
      typeof search != "undefined" &&
      typeof search != undefined &&
      search.length > 0
    ) {
      options =
        options +
        `AND title ILIKE '%${search}%' OR body ILIKE '%${search}%' OR username ILIKE '%${search}%'`;
    }

    if (page && limit) {
      order = ` ORDER BY id DESC LIMIT ${limit} OFFSET ${(page - 1) * limit};`;
    } else {
      order = ` ORDER BY id DESC;`;
    }

    const count = Number(
      (await db.query(`SELECT COUNT(*) FROM news ${options}`)).rows[0].count
    );

    liked = await db.query(request + options + order);

    let pages;

    count && limit ? (pages = Math.ceil(count / limit) || 1) : (pages = 1);

    return NextResponse.json(
      {
        news: liked.rows,
        count,
        pages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log({ liked_news: error });
    return NextResponse.json({ error: `${error}` }, { status: 400 });
  }
}
