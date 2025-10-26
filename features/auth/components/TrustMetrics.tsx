import { Icons } from "@/components/Icons";
export const TrustMetrics = () => (
  <div className="mt-4 flex items-center space-x-4">
    <div className="flex items-center">
      <Icons.user className="mr-2 h-6 w-6" />
      <p className="text-sm font-medium text-red-600">15k+ Satisfied Vendors</p>
    </div>
    <div className="flex items-center">
      <span className="rounded-full bg-gradient-to-r from-orange-400 to-red-600 px-2 py-1 text-xs font-semibold text-white">
        Secure
      </span>
      <p className="ml-2 text-sm">Data Protection Guaranteed</p>
    </div>
  </div>
);
