import {UserType} from "@/service/User/UsersType";
import React from "react";
import Link from "next/link";
import {Base64Pic} from "@/components/Base64Pic";

type UserInfoProps = {
    user: UserType;
    pic?: string[];
};

const UserInfo =({user,pic}:UserInfoProps)=>{

    const base64Images = pic?.map(
        (data: string) => `data:image/png;base64, ${data}`
    );

    return (
        <>
            <h2>Profile:</h2>
            <div className="line">
                <Base64Pic base64Images={base64Images as string[]} blocked/>
                <div className="user-info">
                    {"{"}
                    <div className="ml-2">Username: {user.username}</div>
                    <div className="ml-2">First_name: {user.first_name}</div>
                    <div className="ml-2">Last_name: {user.last_name}</div>
                    <div className="ml-2">Email: {user.email}</div>
                    <div className="ml-2 line">
                        <Link
                            className="button"
                            href={`/likedNews`}
                        >
                            liked_news
                        </Link>
                        <Link
                            className="button"
                            href={`/dislikedNews`}
                        >
                            disliked_news
                        </Link>
                    </div>
                    <div className="ml-2 line">
                        <Link
                            className="button"
                            href={`/likedComments`}
                        >
                            liked_com
                        </Link>
                        <Link
                            className="button"
                            href={`/dislikedComments`}
                        >
                            disliked_com
                        </Link>
                        <Link
                            className="button"
                            href={`/myCom`}
                        >
                            my_com
                        </Link>
                    </div>
                    <Link
                        className="button ml-2"
                        href={`/noti`}
                    >
                        notification
                    </Link>
                    {"}"}
                </div>
            </div>
        </>
    );
}

export {UserInfo};