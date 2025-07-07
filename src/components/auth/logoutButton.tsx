"use client"

import useRootStore from "@/store";
import { LogOut, Loader2 } from "lucide-react";

export default function LogoutButton() {
  const { logoutFetch, isLoading } = useRootStore();
  
  const handleLogout = async () => {
    await logoutFetch();
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-medium transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none hover:cursor-pointer"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
        </>
      ) : (
        <>
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </>
      )}
    </button>
  );
}
