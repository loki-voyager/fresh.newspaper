type GetUserPicProps = {
    data: string;
};

const GetUserPic=async({data}:GetUserPicProps)=>{
    const res = await fetch(`http://localhost:3000/api/UserPic`, {
        cache: "no-cache",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
    });

    if (!res.ok) {
        if (res.status === 500) {
            return false;
        } else {
            throw new Error(`Failed to check user. Error code: ${res.status}`);
        }
    }
    return (await res.json()).pic;
}

export {GetUserPic};