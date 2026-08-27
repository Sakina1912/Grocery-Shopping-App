// import React from 'react'
// import { useState } from "react";

export const FilterForm = ({
  handleFilter,
  sortBy,
  setSortBy,
  // setClearCompleted,
  handleClearCompleted,
}) => {
  //   const [sortBy, setSortBy] = useState("Recent");
  return (
    <div>
      <form className="flex flex-wrap items-center justify-between gap-3 rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-full bg-emerald-50 px-3 py-2 font-medium text-emerald-700"
            onClick={() => handleFilter("All")}
          >
            All
          </button>
          <button
            type="button"
            className="rounded-full bg-emerald-50 px-3 py-2 font-medium text-emerald-700"
            onClick={() => handleFilter("Active")}
          >
            Active
          </button>
          <button
            type="button"
            className="rounded-full bg-emerald-50 px-3 py-2 font-medium text-emerald-700"
            onClick={() => handleFilter("Completed")}
          >
            Completed
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            name="filer"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
          >
            <option value="Recent">Recent</option>
            <option value="Name">Name</option>
          </select>
          <button
            type="button"
            className="rounded-full bg-rose-50 px-3 py-2 font-medium text-rose-700"
            onClick={handleClearCompleted}
          >
            Clear Completed
          </button>
        </div>
      </form>
    </div>
  );
};
