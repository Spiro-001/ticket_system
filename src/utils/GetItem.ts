import {
  SprintType,
  TicketType,
  emptySprintObject,
  emptyTicketObject,
} from "./Types";

export const getTicket = (id: string) => {
  const allTickets = JSON.parse(localStorage.getItem("tickets") ?? "[]");
  const foundTicket = (allTickets as Array<TicketType>).find(
    (ticket) => ticket.id === id
  );
  if (foundTicket) return foundTicket;
  else return emptyTicketObject;
};

export const getTickets = () => {
  const allTickets = JSON.parse(localStorage.getItem("tickets") ?? "[]");
  return allTickets;
};

export const getSprint = (id: string) => {
  const allSprints = JSON.parse(localStorage.getItem("sprints") ?? "[]");
  const foundSprint = (allSprints as Array<SprintType>).find(
    (sprint) => sprint.id === id
  );
  if (foundSprint) return foundSprint;
  else return emptySprintObject;
};

export const getSprints = () => {
  const allSprints = JSON.parse(localStorage.getItem("sprints") ?? "[]");
  return allSprints;
};
