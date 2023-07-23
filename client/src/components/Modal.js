import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.ts";

import { postData, updateData } from "../services/tasksApi";

function Modal({ setIsModalOpen, mode, task, fetchTasks }) {
  const { user } = useContext(AuthContext);
  const isEdit = mode === "edit";
  
  const [data, setData] = useState({
    user_email: isEdit ? task.user_email : user.userEmail,
    title: isEdit ? task.title : '',
    description: isEdit ? task.description : '',
    urgency: isEdit ? task.urgency : 1,
    date: isEdit ? task.date : new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addTask = async (e) => {
    e.preventDefault();

    try {
      await postData(data).then((res) => {
        setIsModalOpen(false)
        fetchTasks();
      })
    } catch (err) {
      console.log(err)
    }
  };

  const editTask = async (e) => {
    e.preventDefault();

    try {
      await updateData(task.id, data).then((res) => {
        setIsModalOpen(false)
        fetchTasks();
      });
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="overlay">
      <div
        className="relative transform overflow-hidden rounded-lg bg-gray text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div
              className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 text-blue-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
              </svg>

            </div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
              <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">{isEdit ? "Edit Task" : "Add New Task"}</h3>
              <div className="mt-2 w-full">
                  <div className="mb-2">
                    <label for="title" class="block text-sm font-medium leading-6 text-gray-600">Title</label>
                    <div class="mt-2">
                      <input id="title" name="title" value={data.title} onChange={handleChange} type="text" autocomplete="email" placeholder="Please enter your task title" required class="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"/>
                    </div>
                  </div>

                <div className="mb-2">
                  <label for="title" class="block text-sm font-medium leading-6 text-gray-600">Description</label>
                  <div class="mt-2">
                    <textarea id="title" rows={5} name="description" value={data.description} onChange={handleChange} type="text" autocomplete="no" placeholder="" required class="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"></textarea>
                  </div>
                </div>

                  <div>
                    <label for="urgency" class="block text-sm font-medium leading-6 text-gray-600">Urgency</label>
                    <div class="mt-2">
                      <input
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        required
                        name="urgency"
                        id="urgency"
                        type="range"
                        min="1"
                        max="3"
                        value={data.urgency}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                {/* <p className="text-sm text-gray-500">Are you sure you want to deactivate your account? All of your data will be
                  permanently removed. This action cannot be undone.</p> */}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button type="submit"
            onClick={isEdit ? editTask : addTask}
            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">{isEdit ? "Save Task" : "Add Task"}</button>
          <button type="button"
            onClick={() => setIsModalOpen(false)}
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
