import Link from "next/link";
import React from "react";

const pageLink = [
  { id: 0, name: "Home", href: "/" },
  { id: 1, name: "Template", href: "/" },
  { id: 2, name: "Support", href: "/" },
];

// const authLink = [
//   { id: 0, name: "Login", href: "/" },
//   { id: 1, name: "Signup", href: "/" },
// ];

const NavBar = () => {
  return (
    <div className="flex items-center justify-between flex-grow text-sm">
      <ul className="flex items-center gap-1 ">
        {pageLink.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="px-4 py-1 border border-transparent hover:border-conflowerBlue 
            rounded-lg transition-all duration-300  ease-in-out"
          >
            {item.name}
          </Link>
        ))}
      </ul>

      <ul className="flex items-center gap-8 flex-grow justify-end font-FannGrotesqueProMid text-base">
        <Link
          href={"/"}
          className="px-4 py-2 border border-conflowerBlue rounded-lg
           hover:bg-azure transition-all duration-300  ease-in-out"
        >
          Log in
        </Link>
        <Link
          href={"/"}
          className="px-4 py-2 border bg-azure rounded-lg hover:bg-transparent 
          hover:border-conflowerBlue transition-all duration-300  ease-in-out"
        >
          Sign up
        </Link>
      </ul>
    </div>
  );
};

export default NavBar;
