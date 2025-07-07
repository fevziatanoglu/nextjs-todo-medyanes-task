"use client";

import Link from "next/link";
import { CheckSquare, Plus, Clock, Users, Star, ArrowRight, Check, Github, Mail, HomeIcon } from "lucide-react";
import SignupForm from "@/components/auth/signupForm";
import SigninForm from "@/components/auth/signinForm";
import useRootStore from "@/store";

export default function Home() {
  const { openModal } = useRootStore()
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6">
              <CheckSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Organize Your Life with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                TodoApp
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The simple, powerful way to manage your tasks, boost productivity, and never miss a deadline again.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => { openModal(<SignupForm />, "Get Started") }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg text-lg transition duration-200 transform hover:scale-105"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button
                onClick={() => { openModal(<SigninForm />, "Lets Login") }} className="inline-flex items-center px-8 py-4 border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-semibold rounded-lg text-lg transition duration-200"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to stay organized
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make task management effortless and enjoyable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Task Creation</h3>
              <p className="text-gray-600">
                Add tasks quickly with our intuitive interface. Set priorities, due dates, and categories effortlessly.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Reminders</h3>
              <p className="text-gray-600">
                Never miss a deadline with intelligent notifications and customizable reminder settings.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Team Collaboration</h3>
              <p className="text-gray-600">
                Share tasks and collaborate with your team. Assign responsibilities and track progress together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Why choose TodoApp?
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Check className="w-6 h-6 text-green-400 mr-3" />
                  <span className="text-white text-lg">100% Free to start</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-6 h-6 text-green-400 mr-3" />
                  <span className="text-white text-lg">Works on all devices</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-6 h-6 text-green-400 mr-3" />
                  <span className="text-white text-lg">Secure data encryption</span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-yellow-400 mr-1" />
                  <Star className="w-6 h-6 text-yellow-400 mr-1" />
                  <Star className="w-6 h-6 text-yellow-400 mr-1" />
                  <Star className="w-6 h-6 text-yellow-400 mr-1" />
                  <Star className="w-6 h-6 text-yellow-400 mr-1" />
                </div>
                <blockquote className="text-white text-lg mb-4">
                  "Your mind is for having ideas, not holding them."
                </blockquote>
                <cite className="text-white/80"> David Allen — <span className="italic font-extralight">Getting Things Done</span></cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to get organized?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of users who have already transformed their productivity with TodoApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => { openModal(<SignupForm />, "Get Started") }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg text-lg transition duration-200 transform hover:scale-105"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            No credit card required • Free forever plan available
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                <CheckSquare className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">TodoApp</span>
            </div>
            <div className="flex space-x-6">
              <Link href={""} className="flex flex-row gap-1 text-gray-400 hover:text-white transition duration-200">
                Source <Github />
              </Link>
              <Link href={""} className="flex flex-row gap-1 text-gray-400 hover:text-white transition duration-200">
                Contact <Mail />
              </Link>
              <Link href={""} className="flex flex-row gap-1 text-gray-400 hover:text-white transition duration-200">
                Home <HomeIcon />
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © This project was done as a medianes internship task.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
