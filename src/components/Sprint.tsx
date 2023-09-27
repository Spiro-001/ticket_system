import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { data } from "../testData/data";
import { SprintType, TicketType, emptySprintObject } from "../utils/Types";
import { formatTime } from "../utils/FormatTime";
import Tickets from "./Tickets";
import { getSprint, getTickets } from "../utils/GetItem";
import { patchSprint } from "../utils/CreateItem";

const Sprint = () => {
  const { sprintId } = useParams();
  const [sprintData, setSprintData] = useState<SprintType>(emptySprintObject);
  const [selected, setSelected] = useState<TicketType[] | []>([]);
  const [loaded, setLoaded] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    // fetch sprintId data
    const sprintData = getSprint(sprintId ?? "");
    console.log(sprintData);
    setSprintData(sprintData ?? emptySprintObject);
    setLoaded(true);
  }, []);

  const addTicketHandler = () => {
    const handleClick = () => {
      // open add ticket menu
      setOpenMenu(true);
      const dialog: HTMLElement | null = document.getElementById("add-ticket");
      (dialog as HTMLDialogElement).showModal();
    };
    return <button onClick={handleClick}>Add Ticket to Sprint</button>;
  };

  const handleCloseModal = () => {
    // close add ticket menu
    setOpenMenu(false);
    const dialog: HTMLElement | null = document.getElementById("add-ticket");
    (dialog as HTMLDialogElement).close();
  };

  const handleSelectTicket = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>,
    ticket: TicketType
  ) => {
    const checked = event.target.checked;
    if (checked) {
      setSelected((prev) => [...prev, ticket]);
    } else {
      setSelected((prev) => prev.filter((element) => element.id !== ticket.id));
    }
  };

  const handleConfirm = (event: React.MouseEvent) => {
    event.preventDefault();
    // patch sprint ticket data
    const updatedSprint = patchSprint(sprintId ?? "", selected);
    setSprintData(updatedSprint);
    setSelected([]);
    const dialog: HTMLElement | null = document.getElementById("add-ticket");
    (dialog as HTMLDialogElement).close();
  };

  const filterDup = (ticket: TicketType) => {
    if (
      !sprintData.tickets.some((sprintTicket) => sprintTicket.id === ticket.id)
    )
      return ticket;
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      {loaded && (
        <>
          <div className="flex justify-between max-w-[985px] w-full items-center py-4">
            <span className="text-2xl font-semibold bg-orange-300 px-4 py-1 shadow-sm rounded-md">
              {sprintData.name}
            </span>
            <div className="flex flex-col items-end gap-y-2 font-semibold">
              <div className="flex gap-x-2 bg-green-200 w-full justify-end px-3 py-0.5 rounded-md shadow-sm">
                <span>{formatTime(sprintData.startDate).date}</span>
                <span>{formatTime(sprintData.startDate).time}</span>
              </div>
              <div className="flex gap-x-2 bg-red-200 w-full justify-end px-3 py-0.5 rounded-md shadow-sm">
                <span>{formatTime(sprintData.endDate).date}</span>
                <span>{formatTime(sprintData.endDate).time}</span>
              </div>
            </div>
          </div>
          <div>
            <Tickets data={sprintData.tickets} create={addTicketHandler} />
          </div>
          <dialog
            id="add-ticket"
            className="overflow-hidden rounded-md shadow-md backdrop:bg-opacity-30 backdrop:bg-black"
          >
            {openMenu && (
              <>
                <div className="flex flex-col max-h-[600px]">
                  <div className="absolute top-1 right-2 z-50">
                    <button onClick={handleCloseModal} className="">
                      <img src="/close.svg" className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="relative">
                    <Tickets
                      data={getTickets()}
                      nested={true}
                      create={() => <></>}
                      onClickRow={handleSelectTicket}
                      filterDup={filterDup}
                    />
                  </div>
                </div>
                <div className="px-12 flex absolute bottom-2 right-0">
                  <button
                    className="ml-auto px-4 py-1 bg-blue-200 rounded-md font-semibold"
                    onClick={handleConfirm}
                  >
                    Confirm
                  </button>
                </div>
              </>
            )}
          </dialog>
        </>
      )}
    </div>
  );
};

export default Sprint;
