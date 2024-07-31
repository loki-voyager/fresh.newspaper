"use client"

import {usePathname} from "next/navigation";
import Link from "next/link";
import {useUser} from "@/store";

type NavLink = {
    label: string;
    href: string;
    id:string;
    type: string;
};

type Props = {
    navLinks: NavLink[];
};

function isProtected(link: NavLink) {
    return link.type === "public";
}

const Navigation = ({ navLinks }: Props) => {
    const pathname = usePathname();
    const { Auth,role } = useUser();

    let filteredNavLinks = [];
    if (!Auth) {
        filteredNavLinks = navLinks.filter(isProtected);
    } else if (role === "admin") {
        filteredNavLinks = navLinks;
    }  else {
        filteredNavLinks = navLinks.filter(link => link.type !== "admin");
    }

    return (
        <>
            {filteredNavLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                    <Link
                        key={link.label}
                        href={link.href}
                        className={isActive ? "button active" : "button"}
                        id={link.id}
                    >
                        {link.label}
                    </Link>
                );
            })}
        </>
    );
};

export {Navigation};
