import {FormEvent} from "react";
import {convertFilesToBase64Array} from "@/utils/ToBase64";
import {CreateNews} from "@/service/News/NewsCreate";

type handleSubmitProps = {
    event: FormEvent<HTMLFormElement>;
    files: FileList | null | undefined;
    username: string | null
}

async function handleSubmit(
    {
        event,
        files,
        username
    }: handleSubmitProps) {
    event.preventDefault();
    let base64Array: string[] = [];

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;

    if (files && files.length > 0) {
        base64Array = await convertFilesToBase64Array(files);
    }

    try {
        let res;
        if (base64Array.length > 0 && username) {
            res = await CreateNews({
                title,
                body,
                username,
                image_data: base64Array,
            });
        } else if (username) {
            console.log({username});
            res = await CreateNews({title, body, username});
        }
        if (res) {
            window.location.href = `/news`;
        }
    } catch (error) {
        console.log({error});
        alert("Error by creating news");
    }
};

export {handleSubmit}