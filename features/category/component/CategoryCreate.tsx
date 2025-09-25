"use client";

import { Button } from "@/components/ui/Button";
import SelectButton from "./SelectButton";
import UploadImageV3 from "@/components/ui/images/UploadImageV3";
import { useState } from "react";
import { Card } from "@/components/ui/Card";

const ProductForm = ({ addButton = true }) => {
  const [discountType, setDiscountType] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleChange = (label: string, value: string) => {
    setDiscountType(value);
    setInputValue("");
  };

  return (
    <section className="rounded-md bg-white text-black w-full">
      <form action="#">
        <div>
          <Card className="border rounded-lg shadow-lg">
            <Card.Header>
              <Card.Title className="text-md md:text-xl">Basic Info</Card.Title>
            </Card.Header>
            <Card.Content className="">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="">
                  <label htmlFor="name" className="block mb-1 text-sm font-medium ">
                    Category Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="px-4 py-2 bg-[#f3f5f5]/20 rounded-lg w-full  text-black outline-none focus:ring-2 focus:border-transparent focus:outline-none border border-gray-300 "
                    placeholder="Type category name"
                    required
                  />
                </div>

                <div className="w-full ">
                  <label htmlFor="name" className="block mb-1 text-sm font-medium ">
                    Category Slug
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="px-4 py-2 bg-[#f3f5f5]/20 rounded-lg w-full  text-black outline-none focus:ring-2 focus:border-transparent focus:outline-none border border-gray-300 "
                    required
                  />
                </div>
              </div>

              <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-3 mt-2">
                <div className="">
                  <SelectButton
                    title="Stock Status"
                    label="stock-status"
                    value={["In Stock", "Out of Stock", "Limited Stock"]}
                    className="text-sm"
                    onSelect={handleChange}
                  />
                </div>

                <SelectButton
                  title="Category type"
                  label="category-type"
                  value={["Physical", "Digital", "Service"]}
                  className="text-sm"
                  onSelect={handleChange}
                />

                <div className="">
                  <label htmlFor="Stock Quantity" className="block mb-1 text-sm font-medium">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock-quantity"
                    id="stock-quantity"
                    className="px-4 py-2 bg-[#f3f5f5]/20 rounded-lg  w-full  text-black outline-none focus:ring-2 focus:border-transparent focus:outline-none border border-gray-300"
                    placeholder="12"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2 mt-2">
                <label htmlFor="description" className="block mb-2 text-sm font-medium ">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="px-4 py-2 bg-[#f3f5f5]/20 rounded-lg w-full  text-black outline-none focus:ring-2 focus:border-transparent focus:outline-none border border-gray-300"
                  placeholder="Your description here"
                ></textarea>
              </div>

              <div className="flex md:col-span-2  rounded-lg flex-col py-2">
                <label className="w-full text-sm font-medium mb-1">Upload Image</label>
                <div className=" md:w-6/12 lg:w-[28%]">
                  <UploadImageV3 />
                </div>
              </div>
            </Card.Content>

            {addButton ? (
              <div className="px-4 mb-4">
                <Button type="button" className=" rounded-lg w-full md:w-fit md:h-fit">
                  Add Category
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

export default ProductForm;
