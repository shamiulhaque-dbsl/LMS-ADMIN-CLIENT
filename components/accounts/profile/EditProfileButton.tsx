"use client";

import { useState, FormEvent, TextareaHTMLAttributes } from "react";
import { Button } from "@/components/ui/Button";
import { X, Camera } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "@/components/ui/Image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        <div className="my-8 inline-block w-full max-w-2xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 transition-colors hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="px-6 py-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  className?: string;
}

const Textarea = ({ label, className = "", ...props }: TextareaProps) => (
  <div className="space-y-1">
    {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
    <textarea
      className={`resize-vertical w-full rounded-lg border border-gray-300 px-3 py-2 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${className}`}
      rows={3}
      {...props}
    />
  </div>
);

interface User {
  avatar: string;
  name: string;
}

interface ProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  bio: string;
}
interface EditProfileButtonProps {
  user: User;
}

export const EditProfileButton = ({ user }: EditProfileButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [profileForm] = useState<ProfileForm>({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
    bio: "Passionate learner focused on web development and design.",
  });

  const handleProfileUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOpen(false);
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        Edit Profile
      </Button>

      {isOpen && (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Edit Profile">
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <div className="flex items-center space-x-4">
              <Image
                src={user.avatar}
                alt={user.name}
                className="h-20 w-20 rounded-full object-cover"
              />
              <div>
                <Button type="button" variant="outline" size="sm">
                  <Camera className="mr-2 h-4 w-4" />
                  Change Photo
                </Button>
                <p className="mt-1 text-xs text-gray-500">JPG, PNG or GIF. Max size 2MB.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input label="First Name" name="firstName" value={profileForm.firstName} required />
              <Input label="Last Name" name="lastName" value={profileForm.lastName} required />
            </div>

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={profileForm.email}
              required
            />

            <Input label="Phone Number" name="phone" value={profileForm.phone} />

            <div className="border-t pt-6">
              <h3 className="mb-4 text-lg font-medium text-gray-900">Address Information</h3>
              <div className="space-y-4">
                <Input label="Address" name="address" value={profileForm.address} />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <Input label="City" name="city" value={profileForm.city} />
                  <Input label="State" name="state" value={profileForm.state} />
                  <Input label="ZIP Code" name="zipCode" value={profileForm.zipCode} />
                </div>
              </div>
            </div>

            <Textarea
              label="Bio"
              name="bio"
              value={profileForm.bio}
              placeholder="Tell us about yourself..."
            />

            <div className="flex justify-end space-x-3 border-t pt-6">
              <Button type="button" variant="outlineGray" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="outline" type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

EditProfileButton.displayName = "EditProfileButton";
