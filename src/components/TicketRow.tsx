import React from "react";
import { TicketType } from "../utils/Types";
import { formatTime } from "../utils/FormatTime";

interface TicketRowProp {
  ticket: TicketType;
}

const TicketRow = ({ ticket }: TicketRowProp) => {
  const color: Record<string, string> = {
    new: "bg-green-200",
    closed: "bg-gray-300",
    normal: "bg-green-200",
    important: "bg-red-200",
  };

  return (
    ticket.id && (
      <div className="flex px-14 py-2 items-center w-full rounded-md bg-zinc-200">
        <span className="w-full max-w-[350px] font-bold pr-8">
          {ticket.name}
        </span>
        <div className=" w-full max-w-[100px]">
          <span
            className={`${
              color[ticket.priority]
            } px-3 py-0.5 rounded-md font-bold text-sm shadow-sm`}
          >
            {ticket.priority}
          </span>
        </div>
        <div className=" w-full max-w-[100px]">
          <span
            className={`${
              color[ticket.status]
            } px-3 py-0.5 rounded-md font-bold text-sm shadow-sm`}
          >
            {ticket.status}
          </span>
        </div>
        <div className="flex flex-col w-full max-w-[120px]">
          <span>{formatTime(ticket.createdAt).date}</span>
          <span>{formatTime(ticket.createdAt).time}</span>
        </div>
        <div className="flex flex-col w-full max-w-[120px]">
          <span>{formatTime(ticket.updatedAt).date}</span>
          <span>{formatTime(ticket.updatedAt).time}</span>
        </div>
      </div>
    )
  );
};

export default TicketRow;
