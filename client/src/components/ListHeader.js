import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.ts";

import Modal from "./Modal";
import { useAuth } from "../hooks/useAuth.ts";
import { Link } from "react-router-dom";

function ListHeader({ fetchTasks }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  }

  return (
    <div className="list-header">
      <h3>{user.userEmail}'s Tasks</h3>
      <div className="button-container">
        <button className="add" onClick={() => setIsModalOpen(true)}>Add New task</button>
        <button className="logout" onClick={() => handleLogout()}>Logout</button>
      </div>
      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} mode={"create"} fetchTasks={fetchTasks}/>}
    </div>
  );
}

export default ListHeader;
