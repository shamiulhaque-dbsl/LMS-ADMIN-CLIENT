"use client";

import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/Icons";

const GoogleLogin = () => {
  return (
    <div className="transition-all duration-300 ease-in-out">
      <form className="w-full">
        <Button type="submit" variant="ghost" size="md" className="w-full text-sm">
          <Icons.google className="mr-2 h-5 w-5" /> Signin with Google
        </Button>
      </form>
    </div>
  );
};

export default GoogleLogin;
