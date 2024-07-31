"use client"

import {auth} from "@/service/auth";
import {Profile} from "@/components/User/Profile";
import {useUser} from "@/store";
import {UserDelete} from "@/service/User/UserDelete";

const Shape = () => {
    const {Auth, user} = auth();
    const {setAuth, setUsername} = useUser();

    const signOut = async () => {
        setAuth(false), setUsername(null);
        localStorage.removeItem("user");
        window.location.href = "/";
    };
    const userDelete = async () => {
        console.log({userDelete: true})
        setAuth(false), setUsername(null);
        localStorage.removeItem("user");
        user && (await UserDelete({username: user.username as string}));
        window.location.href = "/";
    };

    return (
        <>
            <div className="home">
                {!Auth ? (<div className="line">
                    <button
                        className="in"
                        id="signin"
                        onClick={() => {
                            window.location.href = "/signin"
                        }}
                    >Sign In
                    </button>
                    <button
                        className="in"
                        id="signup"
                        onClick={() => {
                            window.location.href = "/signup"
                        }}
                    >Sign Up
                    </button>
                </div>) : (
                    <div className="shape-profile">
                        <div className="line">
                            <button className="out" onClick={signOut} id="signout">
                                Sign Out
                            </button>
                            <button className="out" onClick={userDelete}>
                                Delete
                            </button>
                        </div>
                        {user && <Profile user={user}/>}
                    </div>
                )}
            </div>
        </>
    )
}

export {Shape};