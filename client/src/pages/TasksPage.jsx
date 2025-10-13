import React, { useEffect, useState } from "react";
import TasksHeader from "../components/task-components/TasksHeader";
import useTaskStore from "../store/useTaskStore";
import TaskCard from "../components/task-components/TaskCard";
import CreateTask from "../components/task-components/CreateTask";
import TaskSkeleton from "../components/task-components/TaskSkeleton";

const TasksPage = () => {
    const { tasks, fetchTasks, isTasksLoading } = useTaskStore();
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <section className="bg w-full h-screen flex flex-col pl-12 p-3 overflow-y-auto relative overflow-x-hidden z-30">
            <main className="w-full">
                <header className="text-center mb-6">
                    <h1 className="text-black font-extrabold text-3xl md:text-4xl lg:text-5xl">
                        Your Tasks
                    </h1>
                    <TasksHeader setIsCreateOpen={setIsCreateOpen} />
                </header>

                {isTasksLoading && tasks.length === 0 ? (
                    <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <TaskSkeleton key={index} />
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {tasks.length === 0 && !isTasksLoading ? (
                            <p className="w-full text-center">
                                No Tasks to display Add new tasks to see them
                                here.
                            </p>
                        ) : (
                            tasks.map((task) => (
                                <TaskCard key={task._id} task={task} />
                            ))
                        )}
                    </div>
                )}
            </main>

            <CreateTask
                isCreateOpen={isCreateOpen}
                setIsCreateOpen={setIsCreateOpen}
            />
        </section>
    );
};

export default TasksPage;
