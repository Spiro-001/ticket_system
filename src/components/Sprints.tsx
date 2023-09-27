import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SprintType } from "../utils/Types";
import { getSprints } from "../utils/GetItem";
import { formatTime } from "../utils/FormatTime";

const Sprints = () => {
  const [sprints, setSprints] = useState<SprintType[]>(getSprints());
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const handleInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value);
  };

  const filterSearch = (sprint: SprintType) => {
    return sprint.name.toLowerCase().includes(search.toLowerCase());
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="relative bg-gray-100 flex flex-col items-center py-12 px-8 rounded-md shadow-md">
        <div className="w-full py-4 flex flex-col gap-y-4">
          <div className="w-full flex justify-between items-center">
            <div className="bg-stone-200 px-3 py-1 rounded-md shadow-sm font-semibold text-lg">
              <Link to="/new-sprint">Create Sprint</Link>
            </div>
            <input
              value={search}
              onChange={handleInput}
              className="px-3 py-1 rounded-md shadow-sm"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="flex flex-col w-fit min-h-[375px] max-h-[375px] h-full overflow-y-scroll relative border rounded-md bg-zinc-200">
          <div className="flex px-14 py-3 sticky top-0 bg-blue-50 font-semibold">
            <span className="w-full min-w-[350px] max-w-[350px]">Title</span>
            <span className="w-full min-w-[120px] max-w-[120px]">
              Start Date
            </span>
            <span className="w-full min-w-[120px] max-w-[120px]">End Date</span>
            <span className="w-full min-w-[120px] max-w-[120px]">Tickets</span>
          </div>

          <div className="h-full">
            {sprints.length === 0 && (
              <div className="w-full h-full flex justify-center items-center text-gray-500 font-semibold text-xl">
                There are currently no sprints
              </div>
            )}
            {sprints.filter(filterSearch).map((sprint) => (
              <Link to={`/sprints/${sprint.id}`} key={sprint.id}>
                <div className="flex border-b border-gray-100 px-14 py-2 items-center">
                  <span className="whitespace-nowrap w-full max-w-[350px]">
                    {sprint.name}
                  </span>
                  <div className="flex flex-col w-full max-w-[120px]">
                    <span>{formatTime(sprint.startDate).date}</span>
                    <span>{formatTime(sprint.startDate).time}</span>
                  </div>
                  <div className="flex flex-col w-full max-w-[120px]">
                    <span>{formatTime(sprint.endDate).date}</span>
                    <span>{formatTime(sprint.endDate).time}</span>
                  </div>
                  <div className="flex flex-col w-full max-w-[120px]">
                    <span>{sprint.tickets.length}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sprints;
