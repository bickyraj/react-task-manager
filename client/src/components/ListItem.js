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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 text-green-600">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>

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
            <button className="edit inline-flex items-center rounded-md ml-1  py-1 text-xs font-semibold text-cyan-600 shadow-sm hover:text-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600" onClick={() => openModal(task)}>Edit</button>
            <button className="delete inline-flex items-center rounded-md px-3 py-1 text-xs font-semibold text-red-600 shadow-sm hover:text-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600" onClick={() => deleteTask(task.id)}>Delete</button>
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
