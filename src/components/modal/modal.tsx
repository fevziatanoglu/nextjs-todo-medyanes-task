'use client';

import useRootStore from "@/store";


export default function Modal() {
  const { isOpen, modalChild, modalTitle, closeModal } = useRootStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative bg-white rounded-xl shadow-2xl p-6 min-w-[320px] max-w-lg w-full">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          aria-label="Close modal"
        >
          ×
        </button>
        {/* Modal Title */}
        {modalTitle && (
          <h2 className="text-lg font-semibold mb-4 text-gray-900">{modalTitle}</h2>
        )}
        {/* Modal Content */}
        <div>{modalChild}</div>
      </div>
    </div>
  );
}
