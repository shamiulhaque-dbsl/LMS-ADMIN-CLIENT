"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import ScrollableTabs from "@/components/ui/tabs/ScrollableTabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { Plus, X } from "lucide-react";

/*
    # TODO:
    - Make reuseable textarea, select & input, textarea, select etc. this css make reuseable
    - Implement form fields for each tab
    - Add validation logic for each tab
    - Handle form submission and reset
    - Implement searchble select box for category, instructor etc.
    - For state manage use zustand
*/

function SectionWrapper({ title, children }: any) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
      {children}
    </div>
  );
}

function DynamicInputList({ label, name }: any) {
  const [items, setItems] = useState([{ id: Date.now(), value: "" }]);

  const addItem = () => setItems([...items, { id: Date.now(), value: "" }]);
  const removeItem = (id: number) => setItems(items.filter((i) => i.id !== id));

  return (
    <>
      {items.map((item, idx) => (
        <div key={item.id} className="flex items-center gap-2 mb-3 w-full">
          <Input type="text" name={`${name}[${idx}]`} placeholder={`${label}`} className="w-full" />
          {items.length > 1 && (
            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="p-2 text-red-500 hover:bg-red-100 rounded-md"
            >
              <X size={16} />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="flex items-center text-sm text-blue-600 hover:text-blue-800"
      >
        <Plus size={16} className="mr-1" /> Add {label}
      </button>
    </>
  );
}

function DynamicFaqList() {
  const [faqs, setFaqs] = useState([{ id: Date.now(), title: "", description: "" }]);
  const addFaq = () => setFaqs([...faqs, { id: Date.now(), title: "", description: "" }]);
  const removeFaq = (id: number) => setFaqs(faqs.filter((f) => f.id !== id));

  return (
    <div>
      {faqs.map((faq, idx) => (
        <div key={faq.id} className="mb-4 p-3 border border-gray-200 rounded-md shadow-sm relative">
          <div className="flex justify-end items-center mb-2">
            {faqs.length > 1 && (
              <button
                type="button"
                onClick={() => removeFaq(faq.id)}
                className="text-red-500 hover:bg-red-100 p-1 rounded-md"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <input
            type="text"
            placeholder="FAQ Title"
            className="w-full mb-2 rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="FAQ Description"
            rows={3}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
      ))}
      <button
        type="button"
        onClick={addFaq}
        className="flex items-center text-sm text-blue-600 hover:text-blue-800"
      >
        <Plus size={16} className="mr-1" /> Add FAQ
      </button>
    </div>
  );
}

function DynamicProjectList() {
  const [projects, setProjects] = useState([
    { id: Date.now(), title: "", image: "", description: "" },
  ]);
  const addProject = () =>
    setProjects([...projects, { id: Date.now(), title: "", image: "", description: "" }]);
  const removeProject = (id: number) => setProjects(projects.filter((p) => p.id !== id));

  return (
    <div>
      {projects.map((project, idx) => (
        <div
          key={project.id}
          className="mb-4 p-3 border border-gray-200 rounded-md shadow-sm relative"
        >
          <div className="flex justify-end items-center mb-2">
            {projects.length > 1 && (
              <Button
                size="sm"
                onClick={() => removeProject(project.id)}
                className="text-red-500 hover:bg-red-100"
              >
                <X size={16} />
              </Button>
            )}
          </div>
          <Input type="text" placeholder="Project Title" className="mb-2" />
          <Input
            type="file"
            accept="image/*"
            className="mb-2 border-none text-sm text-gray-600 file:mr-4 
                       file:rounded-md file:border-0 file:text-sm file:font-medium 
                       file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <textarea
            name="Project Description"
            placeholder="Project Description"
            rows={3}
            className="border bg-transparent px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-[#e74d2e77] focus:ring-[#e74c2e] block w-full rounded-sm border-slate-300 shadow-sm sm:text-sm"
          ></textarea>
        </div>
      ))}
      <button
        type="button"
        onClick={addProject}
        className="flex items-center text-sm text-blue-600 hover:text-blue-800"
      >
        <Plus size={16} className="mr-1" /> Add Project
      </button>
    </div>
  );
}

function BasicInfoForm() {
  return (
    <div className="space-y-5">
      <Input label="Course Title" name="title" placeholder="Enter course title" required />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="short_description">
          Short Description
        </label>
        <textarea
          name="short_description"
          placeholder="Enter short course description"
          className="h-10 border bg-transparent px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-[#e74d2e77] focus:ring-[#e74c2e] block w-full rounded-sm border-slate-300 shadow-sm sm:text-sm"
          required
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="short_description">
          Short Description
        </label>
        <textarea
          name="long_description"
          placeholder="Enter long course description"
          className="h-10 border bg-transparent px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-[#e74d2e77] focus:ring-[#e74c2e] block w-full rounded-sm border-slate-300 shadow-sm sm:text-sm"
          required
        ></textarea>
      </div>
      <div className="flex justify-between gap-4">
        <div className="w-full">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="short_description"
          >
            Course Type
          </label>
          <select className="h-10 border bg-transparent px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-[#e74d2e77] focus:ring-[#e74c2e] block w-full rounded-sm border-slate-300 shadow-sm sm:text-sm">
            <option value="live">Live</option>
            <option value="recorded">Recorded</option>
            <option value="blended">Blended</option>
          </select>
        </div>
        <div className="w-full">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="short_description"
          >
            Category
          </label>
          <select className="h-10 border bg-transparent px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-[#e74d2e77] focus:ring-[#e74c2e] block w-full rounded-sm border-slate-300 shadow-sm sm:text-sm">
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <div className="w-full">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="short_description"
          >
            Skill Level
          </label>
          <select className="h-10 border bg-transparent px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-[#e74d2e77] focus:ring-[#e74c2e] block w-full rounded-sm border-slate-300 shadow-sm sm:text-sm">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="status">
            Course Status
          </label>
          <select className="h-10 border bg-transparent px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-[#e74d2e77] focus:ring-[#e74c2e] block w-full rounded-sm border-slate-300 shadow-sm sm:text-sm">
            <option value="active">Active</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Make ui with toggle system with this lavel: Course Forum, Downloadable Content, Certificate Available  */}
      <div className="space-y-4 border border-gray-200 p-4 rounded-md">
        <div className="flex items-center">
          <input type="checkbox" id="course_forum" className="mr-2" />
          <label htmlFor="course_forum" className="text-sm text-gray-700">
            Course Forum
          </label>
        </div>
        <div className="flex items-center">
          <input type="checkbox" id="downloadable_content" className="mr-2" />
          <label htmlFor="downloadable_content" className="text-sm text-gray-700">
            Downloadable Content
          </label>
        </div>
        <div className="flex items-center">
          <input type="checkbox" id="certificate_available" className="mr-2" />
          <label htmlFor="certificate_available" className="text-sm text-gray-700">
            Certificate Available
          </label>
        </div>
      </div>
    </div>
  );
}

function InfoForm() {
  return (
    <div className="space-y-6">
      <SectionWrapper title="Course Requirements">
        <DynamicInputList label="Requirement" name="requirements" />
      </SectionWrapper>

      <SectionWrapper title="What You'll Learn">
        <DynamicInputList label="Learning Outcome" name="learning" />
      </SectionWrapper>

      <SectionWrapper title="Who This Course is For">
        <DynamicInputList label="Target Audience" name="audience" />
      </SectionWrapper>

      <SectionWrapper title="FAQs">
        <DynamicFaqList />
      </SectionWrapper>

      <SectionWrapper title="Projects">
        <DynamicProjectList />
      </SectionWrapper>
    </div>
  );
}

function MediaForm() {
  return <div>Settings Form (to be implemented)</div>;
}

function PricingForm() {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="isFree"
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="isFree" className="ml-2 block text-sm text-gray-700">
          Check if this is a free course
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Course Price" type="number" step="0.01" placeholder="Enter course price" />
        <Input
          label="Discounted price (if applicable)"
          type="number"
          placeholder="Enter discounted price"
        />
        {/* Implement radio box of Expiry period: Lifetime or limited time */}
        <div className="col-span-3 md:col-span-2 space-y-2">
          <label className="block text-sm font-medium text-gray-700">Expiry Period</label>
          <div className="flex gap-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="expiry_lifetime"
                name="expiry"
                value="lifetime"
                className="mr-2"
              />
              <label htmlFor="expiry_lifetime" className="text-sm text-gray-700">
                Lifetime
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="expiry_limited"
                name="expiry"
                value="limited"
                className="mr-2"
              />
              <label htmlFor="expiry_limited" className="text-sm text-gray-700">
                Limited Time
              </label>
            </div>
          </div>
        </div>
        <Input label="Course Duration" placeholder="E.g., 10 hours" />
        <Input label="Number of Lectures" type="number" placeholder="E.g., 20" />
      </div>
    </div>
  );
}

function SeoForm() {
  return <div>SEO Form (to be implemented)</div>;
}

export default function ManageCourseCreation() {
  const [activeTab, setActiveTab] = useState("basic");
  const tabs = [
    { id: "basic", label: "Basic" },
    { id: "info", label: "Info" },
    { id: "pricing", label: "Pricing" },
    { id: "media", label: "Media" },
    { id: "seo", label: "SEO" },
    { id: "finish", label: "Review & Submit" },
  ];
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    images: [],
    category: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const validateTab = (tabId: string) => {
    const errors = {};
    switch (tabId) {
      case "basic":
        if (!formData.title) errors.title = "Title is required";
        if (!formData.description) errors.description = "Description is required";
        break;
      case "pricing":
        if (!formData.price || formData.price <= 0) errors.price = "Valid price is required";
        break;
      case "media":
        if (formData.images.length === 0) errors.images = "At least one image is required";
        break;
    }
    return errors;
  };

  const getTabStatus = (tabId: string) => {
    if (tabId === "finish") return "default";
    const errors = validateTab(tabId);
    return Object.keys(errors).length === 0 ? "complete" : "incomplete";
  };

  const canProceedToNext = (currentTab: string) => {
    if (currentTab === "finish") return true;
    return getTabStatus(currentTab) === "complete";
  };

  const handleNext = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Validate all tabs
    const allErrors = {};
    tabs.slice(0, -1).forEach((tab) => {
      const errors = validateTab(tab.id);
      Object.assign(allErrors, errors);
    });

    if (Object.keys(allErrors).length === 0) {
      alert("Course created successfully! 🎉");
    } else {
      setValidationErrors(allErrors);
    }
  };

  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      duration: "",
      images: [],
      category: "",
    });
    setValidationErrors({});
    setActiveTab("basic");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return <BasicInfoForm />;
      case "info":
        return <InfoForm />;
      case "settings":
        return <MediaForm />;
      case "pricing":
        return <PricingForm />;
      case "seo":
        return <SeoForm />;
      default:
        return null;
    }
  };

  return (
    <Card className="bg-white border-none">
      {/* Tab Header */}
      <Card.Header className="rounded-t-xl p-2">
        <ScrollableTabs
          tabs={tabs}
          value={activeTab}
          onValueChange={setActiveTab}
          showScrollButtons={false}
          size="sm"
        />
      </Card.Header>

      {/* Tab Content */}
      <div className="my-6 max-w-4xl mx-auto p-4">{renderTabContent()}</div>

      {/* Bottom Navigation */}
      <div className="border-t border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            {activeTab !== "basic" && (
              <button
                type="button"
                onClick={handlePrevious}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-sm hover:bg-gray-50"
              >
                Previous
              </button>
            )}
          </div>

          <div className="flex space-x-3">
            {activeTab === "finish" ? (
              <>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-sm hover:bg-gray-50"
                >
                  Reset Form
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-sm hover:bg-blue-700"
                >
                  Create Course
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceedToNext(activeTab)}
                className={`
                      px-4 py-2 text-sm font-medium rounded-sm
                      ${
                        canProceedToNext(activeTab)
                          ? "text-white bg-blue-600 hover:bg-blue-700"
                          : "text-gray-400 bg-gray-100 cursor-not-allowed"
                      }
                    `}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
