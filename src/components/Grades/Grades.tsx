import {GetGradesProps, GradesProps} from "@/service/Grades/GradesGet";
import {useEffect, useState} from "react";
import {FetchGrades} from "@/utils/FetchGrades";
import {GetCommentsProps} from "@/service/Comments/GetComments";
import {NewsLike} from "@/service/Grades/NewsLike";
import {NewsDislike} from "@/service/Grades/NewsDislike";


type GradesComponentProps = {
    id: number;
    username: string | null;
};

const Grades = (
    {
        id,
        username,
    }: GradesComponentProps) => {

    const [grades, setGrades] = useState<GradesProps>();

    useEffect(() => {
        FetchGrades({id}).then(FetchedGrades=>{
            setGrades(FetchedGrades);
        })
    }, []);

    const handleLike = async () => {
        username && NewsLike({news_id:id,username}).then((res)=>{
            if (res) FetchGrades({id}).then(FetchedGrades=>{
                setGrades(FetchedGrades);
            })
        })

    };
    const handleAlert = async () => {
        alert("You must be logged in to give a rating.");
    };
    const handleDislike = async () => {
        username && NewsDislike({news_id:id,username}).then((res)=>{
            if (res) FetchGrades({id}).then(FetchedGrades=>{
                setGrades(FetchedGrades);
            })
        })

    };

    return grades && (
        <div className="grades">
                <button className="in" onClick={username ? handleLike : handleAlert}>
                    {"{"}
                    {grades.likes}+{"}"}
                </button>
                <button className="out" onClick={username ? handleDislike : handleAlert}>
                    {"{"}
                    {grades.dislikes}-{"}"}
                </button>
        </div>
    );
};

export {Grades};
