import { v4 as uuidv4 } from "uuid";

let tasks = [];

export async function POST(req) {
  const body = await req.json();

  const newTask = {
    id: uuidv4(),
    title: body.task,
    createdAt: new Date(),
  };

  tasks.push(newTask);

  return Response.json(newTask, { status: 201 });
}

export async function GET() {
  if (tasks.length === 0) {
    return Response.json({ message: "No tasks found" }, { status: 404 });
  }
  return Response.json(tasks, { status: 200 });
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      return new Response("Task not found", { status: 404 });
    }

    tasks.splice(taskIndex, 1);

    return new Response(JSON.stringify({ message: "Task deleted successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    return new Response("Failed to delete task", { status: 500 });
  }
}
