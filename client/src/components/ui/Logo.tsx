import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link
      href={"/"}
      className=" text-azure text-2xl font-FannGrotesqueProSemiBold"
    >
      CVed<span className="text-gray-900">UP</span>
    </Link>
  );
};

export default Logo;
