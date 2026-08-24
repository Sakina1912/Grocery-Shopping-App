// import React from "react";
import { GiMilkCarton } from "react-icons/gi";
import { IoIosClose } from "react-icons/io";
import { MdEdit } from "react-icons/md";

import { useState } from "react";
import GroceryForm from "./GroceryForm";
import { MdBakeryDining } from "react-icons/md";
import { TbMeat } from "react-icons/tb";
import { GiFrozenOrb } from "react-icons/gi";
import { HiArchiveBox } from "react-icons/hi2";
import { FaCarrot } from "react-icons/fa";

export default function itemsTiles({
  groceryList,
  handleDelete,
  handleEdit,
  handleToggleComplete,
}) {
  const [edit, setEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const startEdit = (item) => {
    setSelectedItem(item);
    setEdit(true);
  };

  const cancelEdit = () => {
    setEdit(false);
    setSelectedItem(null);
  };

  const saveEdit = (updatedItem) => {
    handleEdit(updatedItem);
    cancelEdit();
  };

  return (
    <div className="space-y-3">
      {groceryList.map((item) => (
        <div
          className="group flex flex-wrap items-center justify-between gap-3 rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
          key={item.id}
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              checked={item.completed}
              onChange={() => handleToggleComplete(item.id)}
            />
            <div className="rounded-2xl bg-amber-100 p-2 text-amber-700">
              {/* <GiMilkCarton className="h-5 w-5" />
              <MdBakeryDining /> */}
              {item.category === "Dairy" ? (
                <GiMilkCarton className="h-5 w-5" />
              ) : item.category === "Bakery" ? (
                <MdBakeryDining className="h-5 w-5" />
              ) : item.category === "Meat" ? (
                <TbMeat className="h-5 w-5" />
              ) : item.category === "Frozen" ? (
                <GiFrozenOrb className="h-5 w-5" />
              ) : item.category === "Other" ? (
                <HiArchiveBox className="h-5 w-5" />
              ) : item.category === "produce" ? (
                <FaCarrot className="h-5 w-5" />
              ) : null}
            </div>
            <div>
              <p
                className={`font-medium ${
                  item.completed
                    ? "line-through text-slate-500"
                    : "text-slate-800"
                }`}
              >
                {item.itemName}
              </p>
              <p className="text-sm text-slate-500">{item.category}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
              {item.quantity}
            </div>
            <button
              type="button"
              className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              onClick={() => startEdit(item)}
              aria-label="Edit item"
            >
              <MdEdit className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="rounded-full p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
              onClick={() => handleDelete(item.id)}
              aria-label="Delete item"
            >
              <IoIosClose className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}

      {edit && selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4"
          onClick={cancelEdit}
        >
          <div
            className="w-full max-w-xl rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-2xl sm:p-6"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Edit grocery item"
          >
            <GroceryForm
              mode="edit"
              item={selectedItem}
              onSubmit={saveEdit}
              onCancel={cancelEdit}
            />
          </div>
        </div>
      )}
    </div>
  );
}
