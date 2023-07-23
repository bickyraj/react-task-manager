import { useContext, useEffect, useState } from "react";
import Auth from "../Auth";
import ListHeader from "../ListHeader";
import ListItem from "../ListItem";
import Modal from "../Modal";
import { getData } from "../../services/tasksApi";
import { AuthContext } from "../../context/AuthContext";
import Layout from "../Layout";

function Home() {
  const {user} = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const openModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const fetchTasks = async () => {
    await getData(user.userEmail).then((res) => {
      setTasks(res);
    });
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  });

  const sortedTasks = tasks.sort((a, b) => {
    return b.urgency - a.urgency;
  });
  
  return (
    <>
    <Layout>
      {!user ? (
        <Auth />
      ) : (
        <div className="default-view">
          <ListHeader fetchTasks={fetchTasks} />
          <div className="list-container">
            {sortedTasks.map((task) => (
              <ListItem
                task={task}
                key={task.id}
                fetchTasks={fetchTasks}
                openModal={openModal}
              />
            ))}
          </div>
          {isModalOpen && (
            <Modal
              setIsModalOpen={setIsModalOpen}
              mode={"edit"}
              task={selectedTask}
              fetchTasks={fetchTasks}
            />
          )}
        </div>
      )}
    </Layout>
    </>
  );
}

export default Home;