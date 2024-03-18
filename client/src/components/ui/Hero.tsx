import Link from "next/link";
import React from "react";

const HeroHomePage = () => {
  return (
    <section className=" flex flex-col items-start justify-center flex-grow px-12 h-full w-full">
      <h1 className="text-6xl  font-FannGrotesqueProBold wid tracking-wide">
        Create a <span className="block text-azure">Professional CV </span> in
        Minutes
      </h1>
      <p className="mt-4 text-slate-700 max-w-2xl font-FannGrotesqueProBook ">
        Elevate your career game with our CV Builder – because who needs
        superheroes when you can have a perfectly polished resume? Let&apos;s
        banish bland CVs to the Phantom Zone and unleash your professional
        prowess with style. With us, your job search journey will be less
        &apos;Mission Impossible&apos; and more &apos;Mission: I&apos;m
        Possible!&apos; Let&apos;s build your career empire, one witty word at a
        time!
      </p>

      <Link
        href={"/"}
        className="mt-6 px-4 py-3 border font-FannGrotesqueProMid bg-azure rounded-lg
         hover:text-slate-50 hover:bg-yaleBlue transition-all duration-300  ease-in-out"
      >
        Get Started
      </Link>
    </section>
  );
};

export default HeroHomePage;
