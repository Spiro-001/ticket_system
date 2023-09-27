export type TicketType = {
  id: string;
  name: string;
  description: string;
  tag: string[];
  status: string;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
};

export type SprintType = {
  id: string;
  name: string;
  tickets: TicketType[];
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export const emptyTicketObject = {
  id: "",
  name: "",
  description: "",
  tag: [],
  status: "",
  priority: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const emptySprintObject = {
  id: "",
  name: "",
  tickets: [emptyTicketObject],
  startDate: new Date(),
  endDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};
