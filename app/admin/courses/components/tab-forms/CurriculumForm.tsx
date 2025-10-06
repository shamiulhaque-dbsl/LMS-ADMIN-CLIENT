import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Tooltip } from "@/components/ui/Tooltip";
import { Plus } from "lucide-react";
import Text from "@/components/ui/Text";
import { Grid } from "@/components/ui/grid";
import { SectionModal } from "../modals/SectionModal";
import { LessonModal } from "../modals/LessonModal";
import { useState } from "react";

export const CurriculumForm = () => {
  const [openSectionModal, setOpenSectionModal] = useState(false);
  const [openLessonModal, setOpenLessonModal] = useState(false);
  const [openSortModal, setOpenSortModal] = useState(false);
  const [sections, setSections] = useState([{ id: "1", title: "Getting Started" }]);

  const handleAddSection = (data: any) => {
    setSections((prev) => [...prev, { id: String(prev.length + 1), title: data.title }]);
  };

  const handleAddLesson = (data: any) => {
    console.log("Lesson saved:", data);
  };

  return (
    <div className="py-4">
      {/* Top Actions Buttons */}
      <div className="flex items-center justify-center flex-wrap gap-4">
        <Button
          size="sm"
          className="border border-gray-300 rounded-full"
          onClick={() => setOpenSectionModal(true)}
        >
          <Plus size={16} />
          <Text as="span" className="ml-2">
            Add Section
          </Text>
        </Button>
        <Button
          size="sm"
          className="border border-gray-300 rounded-full"
          onClick={() => setOpenLessonModal(true)}
        >
          <Plus size={16} />
          <Text as="span" className="ml-2">
            Add Lesson
          </Text>
        </Button>
        <Button size="sm" className="border border-gray-300 rounded-full">
          <Plus size={16} />{" "}
          <Text as="span" className="ml-2">
            Sort Section
          </Text>
        </Button>
      </div>

      {/* Section List with Lessons List */}
      <div className="mt-12 space-y-8">
        <div className="bg-blue-200/20 p-4 rounded-md">
          {/* Section Title with Actions */}
          <div className="flex items-center justify-between flex-wrap gap-2 mb-8">
            <div className="text-sm space-x-1">
              <Text as="span">Section 1:</Text>
              <Text as="span" className="font-semibold" variant="primary">
                Getting Started With This Course
              </Text>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end flex-wrap gap-4">
              <Button size="sm" className="border border-gray-300 rounded-full space-x-2">
                <Icons.arrowDownUp size={16} />
                <Text as="span">Sort Lesson</Text>
              </Button>
              <Button size="sm" className="border border-gray-300 rounded-full space-x-2">
                <Icons.edit size={16} />
                <Text as="span">Edit Lesson</Text>
              </Button>
              <Button size="sm" className="border border-gray-300 rounded-full space-x-2">
                <Icons.trash size={16} />
                <Text as="span">Delete Section</Text>
              </Button>
            </div>
          </div>

          {/* Section Lessons */}
          <Grid>
            <Card className="bg-white rounded-md border-none">
              <Card.Content className="p-3 flex items-center justify-between flex-wrap gap-2">
                <div className="text-sm space-x-1 leading-tight">
                  <Text as="span">Lesson 1:</Text>
                  <Text as="span" variant="primary">
                    Getting Started With This Course
                  </Text>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end">
                  <Tooltip content="Edit">
                    <Button size="sm" className="px-2 text-indigo-400">
                      <Icons.fileText size={16} />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Resources Files">
                    <Button size="sm" className="px-2  text-indigo-700">
                      <Icons.edit size={16} />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Delete">
                    <Button size="sm" className="px-2  text-red-400">
                      <Icons.trash size={16} />
                    </Button>
                  </Tooltip>
                </div>
              </Card.Content>
            </Card>
            <Card className="bg-white rounded-md border-none">
              <Card.Content className="p-3 flex items-center justify-between flex-wrap gap-2">
                <div className="text-sm space-x-1 leading-tight">
                  <Text as="span">Lesson 1:</Text>
                  <Text as="span" variant="primary">
                    Getting Started With This Course
                  </Text>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end">
                  <Tooltip content="Edit">
                    <Button size="sm" className="px-2 text-indigo-400">
                      <Icons.fileText size={16} />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Resources Files">
                    <Button size="sm" className="px-2  text-indigo-700">
                      <Icons.edit size={16} />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Delete">
                    <Button size="sm" className="px-2  text-red-400">
                      <Icons.trash size={16} />
                    </Button>
                  </Tooltip>
                </div>
              </Card.Content>
            </Card>
          </Grid>
        </div>

        <div className="bg-blue-200/20 p-4 rounded-md">
          {/* Section Title with Actions */}
          <div className="flex items-center justify-between flex-wrap gap-2 mb-8">
            <div className="text-sm space-x-1">
              <Text as="span">Section 1:</Text>
              <Text as="span" className="font-semibold" variant="primary">
                Getting Started With This Course
              </Text>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end flex-wrap gap-4">
              <Button size="sm" className="border border-gray-300 rounded-full space-x-2">
                <Icons.arrowDownUp size={16} />
                <Text as="span">Sort Lesson</Text>
              </Button>
              <Button size="sm" className="border border-gray-300 rounded-full space-x-2">
                <Icons.edit size={16} />
                <Text as="span">Edit Lesson</Text>
              </Button>
              <Button size="sm" className="border border-gray-300 rounded-full space-x-2">
                <Icons.trash size={16} />
                <Text as="span">Delete Section</Text>
              </Button>
            </div>
          </div>

          {/* Section Lessons */}
          <Grid>
            <Card className="bg-white rounded-md border-none">
              <Card.Content className="p-3 flex items-center justify-between flex-wrap gap-2">
                <div className="text-sm space-x-1 leading-tight">
                  <Text as="span">Lesson 1:</Text>
                  <Text as="span" variant="primary">
                    Getting Started With This Course
                  </Text>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end">
                  <Tooltip content="Edit">
                    <Button size="sm" className="px-2 text-indigo-400">
                      <Icons.fileText size={16} />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Resources Files">
                    <Button size="sm" className="px-2  text-indigo-700">
                      <Icons.edit size={16} />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Delete">
                    <Button size="sm" className="px-2  text-red-400">
                      <Icons.trash size={16} />
                    </Button>
                  </Tooltip>
                </div>
              </Card.Content>
            </Card>
            <Card className="bg-white rounded-md border-none">
              <Card.Content className="p-3 flex items-center justify-between flex-wrap gap-2">
                <div className="text-sm space-x-1 leading-tight">
                  <Text as="span">Lesson 1:</Text>
                  <Text as="span" variant="primary">
                    Getting Started With This Course
                  </Text>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end">
                  <Tooltip content="Edit">
                    <Button size="sm" className="px-2 text-indigo-400">
                      <Icons.fileText size={16} />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Resources Files">
                    <Button size="sm" className="px-2  text-indigo-700">
                      <Icons.edit size={16} />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Delete">
                    <Button size="sm" className="px-2  text-red-400">
                      <Icons.trash size={16} />
                    </Button>
                  </Tooltip>
                </div>
              </Card.Content>
            </Card>
          </Grid>
        </div>
        <div className="bg-blue-200/20 p-4 rounded-md">
          {/* Section Title with Actions */}
          <div className="flex items-center justify-between flex-wrap gap-2 mb-8">
            <div className="text-sm space-x-1">
              <Text as="span">Section 1:</Text>
              <Text as="span" className="font-semibold" variant="primary">
                Getting Started With This Course
              </Text>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end flex-wrap gap-4">
              <Button size="sm" className="border border-gray-300 rounded-full space-x-2">
                <Icons.arrowDownUp size={16} />
                <Text as="span">Sort Lesson</Text>
              </Button>
              <Button size="sm" className="border border-gray-300 rounded-full space-x-2">
                <Icons.edit size={16} />
                <Text as="span">Edit Lesson</Text>
              </Button>
              <Button size="sm" className="border border-gray-300 rounded-full space-x-2">
                <Icons.trash size={16} />
                <Text as="span">Delete Section</Text>
              </Button>
            </div>
          </div>

          {/* Section Lessons */}
          <Grid>
            <Card className="bg-white rounded-md border-none">
              <Card.Content className="p-3 flex items-center justify-between flex-wrap gap-2">
                <div className="text-sm space-x-1 leading-tight">
                  <Text as="span">Lesson 1:</Text>
                  <Text as="span" variant="primary">
                    Getting Started With This Course
                  </Text>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end">
                  <Tooltip content="Edit">
                    <Button size="sm" className="px-2 text-indigo-400">
                      <Icons.fileText size={16} />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Resources Files">
                    <Button size="sm" className="px-2  text-indigo-700">
                      <Icons.edit size={16} />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Delete">
                    <Button size="sm" className="px-2  text-red-400">
                      <Icons.trash size={16} />
                    </Button>
                  </Tooltip>
                </div>
              </Card.Content>
            </Card>
            <Card className="bg-white rounded-md border-none">
              <Card.Content className="p-3 flex items-center justify-between flex-wrap gap-2">
                <div className="text-sm space-x-1 leading-tight">
                  <Text as="span">Lesson 1:</Text>
                  <Text as="span" variant="primary">
                    Getting Started With This Course
                  </Text>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end">
                  <Tooltip content="Edit">
                    <Button size="sm" className="px-2 text-indigo-400">
                      <Icons.fileText size={16} />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Resources Files">
                    <Button size="sm" className="px-2  text-indigo-700">
                      <Icons.edit size={16} />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Delete">
                    <Button size="sm" className="px-2  text-red-400">
                      <Icons.trash size={16} />
                    </Button>
                  </Tooltip>
                </div>
              </Card.Content>
            </Card>
          </Grid>
        </div>
      </div>

      {openSectionModal && (
        <SectionModal
          open={openSectionModal}
          onClose={() => setOpenSectionModal(false)}
          onSave={handleAddSection}
        />
      )}

      {openLessonModal && (
        <LessonModal
          open={openLessonModal}
          onClose={() => setOpenLessonModal(false)}
          onSave={handleAddLesson}
          sectionOptions={sections}
        />
      )}
    </div>
  );
};

CurriculumForm.displayName = "CurriculumForm";
