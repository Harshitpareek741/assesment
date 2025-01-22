"use client";

import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { useUser } from "../context/usercontext";

interface Task {
  _id: string;
  title: string;
  description: string;
  date: string;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState<string>("");
  const [editingTaskDescription, setEditingTaskDescription] = useState<string>("");

  const fetchTasks = async (): Promise<void> => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await axios.get("/api/task/fetch", {
        params: { userId: user.id, date: selectedDate },
      });
      setTasks(response.data.tasks);
    } catch {
      alert("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (taskId: string): Promise<void> => {
    if (!user) return;
    try {
      await axios.post("/api/task/delete", { taskId });
      setTasks(tasks.filter((task) => task._id !== taskId));
      alert("Task deleted successfully");
    } catch {
      alert("Failed to delete task");
    }
  };

  const handleEditStart = (task: Task): void => {
    setEditingTaskId(task._id);
    setEditingTaskTitle(task.title);
    setEditingTaskDescription(task.description);
  };

  const handleEditSave = async (): Promise<void> => {
    if (!user || !editingTaskId) return;
    try {
      const response = await axios.post("/api/task/update", {
        userId: user.id,
        taskId: editingTaskId,
        title: editingTaskTitle,
        description: editingTaskDescription,
      });
      const updatedTask: Task = response.data.task;
      setTasks(tasks.map((task) => (task._id === editingTaskId ? updatedTask : task)));
      alert("Task updated successfully");
      setEditingTaskId(null);
    } catch {
      alert("Failed to update task");
    }
  };

  const handleCreate = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (!user) return;
    try {
      const response = await axios.post("/api/task/create", {
        userId: user.id,
        date: selectedDate,
        title: newTaskTitle,
        description: newTaskDescription,
      });
      const newTask: Task = response.data.task;
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
      setNewTaskDescription("");
      alert("Task created successfully");
    } catch {
      alert("Failed to create task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [selectedDate, user]);

  return (
    <div className="min-h-screen h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-white mb-6">Task Manager</h1>

      <div className="mb-4">
        <label htmlFor="date" className="text-white mr-2">Select Date:</label>
        <input
          id="date"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 rounded border border-gray-300"
        />
      </div>

      <form onSubmit={handleCreate} className="mb-4 w-full max-w-md flex flex-col space-y-2">
        <input
          type="text"
          placeholder="Task Title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="p-2 rounded border border-gray-300"
        />
        <textarea
          placeholder="Task Description"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          className="p-2 rounded border border-gray-300"
        />
        <button type="submit" className="px-4 py-2 bg-green-500 hover:bg-green-700 rounded text-white">Create Task</button>
      </form>

      {loading ? (
        <p className="text-white">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-white">No tasks for the selected date.</p>
      ) : (
        <ul className="w-full max-w-2xl space-y-4">
          {tasks.map((task) => (
            <li key={task._id} className="p-4 bg-gray-800 text-white rounded shadow-md">
              {editingTaskId === task._id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editingTaskTitle}
                    onChange={(e) => setEditingTaskTitle(e.target.value)}
                    className="p-2 rounded border text-black border-gray-300 w-full"
                  />
                  <textarea
                    value={editingTaskDescription}
                    onChange={(e) => setEditingTaskDescription(e.target.value)}
                    className="p-2 rounded border text-black border-gray-300 w-full"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleEditSave}
                      className="px-3 py-1 bg-green-500 hover:bg-green-700 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingTaskId(null)}
                      className="px-3 py-1 bg-gray-500 hover:bg-gray-700 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold">{task.title}</h3>
                    <p className="text-sm">{task.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditStart(task)}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-700 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-700 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
