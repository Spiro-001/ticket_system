import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Home";
import Tickets from "./Tickets";
import Sprints from "./Sprints";
import NewForm from "./NewForm";
import Ticket from "./Ticket";
import Sprint from "./Sprint";

const DataProvider = () => {
  const location = useLocation();
  useEffect(() => {
    // on location change
  }, [location]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/sprints" element={<Sprints />} />
        <Route path="/new-ticket" element={<NewForm type="ticket" />} />
        <Route path="/new-sprint" element={<NewForm type="sprint" />} />
        <Route path="/tickets/:ticketId" element={<Ticket />} />
        <Route path="/sprints/:sprintId" element={<Sprint />} />
      </Routes>
    </>
  );
};

export default DataProvider;
