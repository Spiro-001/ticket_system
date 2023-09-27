import { getSprint, getSprints } from "./GetItem";
import { SprintType, TicketType } from "./Types";
import { v4 as uuidv4 } from "uuid";

interface TicketData {
  name: string;
  description: string;
  tag: string[];
  status: string;
  priority: string;
}

interface SprintData {
  name: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

export const createTicket = (data: TicketData) => {
  const { name, description, tag, status, priority } = data;
  const previousTickets = JSON.parse(localStorage.getItem("tickets") ?? "[]");
  const newTicket: TicketType = {
    id: uuidv4(),
    name,
    description,
    tag,
    status,
    priority,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  localStorage.setItem(
    "tickets",
    JSON.stringify([...previousTickets, newTicket])
  );
  return newTicket;
};

export const createSprint = (data: SprintData) => {
  const { name, startDate, endDate, startTime, endTime } = data;
  const previousSprints = JSON.parse(localStorage.getItem("sprints") ?? "[]");
  const newSprint: SprintType = {
    id: uuidv4(),
    name,
    tickets: [],
    startDate: new Date(startDate + " " + startTime),
    endDate: new Date(endDate + " " + endTime),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  localStorage.setItem(
    "sprints",
    JSON.stringify([...previousSprints, newSprint])
  );
  return newSprint;
};

export const patchSprint = (id: string, data: TicketType[]) => {
  const editSprint = getSprint(id);
  editSprint.tickets = [...editSprint.tickets, ...data];
  const allSprints: SprintType[] = getSprints();
  allSprints.forEach((sprint) => {
    if (sprint.id === id) {
      sprint.tickets = editSprint.tickets;
    }
    return sprint;
  });
  localStorage.setItem("sprints", JSON.stringify(allSprints));
  return editSprint;
};
