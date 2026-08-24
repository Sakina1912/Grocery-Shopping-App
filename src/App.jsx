import { useEffect, useState } from "react";
import "./App.css";
import { HiShoppingCart } from "react-icons/hi2";
import GroceryForm from "./Components/GroceryForm";
import { itemList } from "./Data/itemList";
import ItemsTiles from "./Components/ItemsTiles";
import { FilterForm } from "./Components/FilterForm";

function App() {
  // const [item, setCount] = useState(0);
  const [groceryList, setgroceryList] = useState(() => {
    const savedList = localStorage.getItem("GroceryList");
    if (savedList) {
      try {
        const parsedList = JSON.parse(savedList);
        if (Array.isArray(parsedList)) {
          return parsedList;
        }
      } catch (error) {
        console.log("Failed to parse the list", error);
      }
    }
    return itemList;
  });

  const addItem = (newItem) => {
    setgroceryList((prevData) => [newItem, ...prevData]);
  };

  const handleDelete = (itemId) => {
    setgroceryList((prevData) => prevData.filter((item) => item.id !== itemId));
  };
  const handleEdit = (updateItem) => {
    setgroceryList((prevData) =>
      prevData.map((item) => (item.id === updateItem.id ? updateItem : item)),
    );
  };
  const handleToggleComplete = (itemId) => {
    setgroceryList((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const remainingItems = groceryList.filter((item) => !item.completed).length;

  const handleFilter = (filter) => {
    if (filter === "Active") {
      setgroceryList((prevData) => prevData.filter((item) => !item.completed));
    } else if (filter === "Completed") {
      setgroceryList((prevData) => prevData.filter((item) => item.completed));
    } else {
      setgroceryList(itemList);
    }
  };

  const [sortBy, setSortBy] = useState("Recent");
  const [clearCompleted, setClearCompleted] = useState(false);

  const sortedList = [...groceryList];

  if (sortBy === "Name") {
    sortedList.sort((a, b) => a.itemName.localeCompare(b.itemName));
  }

  if (clearCompleted) {
    setgroceryList((prevData) => prevData.filter((item) => !item.completed));
    setClearCompleted(false);
  }

  useEffect(() => {
    localStorage.setItem("GroceryList", JSON.stringify(groceryList));
  }, [groceryList]);

  // console.log(GroceryList, "from local storage");

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fef3c7,_#ffffff_55%,_#ecfdf5)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 shadow-[0_25px_80px_-25px_rgba(15,23,42,0.35)] backdrop-blur">
        <nav className="border-b border-slate-100 px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
                <HiShoppingCart className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-slate-800 sm:text-3xl">
                  Grocery List
                </h1>
                <p className="text-sm text-slate-500">
                  Keep your kitchen plan tidy and easy to update.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-sm text-slate-600">
              <div className="rounded-full bg-amber-50 px-3 py-2 font-medium text-amber-700">
                {remainingItems} remaining
              </div>
              <div className="rounded-full bg-emerald-50 px-3 py-2 font-medium text-emerald-700">
                {groceryList.length - remainingItems} bought
              </div>
            </div>
          </div>
        </nav>

        <div className="space-y-6 px-6 py-6 sm:px-8 sm:py-8">
          <GroceryForm onSubmit={addItem} mode="add" />
          <FilterForm
            handleFilter={handleFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            setClearCompleted={setClearCompleted}
          />
          <ItemsTiles
            groceryList={sortedList}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleToggleComplete={handleToggleComplete}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
