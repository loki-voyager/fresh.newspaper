import db from "@/server/db";
import { NextRequest, NextResponse } from "next/server";
import { GetUser } from "@/app/api/service/GetUser";
import { UserType } from "@/service/User/UsersType";

export async function POST(req: NextRequest) {
  try {
    let disliked;
    const {
      username,
      page,
      limit,
      search,
    }: {
      username: string;
      page: number;
      limit: number;
      search: string;
    } = await req.json();

    const user: UserType = await GetUser({ data: username });
    if (!user || !user.com_dislikes.length) {
      return NextResponse.json(
        { comment: [], count: 0, pages: 0 },
        { status: 200 }
      );
    }

    let request = `SELECT * FROM comments `;
    let options = `WHERE id IN (${user.com_dislikes})`;
    let order = ``;
    if (
      typeof search != "undefined" &&
      typeof search != undefined &&
      search.length > 0
    ) {
      options =
        options +
        ` AND body ILIKE '%${search}%' OR mention ILIKE '%${search}%' OR username ILIKE '%${search}%'`;
    }

    if (page && limit) {
      order = ` ORDER BY id LIMIT ${limit} OFFSET ${(page - 1) * limit}`;
    } else {
      order = ` ORDER BY id`;
    }

    const count = (await db.query(`SELECT COUNT(*) FROM comments ${options}`))
      .rows[0].count;

    disliked = await db.query(request + options + order);

    const pages = Math.ceil(count / limit) || 1;

    return NextResponse.json(
      { comment: disliked.rows, count, pages },
      { status: 200 }
    );
  } catch (error) {
    console.log({ liked_com: error });
    return NextResponse.json({ error: `${error}` }, { status: 400 });
  }
}
