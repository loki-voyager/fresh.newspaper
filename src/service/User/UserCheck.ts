type UserCheckProps = {
    data: string;
    password: string;
};

const UserCheck = async ({ data, password }: UserCheckProps) => {
    const res = await fetch(`http://localhost:3000/api/UserCheck`, {
        cache: "no-cache",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, password }),
    });

    if (!res.ok) {
        if (res.status === 500) {
            return false;
        } else {
            throw new Error(`Failed to check user. Error code: ${res.status}`);
        }
    }
    return res.json();
};

export {UserCheck};