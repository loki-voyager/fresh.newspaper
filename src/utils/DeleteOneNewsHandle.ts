import {DeleteOneNews} from "@/service/News/OneNews/OneNewsDelete";

const HandleDeleteOneNews = async ({ id }: { id: number }) => {
    await DeleteOneNews({ id }).then((res) => {
        if (res == true) window.location.href = `/news`;
    });
};

export {HandleDeleteOneNews};