"use client";

import Image from "next/image";
import { useUser } from "@stackframe/stack";
import Header from "@/components/header";
import { Squares } from "@/components/ui/squares-background";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";


export default function Home() {
  const { isLoading } = useUser({ or: "redirect" });
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleAddTask = async () => {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ task }),
      });

      if (!res.ok) {
        throw new Error("Failed to add task");
      }

      const data = await res.json();

      setTasks((tasks) => [...tasks, data]);

      setTask("");
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  const handleGetTasks = async () => {
    try {
      const res = await fetch("/api/tasks", {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Failed to get tasks");
      }

      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  useEffect(() => {
    handleGetTasks();
  }, []);

  if (isLoading) {
    return (
      <div className="relative min-h-screen">
        <Squares className="absolute inset-0 -z-10" />
        <Header />
      </div>
    );
  }

  // Deine React-Komponente
  const handleDeleteTask = async (id) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        throw new Error("Failed to delete task");
      }

      // Task von der UI entfernen
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <div className="relative min-h-screen">
      <Squares className="absolute inset-0 -z-10" />
      <Header />
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-10 md:pt-0 mt-10">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          To Do List
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          A simple and effective to-do list app built with Next.js, Tailwind CSS, and Shadcn UI.
        </p>

        <div className="flex justify-center items-center mt-6">
          <Input
            type="text"
            id="task"
            value={task}
            onChange={(task) => setTask(task.target.value)}
            placeholder="enter a task"
            className="rounded-r-none w-full max-w-[400px] bg-neutral-900 border-neutral-800 text-neutral-50"
          />
          <Button
            onClick={handleAddTask}
            variant="outline"
            className="rounded-l-none rounded-r-full outline-none focus:ring-0 border-l-0 before:hidden after:hidden shadow-none bg-neutral-900 border-neutral-800 text-neutral-50 hover:bg-neutral-800"
          >
            Add Task
          </Button>
        </div>
    
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-neutral-50">Tasks:</h2>
          <div className="mt-4 space-y-4">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-neutral-800 rounded-xl p-4 shadow-md border border-neutral-700"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-neutral-100">{task.title}</h3>
                    <div className="flex items-center gap-2 text-neutral-200">
                      Task completed?
                      <Checkbox
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleDeleteTask(task.id); // Löscht Task bei angekreuzt
                          }
                        }}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-neutral-400 mt-2">
                    Created at: {new Date(task.createdAt).toLocaleDateString("de-DE", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-neutral-500">No tasks available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}