import {NotiRead} from "@/service/Noti/NotiRead";
import {FetchNoti, FetchNotiProps} from "@/utils/FetchNoti";

type handleReadProps = FetchNotiProps & {
    e: { preventDefault: () => void; },
    id: number,
    is_read: boolean,
    news_id: number,
    username: string
}

async function handleRead(
    {
        e,
        id,
        is_read,
        news_id,
        username,
        page,
        limit,
        search,
        setTotal,
        setNoti
    }: handleReadProps) {
    e.preventDefault()
    if (!is_read) {
        await NotiRead({id, username}).then(() => {
            username && FetchNoti({
                page, search, limit, username, setNoti, setTotal,
            })
        })
    }
    window.location.href = `/news/${news_id}`
}

export {handleRead}