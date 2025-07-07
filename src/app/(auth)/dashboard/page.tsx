import LogoutButton from "@/components/auth/logoutButton";
import CreateTodoForm from "@/components/todo/createTodoForm";
import TodoList from "@/components/todo/todoList";

export default function DashboardPage() {
    return <div className="max-w-xl mx-auto py-10 px-4 bg-orange-400">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">My Todos</h1>
        {/* <CreateTodoForm /> */}
        <CreateTodoForm />
        <TodoList />
    </div>
}
