"use client";

import { useEffect, useState } from "react";

// Instantiate PrismaClient without passing the DATABASE_URL directly.
// The connection URL should be provided via the environment when the
// Prisma client is generated or at runtime through process.env.


type Task = {
  id: string;
  title: string;
  createdAt: Date;
  completed: boolean;
};

export default  function Home() {
  const [posts, setPosts] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  async function load() {
    try {
      setLoading(true);
      const res = await fetch("/api/tasks", { cache: "no-store" });
      const data = await res.json();
      setPosts(data);
      console.log("Fetched tasks:", data);
    }
     finally 
    {
      setLoading(false);
    }
  }
  
  async function createTask(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, completed }),
      });
      console.log("Create task response:", res);
      if (res.ok) {
        const newTask = await res.json();
        setPosts((prevPosts) => [...prevPosts, newTask]);
        setTitle("");
        setCompleted(false);
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  }

  useEffect(() => {
    load();
  }, []);



  return (
   <main className="flex min-h-screen bg-zinc-400 flex-col items-center justify-between p-10">
    <h1 className="text-4xl font-bold mb-4">Tasksssss List</h1>
     <ul className="w-full max-w-md">
      {posts?.map((task) => (
        <li key={task.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-2xl font-semibold">{task.title}</h2>
          <p className="text-gray-600">{new Date(task.createdAt).toLocaleDateString()}</p>
          <p className={`mt-2 font-bold ${task.completed ? "text-green-500" : "text-red-500"}`}>
            {task.completed ? "Completed" : "Incomplete"}
          </p>
        </li>
      ))}
    </ul>

    <form onSubmit= {createTask}
          className="grid gap-3 md:grid-cols-2">
    <div>
      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
        Title:
      </label>
      <input type="text" placeholder="Add a new task" 
        value={title}
        className="mb-4 p-2 border rounded w-full max-w-md" 
        onChange={(e) => setTitle(e.target.value)} />
    </div>
    <div>
      <label htmlFor="completed" 
        className="block text-sm font-medium text-gray-700">
        Completed
      </label>
      <input
        type="checkbox"
        id="completed"
        checked={completed}
        onChange={(e) =>setCompleted(e.target.checked)}
        className="mt-1 block border rounded"
      />
    </div>
    <button
                type="submit"
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">Add Task</button>
    </form>
   </main>
  );
}


