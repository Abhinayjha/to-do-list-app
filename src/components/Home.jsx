import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Swal from "sweetalert2";

export const Home = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [taskInput, setTaskInput] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [completeList, setCompleteList] = useState([]);

  const [habitTaskInput, setHabitTaskInput] = useState("");
  const [habitTaskList, setHabitTaskList] = useState([]);
  const [habitCompleteList, setHabitCompleteList] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const proper = {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleString("en-US", proper);
  };

  const formatTime = (data) => {
    const proper = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };

    return data.toLocaleString("en-US", proper);
  };

  const handleAddTask = () => {
    if (taskInput.trim() === "") return;

    setTaskList([
      ...taskList,
      { id: Date.now(), name: taskInput, completed: false },
    ]);
    setTaskInput("");

    Swal.fire({
      title: "Success!",
      text: "A new task is added to a task list.",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const handleToggleComplete = (id) => {
    const taskToComplete = taskList.find((task) => task.id === id);
    if (!taskToComplete) return;

    const updateList = { ...taskToComplete, completed: true };

    setTaskList(taskList.filter((task) => task.id !== id));
    setCompleteList([...completeList, updateList]);

    Swal.fire({
      title: "Success!",
      text: "A task is completed from the task list.",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const handleDeleteTask = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete a task from the task list.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false,
    }).then((result) => {
      if (result.isConfirmed) {
        setTaskList(taskList.filter((task) => task.id !== id));
      }
    });
  };

  // habit

  const handleHabitAddTask = () => {
    if (habitTaskInput.trim() === "") return;

    setHabitTaskList([
      ...habitTaskList,
      { id: Date.now(), name: habitTaskInput, completed: false },
    ]);
    setHabitTaskInput("");

    Swal.fire({
      title: "Success!",
      text: "A new habit is added to a habit list.",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const handleHabitToggleComplete = (id) => {
    const taskToComplete = habitTaskList.find((task) => task.id === id);
    if (!taskToComplete) return;

    const updateList = { ...taskToComplete, completed: true };

    setHabitTaskList(habitTaskList.filter((task) => task.id !== id));
    setHabitCompleteList([...habitCompleteList, updateList]);

    Swal.fire({
      title: "Success!",
      text: "A habit task is completed from the habit list.",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const handleHabitDeleteTask = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete a habit from the habit list.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false,
    }).then((result) => {
      if (result.isConfirmed) {
        setHabitTaskList(habitTaskList.filter((task) => task.id !== id));
      }
    });
  };

  return (
    <div className={`${styles.colMd5} ${styles.bodyBox}`}>
      <div className={styles.bodyTopTime}>
        <div className={styles.boxTime}>{formatTime(currentDateTime)}</div>
        <div className={styles.boxDate}>{formatDate(currentDateTime)}</div>
      </div>

      {/* Add To do list code start here  */}

      <div className={styles.bodyInsidetitle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22px"
          height="22px"
          viewBox="0 0 512 512"
        >
          <path
            fill="black"
            d="M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48m-6 400H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v340a6 6 0 0 1-6 6m-42-92v24c0 6.627-5.373 12-12 12H204c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h200c6.627 0 12 5.373 12 12m0-96v24c0 6.627-5.373 12-12 12H204c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h200c6.627 0 12 5.373 12 12m0-96v24c0 6.627-5.373 12-12 12H204c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h200c6.627 0 12 5.373 12 12m-252 12c0 19.882-16.118 36-36 36s-36-16.118-36-36s16.118-36 36-36s36 16.118 36 36m0 96c0 19.882-16.118 36-36 36s-36-16.118-36-36s16.118-36 36-36s36 16.118 36 36m0 96c0 19.882-16.118 36-36 36s-36-16.118-36-36s16.118-36 36-36s36 16.118 36 36"
          />
        </svg>
        <h3 className={styles.bodySubtitle}>To-Do-List App</h3>
      </div>

      <div className={styles.searchBox}>
        <input
          type="text"
          name="addList"
          placeholder="Add your task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={(e) => e.key == "Enter" && handleAddTask()}
          className={`form-control ${styles.addButton}`}
        />
        <span className={styles.plusIconButton} onClick={handleAddTask}>
          ADD
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15px"
            height="15px"
            viewBox="0 0 24 24"
            stroke="white"
            strokeWidth="1"
          >
            <path
              fill="white"
              d="M11.5 12.5H6v-1h5.5V6h1v5.5H18v1h-5.5V18h-1z"
            />
          </svg>
        </span>
      </div>

      <div className={styles.taskList}>
        <ul className={styles.taskCheckBoxList}>
          {taskList.map((task) => (
            <li key={task.id} className={styles.taskListName}>
              <div className={styles.taskListTitle}>
                <input
                  type="checkbox"
                  name="taskcheck"
                  checked={task.completed}
                  id=""
                  onChange={() => handleToggleComplete(task.id)}
                  className={styles.taskCheckBox}
                />
                {task.name}
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                height="18px"
                viewBox="0 0 24 24"
                onClick={() => handleDeleteTask(task.id)}
                style={{ cursor: "pointer" }}
              >
                <path
                  fill="black"
                  d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1zM6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7zm12-1V5h-4l-1-1h-3L9 5H5v1zM8 9h1v10H8zm6 0h1v10h-1z"
                />
              </svg>
            </li>
          ))}
        </ul>
      </div>

      {/* Add To do list code end here  */}

      {/* Complete task code start here  */}

      <hr />

      <div className={styles.taskList1}>
        <label htmlFor="" className={styles.completeTitle}>
          Completed
        </label>

        <ul className={styles.taskCheckBoxList1}>
          {Array.isArray(completeList) &&
            completeList.map((task, index) => (
              <li className={styles.taskListName1} key={index}>
                <div className={styles.taskListTitle1}>
                  <input
                    type="checkbox"
                    name="taskcheck"
                    id=""
                    className={styles.taskCheckBox}
                    disabled
                    checked
                  />
                  {task.name}
                </div>
              </li>
            ))}

          {/* <li className={styles.taskListName1}>
            <div className={styles.taskListTitle1}>
              <input
                type="checkbox"
                name="taskcheck"
                id=""
                className={styles.taskCheckBox}
                disabled
                checked
                value="1"
              />
              Learn React Js and Tailwind CSS
            </div>
          </li>

          <li className={styles.taskListName1}>
            <div className={styles.taskListTitle1}>
              <input
                type="checkbox"
                name="taskcheck"
                id=""
                className={styles.taskCheckBox}
                disabled
                checked
                value="1"
              />
              Learn React Js and Tailwind CSS
            </div>
          </li> */}
        </ul>
      </div>

      {/* Complete task code end here  */}

      {/* Add habit  code start here  */}

      <hr />

      <div className={styles.bodyInsidetitle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22px"
          height="22px
    "
          viewBox="0 0 24 24"
        >
          <path
            fill="black"
            d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12s12-5.383 12-12h-2.7c0 5.128-4.172 9.3-9.3 9.3S2.7 17.128 2.7 12S6.872 2.7 12 2.7zm7.4 2.583l-7.505 9.371L8.388 9.08l-2.002 2.436l4.741 3.888a1.573 1.573 0 0 0 2.231-.233l8.504-10.617z"
          ></path>
        </svg>
        <h3 className={styles.bodySubtitle}>Add Habit List</h3>
      </div>

      <div className={styles.searchBox}>
        <input
          type="text"
          name="addHabit"
          placeholder="Add you habit"
          value={habitTaskInput}
          onChange={(e) => setHabitTaskInput(e.target.value)}
          onKeyDown={(e) => e.key == "Enter" && handleHabitAddTask()}
          className={`form-control ${styles.addButton}`}
        />
        <span className={styles.plusIconButton} onClick={handleHabitAddTask}>
          ADD
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15px"
            height="15px"
            viewBox="0 0 24 24"
            stroke="white"
            strokeWidth="1"
          >
            <path
              fill="white"
              d="M11.5 12.5H6v-1h5.5V6h1v5.5H18v1h-5.5V18h-1z"
            />
          </svg>
        </span>
      </div>

      <div className={styles.taskList}>
        <ul className={styles.taskCheckBoxList}>
          {habitTaskList.map((task) => (
            <li className={styles.taskListName}>
              <div className={styles.taskListTitle2}>
                <input
                  type="checkbox"
                  name="taskcheck"
                  id=""
                  checked={task.completed}
                  onChange={() => handleHabitToggleComplete(task.id)}
                  className={styles.taskCheckBox}
                />
                {task.name}
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                height="18px"
                viewBox="0 0 24 24"
                onClick={() => handleHabitDeleteTask(task.id)}
                style={{ cursor: "pointer" }}
              >
                <path
                  fill="black"
                  d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1zM6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7zm12-1V5h-4l-1-1h-3L9 5H5v1zM8 9h1v10H8zm6 0h1v10h-1z"
                />
              </svg>
            </li>
          ))}

          {/* <li className={styles.taskListName}>
            <div className={styles.taskListTitle2}>
              <input
                type="checkbox"
                name="taskcheck"
                id=""
                className={styles.taskCheckBox}
              />
              Learn React Js and Tailwind CSS
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18px"
              height="18px"
              viewBox="0 0 24 24"
            >
              <path
                fill="black"
                d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1zM6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7zm12-1V5h-4l-1-1h-3L9 5H5v1zM8 9h1v10H8zm6 0h1v10h-1z"
              />
            </svg>
          </li> */}

          {Array.isArray(habitCompleteList) &&
            habitCompleteList.map((task, index) => (
              <li
                className={`${styles.taskListName1} ${styles.habitCompleted}`}
                key={index}
              >
                <div className={styles.taskListTitle2}>
                  <input
                    type="checkbox"
                    name="taskcheck"
                    id=""
                    disabled
                    checked
                    value="1"
                    className={styles.taskCheckBox}
                  />
                  {task.name}
                </div>
              </li>
            ))}
        </ul>
      </div>

      {/* Add To do list code end here  */}
    </div>
  );
};
