import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Item = {
  id: string;
  name: string;
  tagged: boolean;
};

export function GroceryListComponent() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    axios.get('/api/items').then(res => setItems(res.data));
  }, []);

  const addItem = async () => {
    if (!newItem.trim()) return;
    await axios.post('/api/items', { name: newItem });
    setNewItem('');
    const res = await axios.get('/api/items');
    setItems(res.data);
  };

  const toggleTag = async (id: string, tagged: boolean) => {
    await axios.patch(`/api/items/${id}`, { tagged: !tagged });
    const res = await axios.get('/api/items');
    setItems(res.data);
  };

  const removeItem = async (id: string) => {
    await axios.delete(`/api/items/${id}`);
    const res = await axios.get('/api/items');
    setItems(res.data);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Your Grocery List</h2>

      <div className="flex gap-2">
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="px-2 py-1 rounded bg-gray-200 text-black"
          placeholder="Add new item"
        />
        <button onClick={addItem} className="bg-green-600 text-white px-3 py-1 rounded">
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {items.map(item => (
          <li key={item.id} className="flex justify-between items-center bg-gray-700 p-2 rounded">
            <span className={item.tagged ? 'line-through' : ''}>{item.name}</span>
            <div className="flex gap-2">
              <button
                onClick={() => toggleTag(item.id, item.tagged)}
                className="bg-yellow-500 px-2 py-1 rounded"
              >
                {item.tagged ? 'Un-Tag' : 'Tag'}
              </button>
              <button
                onClick={() => removeItem(item.id)}
                className="bg-red-600 px-2 py-1 rounded text-white"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
