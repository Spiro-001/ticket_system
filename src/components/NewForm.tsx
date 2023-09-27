import React, { useState } from "react";
import { createSprint, createTicket } from "../utils/CreateItem";
import { getTickets } from "../utils/GetItem";
import { useNavigate } from "react-router-dom";

interface NewFormProp {
  type: "ticket" | "sprint";
}

interface ErrorsType {
  name: string | null;
  description: string | null;
}

const NewForm = ({ type }: NewFormProp) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<ErrorsType>({
    name: null,
    description: null,
  });
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({
      name: null,
      description: null,
    });
    const formData = new FormData(event.target as HTMLFormElement);
    const name = formData.get("name") as string;
    if (type === "ticket") {
      const description = formData.get("description") as string;
      const tag = (formData.get("tag") as string).split(", ");
      const status = (formData.get("status") as string).toLowerCase();
      const priority = (formData.get("priority") as string).toLowerCase();
      if (name.length < 5) {
        setErrors((prev) => ({
          ...prev,
          name: "Subject must be longer than 5 characters.",
        }));
      }
      if (description.length < 30) {
        setErrors((prev) => ({
          ...prev,
          description: "Description must be longer than 30 characters.",
        }));
      } else {
        const newTicket = createTicket({
          name,
          description,
          tag,
          status,
          priority,
        });
        navigate(`/tickets/${newTicket.id}`);
      }
    } else if (type === "sprint") {
      const startDate = formData.get("startDate") as string;
      const endDate = formData.get("endDate") as string;
      const startTime = formData.get("startTime") as string;
      const endTime = formData.get("endTime") as string;
      if (name.length < 5) {
        setErrors((prev) => ({
          ...prev,
          name: "Subject must be longer than 5 characters.",
        }));
      }
      if (
        startDate.length < 1 ||
        endDate.length < 1 ||
        startTime.length < 1 ||
        endTime.length < 1
      ) {
        setErrors((prev) => ({
          ...prev,
          time: "Please enter a valid time.",
        }));
      } else {
        const newSprint = createSprint({
          name,
          startDate,
          endDate,
          startTime,
          endTime,
        });
        navigate(`/sprints/${newSprint.id}`);
      }
    }
  };

  return (
    <div className="w-full h-full flex justify-center absolute top-0 right-0 px-12">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col px-6 py-4 bg-gray-200 gap-y-4 my-auto font-semibold w-full max-w-[1280px] min-h-[680px] rounded-md shadow-md"
      >
        <h1 className="capitalize text-2xl bg-blue-200 w-fit px-4 py-1 rounded-md shadow-sm">
          Create {type}
        </h1>
        {errors.name && <span className="text-red-500">{errors.name}</span>}
        <input
          name="name"
          type="text"
          placeholder="Subject"
          className="px-4 py-2 rounded-md shadow-sm"
        />
        {type === "ticket" && (
          <>
            {errors.description && (
              <span className="text-red-500">{errors.description}</span>
            )}
            <textarea
              name="description"
              className="px-4 py-2 min-h-[340px] rounded-md resize-none shadow-sm"
              placeholder="Description"
            />
            <input
              name="tag"
              type="text"
              className="px-4 py-2 rounded-md shadow-sm"
              placeholder="Tags (ex: Network, 500)"
            />
            <div className="flex gap-x-4 flex-wrap">
              <select
                name="status"
                className="px-4 py-2 w-fit rounded-md shadow-sm"
              >
                <option>New</option>
                <option>Closed</option>
              </select>
              <select
                name="priority"
                className="px-4 py-2 w-fit rounded-md shadow-sm"
              >
                <option>Normal</option>
                <option>Important</option>
              </select>
            </div>
          </>
        )}
        {type === "sprint" && (
          <>
            {errors.time && <span className="text-red-500">{errors.time}</span>}
            <div className="flex gap-x-4 flex-wrap">
              <input
                name="startDate"
                className="px-4 py-2 w-fit rounded-md shadow-sm"
                type="date"
              />
              <input
                name="endDate"
                className="px-4 py-2 w-fit rounded-md shadow-sm"
                type="date"
              />
              <input
                name="startTime"
                className="px-4 py-2 w-fit rounded-md shadow-sm"
                type="time"
              />
              <input
                name="endTime"
                className="px-4 py-2 w-fit rounded-md shadow-sm"
                type="time"
              />
            </div>
          </>
        )}
        <button
          type="submit"
          className="ml-auto px-3 py-1 bg-gray-300 rounded-md mt-auto shadow-sm"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewForm;
