import React from "react";
import { TicketType } from "../utils/Types";

interface TicketCardProp {
  ticket: TicketType;
}

const TicketCard = ({ ticket }: TicketCardProp) => {
  const color: Record<string, string> = {
    new: "bg-green-200",
    closed: "bg-gray-200",
    normal: "bg-green-200",
    important: "bg-red-200",
  };
  return (
    <div className="px-12 py-8 bg-gray-100 border rounded-md shadow-md h-full">
      <div className="flex flex-col gap-y-24">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl bg-neutral-900 text-white px-6 py-1 rounded-md shadow-sm">
            {ticket.name}
          </h1>
          <div className="flex gap-x-2 items-center">
            <span
              className={`${
                color[ticket.status]
              } px-3 py-0.5 rounded-md font-bold text-sm shadow-sm`}
            >
              {ticket.status.toLocaleUpperCase()}
            </span>
            <span
              className={`${
                color[ticket.priority]
              } px-3 py-0.5 rounded-md font-bold text-sm shadow-sm`}
            >
              {ticket.priority.toLocaleUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <span className="bg-neutral-50 px-8 py-4 rounded-md flex flex-col gap-y-4 shadow-sm">
            <span className="text-xl bg-gray-200 w-fit px-3 py-0.5 rounded-md shadow-sm">
              Description
            </span>
            <span className="px-8">{ticket.description}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
