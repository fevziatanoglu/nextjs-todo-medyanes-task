import SigninForm from "@/components/auth/signinForm";
import { LogIn, Shield, Users, Lock, HandHeart } from "lucide-react";

export default function SigninPage() {
  return (
    <div className="min-h-screen flex pt-15 lg:pt-20 items-baseline justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <HandHeart className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back
          </h2>
          <p className="text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <SigninForm />
        </div>


      </div>
    </div>
  );
}
