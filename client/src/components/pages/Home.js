import { useContext, useEffect, useState } from "react";
import Auth from "../Auth";
import ListHeader from "../ListHeader";
import ListItem from "../ListItem";
import Modal from "../Modal";
import { getData } from "../../services/tasksApi";
import { AuthContext } from "../../context/AuthContext";

function Home() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
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
      <div className="mt-5 flex lg:mt-0">
        <span className="hidden sm:block">
          <button type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="-ml-0.5 mr-1.5 h-5 w-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
            </svg>
            New Task
          </button>
        </span>
      </div>
      <div
        className="relative transform overflow-hidden rounded-lg bg-gray text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div className="bg-white px-2 pb-2 pt-2 sm:p-6 sm:pb-4">
          <ul className="divide-y divide-gray-100">
            {sortedTasks.map((task) => (
              <ListItem
                task={task}
                key={task.id}
                fetchTasks={fetchTasks}
                openModal={openModal}
              />
            ))}
          </ul>
        </div>
      </div>
      {isCreateModalOpen && <Modal setIsModalOpen={setIsCreateModalOpen} mode={"create"} fetchTasks={fetchTasks} />}
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          mode={"edit"}
          task={selectedTask}
          fetchTasks={fetchTasks}
        />
      )}
    </>
  );
}

export default Home;