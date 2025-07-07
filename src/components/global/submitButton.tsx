import { Loader2, ArrowRight } from "lucide-react";

export default function SubmitButton({
  isLoading,
  disabled = false,
  text = 'Submit',
  className,
}: {
  isLoading: boolean;
  disabled?: boolean;
  text?: string;
  className?: string;
}) {
  return (
    <button
      type="submit"
      disabled={isLoading || disabled}
      className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center space-x-2 ${
        isLoading || disabled 
          ? 'bg-gray-400 cursor-not-allowed transform-none' 
          : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
      } ${className || ''}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          <span>{text}</span>
          <ArrowRight className="w-4 h-4" />
        </>
      )}
    </button>
  );
}
