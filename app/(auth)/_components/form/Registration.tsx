"use client";

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";

const RegistrationForm = () => {
  return (
    <div className="transition-all duration-300 ease-in-out">
      <form className="transform space-y-4 transition-all duration-300 ease-in-out">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-xs/6 font-medium text-gray-700">
              Name
            </label>
            <Input id="name" name="name" placeholder="John" autoComplete="name" />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs/6 font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              name="email"
              placeholder="example@gmail.com"
              type="email"
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs/6 font-medium text-gray-700">
              Phone
            </label>
            <Input
              id="phone"
              name="phone"
              placeholder="018********"
              type="tel"
              autoComplete="phone"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-xs/6 font-medium text-gray-700">
                Password
              </label>
            </div>
            <Input
              id="password"
              name="password"
              placeholder="****"
              type="password"
              autoComplete="current-password"
            />
          </div>
        </div>

        <SubmitButton idleText="Sign up" />
      </form>
    </div>
  );
};

export default RegistrationForm;
