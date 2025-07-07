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
    <div className="group relative bg-white border border-gray-300 rounded-lg p-4 mb-3 transition-all duration-200 hover:shadow-lg hover:border-gray-400">
      {/* Completion indicator line */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-lg transition-all duration-300 ${
        todo.completed 
          ? "bg-gradient-to-b from-blue-600 to-indigo-600" 
          : "bg-gradient-to-b from-gray-300 to-gray-400"
      }`} />
      
      <div className="flex items-center justify-between ml-2">
        <div className="flex items-center space-x-4 flex-1">
          {/* Checkbox */}
          <button
            onClick={() => onToggle(todo.id)}
            className={`relative flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              todo.completed
                ? "bg-gradient-to-br from-blue-600 to-indigo-600 border-blue-500 focus:ring-blue-300"
                : "border-gray-300 hover:border-blue-400 focus:ring-blue-300"
            }`}
            aria-label="Toggle Complete"
          >
            <Check 
              className={`w-4 h-4 text-white transition-all duration-200 ${
                todo.completed ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`} 
            />
          </button>
          
          {/* Title */}
          {isEditing ? (
            <input
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              className="text-black flex-1 text-lg font-medium bg-transparent border-b-2 border-blue-500 outline-none px-0 py-1 focus:border-indigo-500 transition-colors duration-200"
              autoFocus
              onKeyDown={e => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") handleCancel();
              }}
            />
          ) : (
            <span className={`flex-1 text-lg font-medium transition-all duration-200 ${
              todo.completed 
                ? "line-through text-gray-500" 
                : "text-gray-800"
            }`}>
              {todo.title}
            </span>
          )}
        </div>
        
        {/* Action Buttons - Always visible with modern colors */}
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Save"
              >
                <Save className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                aria-label="Cancel"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEdit}
                className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Edit"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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
