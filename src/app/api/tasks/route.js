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
    return Response.json(tasks, { status: 200 });
}
