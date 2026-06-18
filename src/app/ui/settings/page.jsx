'use client';

import { useState } from 'react';
import ProfileImageUpload from '@/app/ui/settings/profileimage';
import PasswordModal from '@/app/ui/settings/passwordmode';

export default function Page() {
  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [open, setOpen] = useState(false);


  return (
    <div className="space-y-5">

      {/* PERSONAL INFO */}
      <section className="border rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Personal Info</h2>

        {/* Profile Image */}
        <ProfileImageUpload>

        </ProfileImageUpload>

        {/* Full Name */}
        <div className="mb-6">
          <label className="block text-sm mb-2">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded border p-2 text-sm"
            placeholder="e.g. Nasia Nikolova"
          />
        </div>

        {/* Job Title */}
        <div className="mb-6">
          <label className="block text-sm mb-2">Job Title</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full rounded border p-2 text-sm" 
            placeholder="Enter your job title"
          />
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-sm mb-2">Contact Number</label>
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className="w-full rounded border p-2 text-sm"
            placeholder="Enter your phone number"
          />
        </div>
      </section>

      {/* ACCESS SECURITY */}
      <section className="border rounded p-6">
        <h2 className="text-lr font-semibold mb-4">Access Security</h2>

        <div>
          <label className="block text-sm mb-2">Password Management</label>
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-blue-600 text-sm text-white rounded hover:bg-blue-700"
          >
            Change Password
          </button>
                <PasswordModal open={open} onClose={() => setOpen(false)} />             
        </div>
      </section>

      {/* ACCESS SECURITY */}
      <section className="border rounded p-6">
        <h2 className="text-lr font-semibold mb-4">Add Accountant</h2>

        <div>
          <label className="block text-sm mb-2">Add you Accountant to grand him/her access to you invoices and necessary files.</label>
          <button className="px-4 py-2 bg-blue-600 text-sm text-white rounded hover:bg-blue-700">
            Link Accountant
          </button>
        </div>
      </section>



    </div>
  );
}
