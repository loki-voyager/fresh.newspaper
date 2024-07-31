import {Dispatch, FormEvent, SetStateAction} from "react";
import {CreateComments} from "@/service/Comments/CommentsCreate";
import {FetchComments} from "@/utils/FetchComments";
import {CommentsType} from "@/service/Comments/CommentsType";

type handleSubmitProps = {
    event: FormEvent<HTMLFormElement>;
    username: string;
    id: number;
    data: string;
    mention: string;
    setData: Dispatch<SetStateAction<string>>;
    setMention: Dispatch<SetStateAction<string>>;
    setCom: (value: SetStateAction<CommentsType[]>) => void;
}

async function handleSubmit(
    {
        event,
        username,
        id,
        data,
        mention,
        setData,
        setMention,
        setCom
    }: handleSubmitProps) {
    event.preventDefault();
    try {
        const res = await CreateComments(
            {
                news_id: id,
                username,
                data,
                mention
            }
        );
        if (res) {
            setData("");
            setMention("");
            FetchComments({id,setCom})
        }
    } catch (error) {
        console.log({error});
        alert("Error by creating comment");
    }
};

export {handleSubmit}