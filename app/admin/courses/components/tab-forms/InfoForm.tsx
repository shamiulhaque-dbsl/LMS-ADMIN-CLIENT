import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Icons } from "@/components/Icons";
import Text from "@/components/ui/Text";

function SectionWrapper({ title, children }: any) {
  return (
    <div className="mb-6 rounded-lg border border-gray-200 p-4 shadow-sm">
      <Text as="div" className="mb-2 text-sm font-semibold sm:text-lg">
        {title}
      </Text>
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
        <div key={item.id} className="mb-3 flex w-full items-center gap-2">
          <Input type="text" name={`${name}[${idx}]`} placeholder={`${label}`} className="w-full" />
          {items.length > 1 && (
            <Button
              onClick={() => removeItem(item.id)}
              size="sm"
              className="rounded-md text-red-500 hover:bg-red-100"
            >
              <Icons.x size={16} />
            </Button>
          )}
        </div>
      ))}
      <Button onClick={addItem} className="p-0 text-sm text-blue-600 hover:text-blue-800">
        <Icons.plus size={16} className="mr-1" /> Add {label}
      </Button>
    </>
  );
}

function DynamicFaqList() {
  const [faqs, setFaqs] = useState([{ id: Date.now(), title: "", description: "" }]);
  const addFaq = () => setFaqs([...faqs, { id: Date.now(), title: "", description: "" }]);
  const removeFaq = (id: number) => setFaqs(faqs.filter((f) => f.id !== id));

  return (
    <>
      {faqs.map((faq, idx) => (
        <div key={faq.id} className="relative mb-4 rounded-md border border-gray-200 p-3 shadow-sm">
          <div className="mb-2 flex items-center justify-end">
            {faqs.length > 1 && (
              <Button
                onClick={() => removeFaq(faq.id)}
                size="sm"
                className="rounded-md text-red-500 hover:bg-red-100"
              >
                <Icons.x size={16} />
              </Button>
            )}
          </div>
          <input
            type="text"
            placeholder="FAQ Title"
            className="mb-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="FAQ Description"
            rows={3}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
      ))}

      <Button onClick={addFaq} className="p-0 text-sm text-blue-600 hover:text-blue-800">
        <Icons.plus size={16} className="mr-1" /> Add FAQ
      </Button>
    </>
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
    <>
      {projects.map((project, idx) => (
        <div
          key={project.id}
          className="relative mb-4 rounded-md border border-gray-200 p-3 shadow-sm"
        >
          <div className="mb-2 flex items-center justify-end">
            {projects.length > 1 && (
              <Button
                size="sm"
                onClick={() => removeProject(project.id)}
                className="text-red-500 hover:bg-red-100"
              >
                <Icons.x size={16} />
              </Button>
            )}
          </div>
          <Input type="text" placeholder="Project Title" className="mb-2" />
          <Input
            type="file"
            accept="image/*"
            className="mb-2 border-none text-sm text-gray-600 file:mr-4 
                       file:rounded-md file:border-0 file:bg-blue-50 file:text-sm 
                       file:font-medium file:text-blue-700 hover:file:bg-blue-100"
          />
          <textarea
            name="Project Description"
            placeholder="Project Description"
            rows={3}
            className="block w-full rounded-sm border border-slate-300 bg-transparent px-3 py-2 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-[#e74d2e77] focus:outline-none focus:ring-[#e74c2e] disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
          ></textarea>
        </div>
      ))}

      <Button onClick={addProject} className="p-0 text-sm text-blue-600 hover:text-blue-800">
        <Icons.plus size={16} className="mr-1" /> Add Project
      </Button>
    </>
  );
}

export const InfoForm = () => {
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
};

InfoForm.displayName = "InfoForm";
