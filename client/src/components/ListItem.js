import { CheckCircleIcon } from '@heroicons/react/24/outline'
import UrgencyBar from "./UrgencyBar";
import { deleteData } from '../services/tasksApi';

function ListItem({ task, fetchTasks, openModal }) {

  const deleteTask = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");

    if (confirmDelete) {
      try {
        await deleteData(id).then((res) => {
          fetchTasks();
        });
      } catch (err) {
        console.log(err)
      }
    }
  };

  const urgencyFlag = (urgency) => {
    switch (urgency) {
      case 1:
        return (
          <div className={`flex-none rounded-full bg-emerald-500/20 p-1`}>
            <div className={`h-1.5 w-1.5 rounded-full bg-emerald-500`}></div>
          </div>
        );
      case 2:
        return (
          <div className={`flex-none rounded-full bg-yellow-500/20 p-1`}>
            <div className={`h-1.5 w-1.5 rounded-full bg-yellow-500`}></div>
          </div>
        );
      case 3:
        return (
          <div className={`flex-none rounded-full bg-red-500/20 p-1`}>
            <div className={`h-1.5 w-1.5 rounded-full bg-red-500`}></div>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <>
      <li className="flex justify-between gap-x-6 py-5">
        <div className="flex gap-x-4">
          {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" /> */}
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">{task.title}</p>
            {/* <p className="mt-1 truncate text-xs leading-5 text-gray-500">dries.vincent@example.com</p> */}
          </div>
        </div>
        <div className="hidden sm:flex sm:flex-col sm:items-end">
          {/* <p className="text-sm leading-6 text-gray-900">Priority</p> */}
          <div className="mt-1 flex items-center gap-x-1.5">
            {urgencyFlag(task.urgency)}
            {/* <p className="text-xs leading-5 text-gray-500">Online</p> */}
          </div>
        </div>
      </li>
      {/* <div className="list-item">
        <div className="info-container">
          <CheckCircleIcon className="icon" />
          <p className="task-title">{task.title}</p>
          <UrgencyBar urgency={task.urgency} />
        </div>
        <div className="button-container">
          <button className='edit' onClick={() => openModal(task)}>Edit</button>
          <button className='delete' onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      </div> */}
    </>
  );
}

export default ListItem;
