import React, { useState, useEffect } from "react";
import './App.css';
import axios from "axios";

const apiUrl = "https://testbackenddeploy.onrender.com"; // Update with your deployed backend URL

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [updateItem, setUpdateItem] = useState("");
  const [deleteItem, setDeleteItem] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${apiUrl}`);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post(`${apiUrl}/`, { name: newItem });
      setNewItem("");
      fetchItems();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${apiUrl}/`, { name: updateItem });
      setUpdateItem("");
      fetchItems();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/`, { data: { name: deleteItem } });
      setDeleteItem("");
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="main-div">
      <h1>CRUD Operations</h1>
      <div className="add-div">
        <h2>Add Item</h2>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <div className="update-div">
        <h2>Update Item</h2>
        <input
          type="text"
          value={updateItem}
          onChange={(e) => setUpdateItem(e.target.value)}
        />
        <button onClick={handleUpdate}>Update</button>
      </div>
      <div className="delete-div">
        <h2>Delete Item</h2>
        <input
          type="text"
          value={deleteItem}
          onChange={(e) => setDeleteItem(e.target.value)}
        />
        <button onClick={handleDelete}>Delete</button>
      </div>
      <div className="get-div">
        <h2>Items List</h2>
        <ul>
          {items.map((item) => (
            <li key={item._id}>{item.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
