"use client";
import { Button } from "@/components/ui/Button";
import RequiredFieldIndicator from "@/components/ui/RequiredFieldIndicator";
import DropImage from "@/components/ui/images/DropImageV2";
import InputImage from "@/components/ui/images/InputImage";
import UploadImage from "@/components/ui/images/components/ImageUpload";
import { Card, CardContent, CardHead, CardTitle } from "@/components/ui/card/Card";
import { Employee } from "../types";

interface EmployeeFormProps {
  addButton?: boolean;
  formData: Employee;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  addButton = true,
  formData,
  handleInputChange,
}) => {
  return (
    <section className="rounded-md bg-white text-black w-full">
      <form action="#">
        <div>
          <Card className="border rounded-lg shadow-lg">
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 text-black rounded-lg">
              <div className="">
                <label className="block text-gray-700 font-medium">
                  Name <RequiredFieldIndicator text={"(Field is required)"} className="" />
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                  className="p-2 w-full rounded-md border border-gray-300 outline-none focus:ring-2 bg-[#f9fafb] mt-1"
                />
              </div>

              <div className="">
                <label className="block text-gray-700 font-medium">
                  Role
                  <RequiredFieldIndicator text="Its Required" />
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="Enter role"
                  className="p-2 w-full rounded-md border border-gray-300 outline-none focus:ring-2 bg-[#f9fafb] mt-1"
                />
              </div>
              <div className="">
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  className="p-2 w-full rounded-md border border-gray-300 outline-none focus:ring-2 bg-[#f9fafb] mt-1"
                />
              </div>
              <div className="">
                <label className="block text-gray-700 font-medium">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Enter country"
                  className="p-2 w-full rounded-md border border-gray-300 outline-none focus:ring-2 bg-[#f9fafb] mt-1"
                />
              </div>

              <div className="">
                <label className="block text-gray-700 font-medium">Status</label>
                <input
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  placeholder="Enter status"
                  className="p-2 w-full rounded-md border border-gray-300 outline-none focus:ring-2 bg-[#f9fafb] mt-1"
                />
              </div>

              <div className="">
                <label className="block text-gray-700 font-medium">Active</label>
                <input
                  type="text"
                  name="active"
                  value={formData.active}
                  onChange={handleInputChange}
                  placeholder="Enter active"
                  className="p-2 w-full rounded-md border border-gray-300 outline-none focus:ring-2 bg-[#f9fafb] mt-1"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium">
                  Name <span className="text-red-600">*</span>{" "}
                </label>
                <input
                  type="text"
                  name="demo"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter status"
                  className="p-2 w-full rounded-md border border-gray-300 outline-none focus:ring-2 bg-[#f9fafb] mt-1"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium">
                  Name <span className="text-red-600 text-xs">(Filed is required)</span>{" "}
                </label>
                <input
                  type="text"
                  name="demo"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter status"
                  className="p-2 w-full rounded-md border border-gray-300 outline-none focus:ring-2 bg-[#f9fafb] mt-1"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium">Describe</label>
                <textarea
                  rows={4}
                  cols={50}
                  name="comment"
                  className="p-2 w-full rounded-md border border-gray-300 outline-none focus:ring-2 bg-[#f9fafb] mt-1"
                  defaultValue="Enter the text .... "
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-1">Image 1</label>
                <DropImage />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-1">Image 2</label>
                <InputImage />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-1">Image 3</label>
                <UploadImage />
              </div>
            </CardContent>

            {addButton ? (
              <div className="px-4 mb-4">
                <Button type="button" className=" rounded-lg w-full md:w-fit md:h-fit">
                  Add Employee
                </Button>
              </div>
            ) : (
              ""
            )}
          </Card>
        </div>
      </form>
    </section>
  );
};

export default EmployeeForm;
