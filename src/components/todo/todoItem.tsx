import { useState } from "react";
import { Check, Trash2, Edit, Save, X } from "lucide-react";
import { Todo } from "@/types/todo";

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onUpdate,
}: {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedTodo: Partial<Todo>) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(todo.title);
  };
  const handleSave = () => {
    if (editTitle.trim() && editTitle !== todo.title) {
      onUpdate(todo.id, { title: editTitle });
    }
    setIsEditing(false);
  };

  return (
    <div className="group relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-4 mb-3 transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/40 hover:border-gray-300/60 hover:-translate-y-0.5">
      {/* Completion indicator line */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl transition-all duration-300 ${
        todo.completed 
          ? "bg-gradient-to-b from-emerald-400 to-emerald-600" 
          : "bg-gradient-to-b from-blue-400 to-blue-600 opacity-20"
      }`} />
      
      <div className="flex items-center justify-between ml-2">
        <div className="flex items-center space-x-4 flex-1">
          {/* Checkbox */}
          <button
            onClick={() => onToggle(todo.id)}
            className={`relative flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              todo.completed
                ? "bg-gradient-to-br from-emerald-400 to-emerald-600 border-emerald-500 focus:ring-emerald-300"
                : "border-gray-300 hover:border-blue-400 focus:ring-blue-300 group-hover:border-blue-300"
            }`}
            aria-label="Toggle Complete"
          >
            <Check 
              className={`w-4 h-4 text-white transition-all duration-300 ${
                todo.completed ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`} 
            />
          </button>
          
          {/* Title */}
          {isEditing ? (
            <input
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              className="flex-1 text-lg font-medium bg-transparent border-b-2 border-blue-400 outline-none px-0 py-1 focus:border-blue-500 transition-colors duration-200"
              autoFocus
              onKeyDown={e => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") handleCancel();
              }}
            />
          ) : (
            <span className={`flex-1 text-lg font-medium transition-all duration-300 ${
              todo.completed 
                ? "line-through text-gray-400" 
                : "text-gray-800 group-hover:text-gray-900"
            }`}>
              {todo.title}
            </span>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-1">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                aria-label="Save"
              >
                <Save className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                aria-label="Cancel"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEdit}
                className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 hover:scale-105 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label="Edit"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 hover:scale-105 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-300"
                aria-label="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
