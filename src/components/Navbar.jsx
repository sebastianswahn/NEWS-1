import React from "react";
import { NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <div className="bg-blue-400 flex width-screen h-12">
      <ul className="flex w-full justify-center pt-4">
        <li className="mr-12 cursor-pointer hover:underline">
          <NavLink to="/">New evaluation</NavLink>
        </li>
        <li className="ml-12 cursor-pointer hover:underline">
          <NavLink to="/graph">See graph</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
