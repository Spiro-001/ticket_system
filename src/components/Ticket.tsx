import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TicketType, emptyTicketObject } from "../utils/Types";
import { data } from "../testData/data";
import TicketCard from "./TicketCard";
import { getTicket } from "../utils/GetItem";

const Ticket = () => {
  const { ticketId } = useParams();
  const [ticketData, setTicketData] = useState<TicketType>(emptyTicketObject);

  useEffect(() => {
    const ticketData = getTicket(ticketId ?? "");
    console.log(ticketData);
    setTicketData(ticketData);
  }, []);
  return (
    <div className="w-full h-full px-24 py-14">
      <TicketCard ticket={ticketData} />
    </div>
  );
};

export default Ticket;
