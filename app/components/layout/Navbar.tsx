"use client";

import React, { useState } from "react";
import { InlineIcon } from "@iconify/react";
import Link from "next/link";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <nav className="py-4 bg-base-200 ">
      <div className="container w-[90%] max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center flex-wrap">
          <Link href={"/"}>
            <div className="flex items-center gap-1">
              <InlineIcon
                icon="flat-color-icons:lock"
                width="1.2em"
                height="1.2em"
              />
              <h1>Locksmith</h1>
            </div>
          </Link>

          <label className="btn btn-circle swap swap-rotate md:hidden">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              checked={isExpanded}
              onChange={() => setIsExpanded(!isExpanded)}
            />

            {/* hamburger icon */}
            <svg
              className="swap-off fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>

            {/* close icon */}
            <svg
              className="swap-on fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
          </label>

          <ul className="hidden md:flex flex-wrap items-center gap-4">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/about"}>About</Link>
            </li>
            <li>
              <Link href={"/contact"}>Contact</Link>
            </li>
            <li>
              <Link href={"/login"}>
                <button className="btn btn-primary rounded-md">Login</button>
              </Link>
            </li>
            <li>
              <Link href={"/register"}>
                <button className="btn btn-secondary rounded-md">
                  Register
                </button>
              </Link>
            </li>
          </ul>
        </div>

        {/* mobile menu */}
        <ul
          className={`p-2 rounded-md bg-base-100  ${
            isExpanded ? "flex flex-col gap-2 mt-2" : "hidden"
          }`}
        >
          <li onClick={() => setIsExpanded(false)}>
            <Link href={"/"}>Home</Link>
          </li>
          <li onClick={() => setIsExpanded(false)}>
            <Link href={"/about"}>About</Link>
          </li>
          <li onClick={() => setIsExpanded(false)}>
            <Link href={"/contact"}>Contact</Link>
          </li>
          <li onClick={() => setIsExpanded(false)}>
            <Link href={"/login"}>
              <button className="btn btn-primary rounded-md">Login</button>
            </Link>
          </li>
          <li onClick={() => setIsExpanded(false)}>
            <Link href={"/register"}>
              <button className="btn btn-secondary rounded-md">Register</button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
