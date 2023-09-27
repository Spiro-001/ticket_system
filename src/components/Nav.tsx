import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="bg-red-100 flex flex-col">
      <Link to="/tickets">Tickets</Link>
      <Link to="/sprints">Sprints</Link>
    </div>
  );
};

export default Nav;
