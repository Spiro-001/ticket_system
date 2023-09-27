import { defaultData } from "../testData/fillData";
import { v4 as uuidv4 } from "uuid";
import { SprintType, TicketType } from "./Types";
import { faker } from "@faker-js/faker";

export const clearLocalStorage = () => {
  localStorage.clear();

  alert("Storage Cleared!");
  window.location.reload();
  console.log("Storage Cleared");
};

export const resetLocalStorage = () => {
  localStorage.setItem("tickets", JSON.stringify(defaultData.tickets));
  localStorage.setItem("sprints", JSON.stringify(defaultData.sprints));
  alert("Storage Reset!");
  window.location.reload();
  console.log("Storage Reset!");
};

export const fillLocalStorage = () => {
  const tickets = generateTickets(99, 50);
  const sprints = generateSprints(99, 10, tickets);
  localStorage.setItem("tickets", JSON.stringify(tickets));
  localStorage.setItem("sprints", JSON.stringify(sprints));
  alert("Storage Filled!");
  window.location.reload();
  console.log("Storage Filled!");
};

const generateTickets = (max: number, min: number) => {
  const tickets: TicketType[] = [];
  for (let x = 0; x < Math.floor(Math.random() * max) + min; x++) {
    const ticket: TicketType = {
      id: uuidv4(),
      name: faker.lorem.sentence({ min: 3, max: 8 }),
      description: faker.lorem.paragraph({ min: 2, max: 5 }),
      tag: [
        faker.color.human(),
        faker.company.name(),
        faker.number.int({ min: 1, max: 500 }).toString(),
      ],
      status: ["new", "closed"][Math.round(Math.random())],
      priority: ["normal", "important"][Math.round(Math.random())],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    tickets.push(ticket);
  }
  return tickets;
};

const generateSprints = (max: number, min: number, tickets: TicketType[]) => {
  const sprints: SprintType[] = [];
  const animal = [faker.animal.bear, faker.animal.dog, faker.animal.rabbit];
  for (let x = 0; x < Math.floor(Math.random() * max) + min; x++) {
    const sprint: SprintType = {
      id: uuidv4(),
      name: animal[Math.floor(Math.random() * 2)](),
      tickets: tickets.slice(
        Math.floor(Math.random()),
        Math.floor(Math.random() * (tickets.length - 1))
      ),
      startDate: faker.date.between({
        from: "2023-09-01T00:00.00Z",
        to: "2023-09-05T00:00.00Z",
      }),
      endDate: faker.date.between({
        from: "2023-09-06T00:00.00Z",
        to: "2023-09-09T00:00.00Z",
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    sprints.push(sprint);
  }
  return sprints;
};
