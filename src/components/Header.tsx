import { Navigation } from "./Navigation";

const navItems = [
    { label: "Home", href: "/", id:"home", type: "public" },
    { label: "News", href: "/news", id:"news", type: "public" },
    { label: "LikeNews", href: "/likedNews", id:"likedNews", type: "private" },
    { label: "DislikedNews", href: "/dislikedNews", id:"dislikedNews", type: "private" },
    { label: "LikedComments", href: "/likedComments", id:"likedComments", type: "private" },
    { label: "DislikedComments", href: "/dislikedComments", id:"dislikedComments", type: "private" },
    { label: "MyCom", href: "/myCom", id:"myCom", type: "private" },
    { label: "Notification", href: "/noti", id:"noti", type: "private" },
    { label: "Users", href: "/users", id:"users", type: "admin" },
];

const Header = () => {
    return (
        <header>
            <div className="wrapper">
                <nav>
                    <Navigation navLinks={navItems} />
                </nav>
            </div>
        </header>
    );
};

export { Header };
