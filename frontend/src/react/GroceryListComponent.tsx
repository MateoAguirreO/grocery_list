import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

type Item = {
  _id: string;
  name: string;
  tagged: boolean;
};

export function GroceryListComponent() {
  const { getToken } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState("");

  const API_URL = "http://localhost:3000/api/items";

  const fetchItems = async () => {
    const token = await getToken();
    const res = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async () => {
    if (!newItem.trim()) return;
    const token = await getToken();
    await axios.post(
      API_URL,
      { name: newItem },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setNewItem("");
    fetchItems();
  };

  const toggleTag = async (id: string, tagged: boolean) => {
    const token = await getToken();
    await axios.patch(
      `${API_URL}/${id}/${tagged ? "untag" : "tag"}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchItems();
  };

  const removeItem = async (id: string) => {
    const token = await getToken();
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchItems();
  };

  return (
    <div className="space-y-4 font-sans">
      <h2 className="text-3xl font-bold mb-2">Your Grocery List</h2>
      <div className="flex gap-2">
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="px-2 py-2 rounded bg-gray-200 text-black text-lg"
          placeholder="Add new item"
        />
        <button onClick={addItem} className="bg-green-600 text-white px-4 py-2 rounded text-lg font-semibold">
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item._id} className="flex justify-between items-center bg-gray-700 p-3 rounded">
            <span className={item.tagged ? "line-through text-lg px-2" : "text-lg font-medium px-2"}>{item.name}</span>
            <div className="flex gap-2">
              <button
                onClick={() => toggleTag(item._id, item.tagged)}
                className="bg-blue-500 px-3 py-2 rounded text-white text-lg font-semibold"
              >
                {item.tagged ? "✖️" : "✔️"}
              </button>
              <button
                onClick={() => removeItem(item._id)}
                className="bg-red-600 px-3 py-2 rounded text-white text-lg font-semibold"
              >
                🗑️ Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
