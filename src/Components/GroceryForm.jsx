// import React from "react";
import { useState, useEffect } from "react";

const initialFormData = {
  itemName: "",
  quantity: 1,
  measure: "psc",
  category: "produce",
  complete: false,
};

function GroceryForm({ onSubmit, mode = "add", item = null, onCancel }) {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const value =
      e.target.type === "number" ? Number(e.target.value) : e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: value,
    }));
  };

  const handleItem = (e) => {
    e.preventDefault();

    const itemToSubmit =
      mode === "edit" && item
        ? {
            ...item,
            ...formData,
            id: item.id,
            complete:
              formData.complete ?? item.complete ?? item.completed ?? false,
          }
        : {
            id: crypto.randomUUID(),
            ...formData,
          };

    onSubmit(itemToSubmit);
    setFormData(initialFormData);
  };

  useEffect(() => {
    if (mode === "edit" && item) {
      setFormData({
        itemName: item.itemName,
        quantity: item.quantity,
        measure: item.measure,
        category: item.category,
        complete: item.complete ?? item.completed ?? false,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [mode, item]);

  return (
    <div>
      <form
        onSubmit={handleItem}
        className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5 shadow-sm sm:p-6"
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-slate-800">
              {mode === "edit" ? "Edit Item" : "Add Item"}
            </h3>
            <p className="text-sm text-slate-500">
              {mode === "edit"
                ? "Update the details below and save your changes."
                : "Add a fresh item to your list."}
            </p>
          </div>
          <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
            {mode === "edit" ? "Editing" : "New"}
          </div>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="e.g. Olive oil"
            name="itemName"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
            value={formData.itemName}
            onChange={handleChange}
          />

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              max="10"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 sm:max-w-[120px]"
            />

            <input
              type="text"
              name="measure"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 sm:max-w-[140px]"
              value={formData.measure}
              onChange={handleChange}
              placeholder="pcs"
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
            >
              <option value="Produce">Produce</option>
              <option value="Dairy">Dairy</option>
              <option value="Bakery">Bakery</option>
              <option value="Meat">Meat</option>
              <option value="Frozen">Frozen</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <button
            type="submit"
            className="rounded-xl bg-emerald-600 px-4 py-2.5 font-medium text-white transition hover:bg-emerald-700"
          >
            {mode === "edit" ? "Save Changes" : "Add Item"}
          </button>
          {mode === "edit" ? (
            <button
              type="button"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-medium text-slate-600 transition hover:bg-slate-100"
              onClick={() => onCancel?.()}
            >
              Cancel
            </button>
          ) : (
            <></>
          )}
        </div>
      </form>
    </div>
  );
}

export default GroceryForm;
