import TodoList from "../_components/List";
import Link from "next/link";
export default function TodosPage() {
  return (
    <div className="min-h-screen p-6 mx-auto flex flex-col items-center">
      {/* <h1 className="text-2xl font-bold mb-4">Todo List</h1> */}
      <Link href="/" className="text-blue-500 hover:underline mb-4">
        ← Back to Home
      </Link>
      <TodoList />
    </div>
  );
}
