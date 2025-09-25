"use client";
import { Button } from "@/components/ui/Button";
import SelectButton from "./SelectButton";
import UploadImageV3 from "@/components/ui/images/UploadImageV3";
import { useEffect, useRef, useState } from "react";
import { DISCOUNT_TYPE } from "../constant";
import CategoryModal from "@/features/category/component/CategoryModal";
import BrandModal from "@/features/brand/component/BrandModal";
import { Card } from "@/components/ui/Card";

const ProductForm = ({ addButton = true }) => {
  const [discountType, setDiscountType] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [brandModal, setBrandModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [brandFormData, setBrandFormDatas] = useState({
    id: 0,
    brandName: "",
    brandStatus: "",
    phone: "",
    email: "",
    websiteURL: "",
  });
  const [categoryFormData, setCategoryFormData] = useState({
    id: 0,
    categoryName: "",
    stockStatus: "In Stock",
    categoryType: "Physical",
    stockType: "Available",
    quantity: 1,
  });
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (label: string, value: string) => {
    setDiscountType(value);
    setInputValue("");
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
    if (discountType === DISCOUNT_TYPE.FIXED) {
    } else if (discountType === DISCOUNT_TYPE.PERCENTAGE) {
    }
  };

  const handleClick = () => {
    console.log("handle category");
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // toggleMenu(null);
      }
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isModalOpen, brandModal]);

  return (
    <section className="rounded-md bg-white text-black w-full">
      <form action="#">
        <div className="lg:flex justify-between gap-7 ">
          <div className="lg:w-8/12">
            <Card>
              <CardHead>
                <CardTitle>Basic Info</CardTitle>
              </CardHead>
              <CardContent className="grid sm:grid-cols-2 gap-3 sm:gap-4 p-2 md:p-4">
                <div>
                  <label htmlFor="name" className="block mb-1 text-sm font-medium ">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="px-4 py-2 bg-[#f3f5f5]/20 rounded-lg w-full  text-black outline-none focus:ring-2 focus:border-transparent focus:outline-none border border-gray-300 "
                    placeholder="Type product name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="name" className="block mb-1 text-sm font-medium ">
                    Product Slug
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="px-4 py-2 bg-[#f3f5f5]/20 rounded-lg w-full  text-black outline-none focus:ring-2 focus:border-transparent focus:outline-none border border-gray-300 "
                    required
                  />
                </div>

                <div className="relative">
                  <p className="absolute  text-sm flex gap-1">
                    Brand{" "}
                    <button onClick={() => setBrandModal(true)}>
                      <FaCirclePlus className="text-blue-600 " />
                    </button>
                  </p>
                  <SelectButton
                    // title="Brand"
                    label="brand"
                    value={["brand1", "brand2", "brand3", "brand4"]}
                    className="text-sm"
                    onSelect={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block mb-1 text-sm font-medium ">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="px-4 py-2 bg-[#f3f5f5]/20 rounded-lg  w-full text-black outline-none focus:ring-2 focus:border-transparent focus:outline-none border border-gray-300"
                    placeholder="$2999"
                    required
                  />
                </div>
                <div className="relative">
                  <p className="absolute  text-sm flex gap-1">
                    Category{" "}
                    <button onClick={() => setCategoryModal(true)}>
                      <FaCirclePlus className="text-blue-600 " />
                    </button>
                  </p>
                  <SelectButton
                    // title="Category"
                    label="category"
                    value={["TV", "PC", "GA", "PH"]}
                    className="text-sm"
                    onSelect={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="item-weight" className="block mb-1 text-sm font-medium">
                    Item Weight (kg)
                  </label>
                  <input
                    type="number"
                    name="item-weight"
                    id="item-weight"
                    className="px-4 py-2 bg-[#f3f5f5]/20 rounded-lg  w-full  text-black outline-none focus:ring-2 focus:border-transparent focus:outline-none border border-gray-300"
                    placeholder="12"
                    required
                  />
                </div>

                <div className="w-full">
                  <SelectButton
                    title="Return Policy"
                    label="returnPolicy"
                    value={["30", "10", "none"]}
                    className="text-sm"
                    onSelect={handleChange}
                  />
                </div>

                <div>
                  <SelectButton
                    title="Product State"
                    label="productState"
                    value={["new", "Refurbished"]}
                    className="text-sm"
                    onSelect={handleChange}
                  />
                </div>

                <div className="w-full ">
                  <label htmlFor="brand" className="block mb-1 text-sm font-medium ">
                    Color
                  </label>
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    className="px-4 py-2 bg-[#f3f5f5]/20 rounded-lg  w-full text-black outline-none focus:ring-2 focus:border-transparent focus:outline-none border border-gray-300 "
                    placeholder="Product color"
                    required
                  />
                </div>

                <div>
                  <SelectButton
                    title="Available"
                    label="available"
                    value={["true", "false"]}
                    className="text-sm"
                    onSelect={handleChange}
                  />
                </div>

                <CardDescription className="sm:col-span-2">
                  <label htmlFor="description" className="block mb-2 text-sm font-medium ">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    className="px-4 py-2 bg-[#f3f5f5]/20 rounded-lg w-full  text-black outline-none focus:ring-2 focus:border-transparent focus:outline-none border border-gray-300"
                    placeholder="Your description here"
                  ></textarea>
                </CardDescription>
              </CardContent>
            </Card>

            {/* Pricing Card */}
            <Card className="mt-6">
              <CardHead>
                <CardTitle>Pricing</CardTitle>
              </CardHead>
              <CardContent className="p-2 md:p-4">
                <div className="w-full">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium ">
                    Main Price
                  </label>
                  <input
                    type="number"
                    name="mainPrice"
                    id="mainPrice"
                    className="px-4 py-2 bg-[#f3f5f5]/20 rounded-lg  w-full text-black outline-none focus:ring-2 focus:border-transparent focus:outline-none border border-gray-300"
                    placeholder="Main Price"
                  />
                </div>
                <SelectButton
                  title="Discount Type"
                  label="discount"
                  value={["Select discount type", "Fixed price", "Percentage price"]}
                  className="text-sm mt-1  py-2"
                  onSelect={handleChange}
                  selectClassName="mt-2"
                />

                {discountType && (
                  <div className="mt-2">
                    <label htmlFor="discountValue" className="block mb-2 text-sm font-medium">
                      {discountType === "Fixed price"
                        ? "Set fixed price discount :"
                        : "Set percentage price discount :"}
                    </label>
                    <input
                      type="number"
                      name="discountValue"
                      id="discountValue"
                      className="px-4 py-2 bg-[#f3f5f5]/20 rounded-lg  w-full text-black outline-none focus:ring-2 focus:border-transparent focus:outline-none border border-gray-300"
                      placeholder={discountType === "Fixed price" ? "10" : "40%"}
                      value={inputValue}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Seo Meta */}
            <Card className="mt-6">
              <CardHead>
                <CardTitle>Seo / Meta</CardTitle>
              </CardHead>
              <CardContent className="p-2 md:p-4">
                <div className="w-full">
                  <label htmlFor="brand" className="block mb-2 text-sm font-medium ">
                    Title
                  </label>
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    className="px-4 py-2 bg-[#f3f5f5]/20 rounded-lg  w-full text-black outline-none focus:ring-2 focus:border-transparent focus:outline-none border border-gray-300"
                    placeholder="Meta tag title"
                    required
                  />
                </div>
                <div className="w-full mt-3">
                  <label htmlFor="description" className="block mb-2 text-sm font-medium ">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    className="px-4 py-2 bg-[#f3f5f5]/20 rounded-lg w-full  text-black outline-none focus:ring-2 focus:border-transparent focus:outline-none border border-gray-300"
                    placeholder="Meta tag description"
                  ></textarea>
                </div>

                <div className="w-full mt-2">
                  <label htmlFor="brand" className="block mb-2 text-sm font-medium ">
                    keywords
                  </label>
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    className="px-4 py-2 bg-[#f3f5f5]/20 rounded-lg  w-full text-black outline-none focus:ring-2 focus:border-transparent focus:outline-none border border-gray-300"
                    placeholder="Meta tag keywords"
                    required
                  />
                </div>
              </CardContent>
            </Card>
            <div className="lg:w-4/12 flex  md:col-span-1 border rounded-lg shadow-lg h-fit lg:hidden flex-col items-center mt-4 lg:mt-0">
              <div className="w-full   ">
                <CardHead>
                  <CardTitle>Upload Image</CardTitle>
                </CardHead>
              </div>

              <div className="w-full p-3">
                <UploadImageV3 />
              </div>
            </div>

            {addButton ? (
              <Button type="button" className="mt-4 rounded-lg w-full md:w-fit md:h-fit">
                Add Product
              </Button>
            ) : (
              ""
            )}
          </div>

          <div className="lg:w-4/12 hidden  md:col-span-1 border rounded-lg shadow-lg h-fit lg:flex flex-col items-center mt-4 lg:mt-0">
            <div className="w-full">
              <CardHead>
                <CardTitle>Upload Image</CardTitle>
              </CardHead>
            </div>
            <div className="w-full px-4 py-3">
              <UploadImageV3 />
            </div>
          </div>
        </div>
      </form>

      {categoryModal && (
        <CategoryModal
          handleClick={handleClick}
          setIsModalOpen={setCategoryModal}
          modalRef={modalRef}
          formData={categoryFormData}
          handleInputChange={handleInputChange}
        />
      )}

      {brandModal && (
        <BrandModal
          handleClick={handleClick}
          setIsModalOpen={setBrandModal}
          modalRef={modalRef}
          formData={brandFormData}
          handleInputChange={handleInputChange}
        />
      )}
    </section>
  );
};

export default ProductForm;
