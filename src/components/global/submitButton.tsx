

export default function SubmitButton({
  isLoading,
  disabled = false,
  text = 'Submit',
}: {
  isLoading: boolean;
  disabled?: boolean;
  text?: string;
}) {
  return (
    <button
      type="submit"
      disabled={isLoading || disabled}
      className={`w-full py-2 px-4 rounded-md text-white hover:cursor-pointer ${
        isLoading || disabled ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
      }`}
    >
      {isLoading ? 'Submitting...' : text}
    </button>
  );
}
