import React from "react";
import { Link } from "react-router-dom";
import { getSprints, getTickets } from "../utils/GetItem";
import {
  clearLocalStorage,
  fillLocalStorage,
  resetLocalStorage,
} from "../utils/Admin";

const Home = () => {
  const dateToday = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const tickets = getTickets();
  const sprints = getSprints();
  const data = { tickets, sprints };

  return (
    <div className="flex-1 flex flex-col gap-y-8 py-8 px-8">
      <div className="flex justify-between">
        <h1 className="text-xl sm:text-3xl font-bold">{dateToday}</h1>
        <div className="flex gap-x-8 items-center  whitespace-nowrap">
          <Link
            to="/new-ticket"
            className="bg-blue-100 px-4 py-2 rounded-md shadow-sm"
          >
            New Ticket
          </Link>
          <Link
            to="/new-sprint"
            className="bg-blue-100 px-4 py-2 rounded-md shadow-sm"
          >
            New Sprint
          </Link>
        </div>
      </div>
      <div className="flex w-fit min-h-[200px] gap-x-4">
        <Link
          className="flex flex-col justify-between min-w-[200px] border border-gray-100 rounded-md shadow-sm bg-gray-50"
          to="/tickets"
        >
          <h1 className="font-semibold text-2xl px-4 py-2">Tickets</h1>
          <div className="ml-auto py-2">
            <span className="font-semibold text-2xl px-4">
              {data.tickets.length}
            </span>
          </div>
        </Link>
        <Link
          className="flex flex-col justify-between min-w-[200px] border border-gray-100 rounded-md shadow-sm bg-gray-50"
          to="/sprints"
        >
          <h1 className="font-semibold text-2xl px-4 py-2">Sprints</h1>
          <div className="ml-auto py-2">
            <span className="font-semibold text-2xl px-4">
              {data.sprints.length}
            </span>
          </div>
        </Link>
      </div>

      <div className="border border-gray-100 bg-red-50 flex flex-col px-8 py-4 w-fit rounded-md shadow-sm gap-y-8">
        <span className="text-3xl font-semibold">Admin Toolkit</span>
        <div className="flex gap-x-4 text-xl font-semibold">
          <button
            className="w-fit bg-red-300 text-red-900 px-3 py-1 rounded-md shadow-sm"
            onClick={clearLocalStorage}
          >
            Clear Database
          </button>
          <button
            className="w-fit bg-lime-300 text-lime-900 px-3 py-1 rounded-md shadow-sm"
            onClick={resetLocalStorage}
          >
            Reset Database
          </button>
          <button
            className="w-fit bg-violet-300 text-violet-900 px-3 py-1 rounded-md shadow-sm"
            onClick={fillLocalStorage}
          >
            Fill Random Database
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
