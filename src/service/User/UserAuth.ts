export type UserAuthProps = {
    data: string;
    password: string;
};

const UserAuth = async ({ data, password }: UserAuthProps) => {
    const res = await fetch(`http://localhost:3000/api/UserAuth`, {
        cache: "no-cache",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, password }),
    });
    if (!res.ok) {
        if (res.status === 500) {
            throw new Error(
                `${await res.json().then(({error}) => {
                    return error;
                })}`
            );
        } else {
            throw new Error(`Failed to authenticate. Error code: ${res.status}`);
        }
    }

    const userJSON = await res.json();
    return await userJSON.user;
};

export {UserAuth}