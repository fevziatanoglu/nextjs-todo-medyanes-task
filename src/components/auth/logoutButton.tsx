"use client"

export default function LogoutButton() {
  const { signOut } = require('next-auth/react');
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
}
