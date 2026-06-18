'use client';

import { useEffect } from 'react';

export default function PasswordModal({ open, onClose }) {
  if (!open) return null;

  // Close modal on ESC key
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-sm shadow-lg p-6 w-full max-w-md animate-fadeIn">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>

        {/* Old Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Old Password</label>
          <input
            type="password"
            className="w-full border rounded-md p-2"
            placeholder="Enter old password"
          />
        </div>

        {/* New Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">New Password</label>
          <input
            type="password"
            className="w-full border rounded-md p-2"
            placeholder="Enter new password"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border"
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
