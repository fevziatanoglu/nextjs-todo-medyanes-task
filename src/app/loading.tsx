import { Loader2, CheckSquare, Sparkles } from 'lucide-react';

export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative w-20 h-20 mx-auto mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <CheckSquare className="w-10 h-10 text-white" />
          </div>
        </div>
        
        {/* Loading Text */}
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          TodoApp
        </h2>
        
        {/* Subtitle with animated icon */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
          <p className="text-gray-600 text-lg">Loading your workspace...</p>
        </div>
        
        {/* Animated Progress Dots */}
        <div className="flex justify-center space-x-2 mb-8">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-80 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto mb-6">
          <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
        </div>
        
        {/* Sparkles Animation */}
        <div className="flex justify-center space-x-4 text-gray-400">
          <Sparkles className="w-4 h-4 animate-pulse" style={{ animationDelay: '0s' }} />
          <Sparkles className="w-4 h-4 animate-pulse" style={{ animationDelay: '0.5s' }} />
          <Sparkles className="w-4 h-4 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        {/* Bottom Text */}
        <p className="mt-6 text-gray-500 text-sm">
          Preparing your productivity experience...
        </p>
      </div>
    </div>
  );
}
