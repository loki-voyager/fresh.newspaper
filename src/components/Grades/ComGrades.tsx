import {useEffect, useState} from "react";
import {FetchCommentGrades} from "@/utils/FetchCommentGrades";
import {CommentsLike} from "@/service/Grades/CommentsLike";
import {CommentsDislike} from "@/service/Grades/CommentsDislike";


type GradesComponentProps = {
    id: number;
    username: string | null;
};

const ComGrades = (
    {
        id,
        username,
    }: GradesComponentProps) => {

    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    useEffect(() => {
        FetchCommentGrades({id}).then(data => {
            const {likes, dislikes} = data;
            setLikes(likes);
            setDislikes(dislikes);
        })
    }, []);

    const handleAlert = async () => {
        alert("You must be logged in to give a rating.");
    };

    const handleLike = async () => {
        username && CommentsLike({com_id:id,username}).then((res)=>{
            if(res)  FetchCommentGrades({id}).then(data => {
                const {likes, dislikes} = data;
                setLikes(likes);
                setDislikes(dislikes);
            })
        })
    }
    const handleDislike = async () => {
        username && CommentsDislike({com_id:id,username}).then((res)=>{
            if(res)  FetchCommentGrades({id}).then(data => {
                const {likes, dislikes} = data;
                setLikes(likes);
                setDislikes(dislikes);
            })
        })
    }

    return (
        <div className="line apart">
            <div className="line">
                <button
                    className="in"
                    onClick={() => {
                        username ? handleLike() : handleAlert();
                    }}
                >
                    {"{"}
                    {likes}+{"}"}
                </button>
                <button
                    className="out"
                    onClick={() => {
                        username ? handleDislike() : handleAlert();
                    }}
                >
                    {"{"}
                    {dislikes}-{"}"}
                </button>
            </div>
        </div>
    );
};

export {ComGrades};
