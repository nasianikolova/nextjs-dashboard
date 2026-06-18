'use client';

import { useState } from 'react';

export default function ProfileImageUpload() {
  const [preview, setPreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm mb-2">Profile Image</label>

      <div className="flex items-center gap-4">
        {/* Circle Preview */}
        <label className="cursor-pointer">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center border">
            {preview ? (
              <img
                src={preview}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500 text-sm">Upload</span>
            )}
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      </div>
    </div>
  );
}
