import React, { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TicketType } from "../utils/Types";
import TicketRow from "./TicketRow";
import { getTickets } from "../utils/GetItem";

type createFunction = () => ReactNode;
type onClickFunction = (
  event: React.MouseEvent<HTMLInputElement, MouseEvent>,
  element: TicketType
) => void;
type filterFunction = (element: TicketType) => void;

interface TicketsProp {
  data: TicketType[];
  nested?: boolean;
  create?: createFunction;
  onClickRow?: onClickFunction;
  filterDup?: filterFunction;
}

const Tickets = ({
  data = getTickets(),
  nested,
  create = () => {
    return <Link to="/new-ticket">Create Ticket</Link>;
  },
  onClickRow = (ticket) => {},
  filterDup = (element: TicketType) => {
    return element;
  },
}: TicketsProp) => {
  const [tickets, setTickets] = useState(data);
  const [search, setSearch] = useState("");

  const handleInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value);
  };

  const filterSearch = (ticket: TicketType) => {
    return ticket.name.toLowerCase().includes(search.toLowerCase());
  };

  useEffect(() => {
    setTickets(data);
  }, [data]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="relative bg-gray-100 flex flex-col items-center py-12 px-8 rounded-md shadow-md">
        <div className="w-full py-4 flex flex-col gap-y-4">
          <div className="w-full flex justify-between items-center">
            <div className="bg-stone-200 px-3 py-1 rounded-md shadow-sm font-semibold text-lg">
              {create()}
            </div>
            <input
              value={search}
              onChange={handleInput}
              className="px-3 py-1 rounded-md shadow-sm"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="flex flex-col w-fit min-h-[375px] max-h-[375px] h-full overflow-y-scroll relative rounded-md">
          <div className="flex px-14 py-3 sticky top-0 bg-purple-200 font-semibold shadow-sm z-50 mb-2">
            <span className="w-full min-w-[350px] max-w-[350px]">Subject</span>
            <span className="w-full min-w-[100px] max-w-[100px]">Priority</span>
            <span className="w-full min-w-[100px] max-w-[100px]">Status</span>
            <span className="w-full min-w-[120px] max-w-[120px]">Date</span>
            <span className="w-full min-w-[120px] max-w-[120px]">Updated</span>
          </div>
          <div className="h-full flex flex-col gap-y-1">
            {tickets.length === 0 && (
              <div className="w-full h-full flex justify-center items-center text-gray-500 font-semibold text-xl">
                There are currently no tickets
              </div>
            )}
            {tickets
              .filter(filterDup)
              .filter(filterSearch)
              .map((ticket) => {
                if (nested) {
                  if (ticket.id)
                    return (
                      <div
                        className="text-left flex relative items-center rounded-md"
                        key={ticket.id}
                      >
                        <input
                          className="absolute left-5"
                          type="checkbox"
                          onClick={(event) => onClickRow(event, ticket)}
                        />
                        <TicketRow ticket={ticket} key={ticket.id} />
                      </div>
                    );
                } else {
                  return (
                    <Link to={`/tickets/${ticket.id}`} key={ticket.id}>
                      <TicketRow ticket={ticket} />
                    </Link>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
