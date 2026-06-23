import prisma from "@/lib/db";

// Instantiate PrismaClient without passing the DATABASE_URL directly.
// The connection URL should be provided via the environment when the
// Prisma client is generated or at runtime through process.env.


export default async function Home() {
 
  const tasks = await prisma.task.findMany();
  const handleAddTask = () => {
    // Logic to add a new task (e.g., open a modal or navigate to a form)
    // console.log("Add Task button clicked");
  }

  return (
   <main className="flex min-h-screen bg-zinc-400 flex-col items-center justify-between p-10">
    <h1 className="text-4xl font-bold mb-4">Tasksssss List</h1>
    <input type="text" placeholder="Add a new task" className="mb-4 p-2 border rounded w-full max-w-md" />
    <button onClick={handleAddTask} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">Add Task</button>

    <ul className="w-full max-w-md">
      {tasks.map((task) => (
        <li key={task.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-2xl font-semibold">{task.title}</h2>
          <p className="text-gray-600">{task.createdAt.toLocaleDateString()}</p>
          <p className={`mt-2 font-bold ${task.completed ? "text-green-500" : "text-red-500"}`}>
            {task.completed ? "Completed" : "Incomplete"}
          </p>
        </li>
      ))}
    </ul>
   </main>
  );
}


