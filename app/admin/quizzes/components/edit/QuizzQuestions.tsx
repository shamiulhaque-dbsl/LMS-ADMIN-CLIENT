import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/grid";
import Text from "@/components/ui/Text";
import { Tooltip } from "@/components/ui/Tooltip";
import { useModalStore } from "@/stores/modal-store";
import { QuestionModal } from "./QuestionModal";
export const QuizzQuestions = () => {
  const openModal = useModalStore((state) => state.openModal);

  return (
    <>
      <Grid>
        <Card className="bg-gray-300/30 rounded-md border-none">
          <Card.Content className="p-3 flex items-center justify-between flex-wrap gap-2">
            <div className="text-sm space-x-1 leading-tight">
              <Text as="span" variant="primary">
                The Bootstrap grid system is based on how many columns?
              </Text>
            </div>

            <div className="flex items-center justify-end">
              <Tooltip content="Edit">
                <Button
                  size="sm"
                  className="px-2 text-indigo-700"
                  onClick={() => openModal("question-edit-modal")}
                >
                  <Icons.edit size={16} />
                </Button>
              </Tooltip>
              <Tooltip content="Delete">
                <Button size="sm" className="px-2 text-red-400">
                  <Icons.trash size={16} />
                </Button>
              </Tooltip>
            </div>
          </Card.Content>
        </Card>
        <Card className="bg-gray-300/30 rounded-md border-none">
          <Card.Content className="p-3 flex items-center justify-between flex-wrap gap-2">
            <div className="text-sm space-x-1 leading-tight">
              <Text as="span" variant="primary">
                The Bootstrap grid system is based on how many columns?
              </Text>
            </div>

            <div className="flex items-center justify-end">
              <Tooltip content="Edit">
                <Button size="sm" className="px-2 text-indigo-700">
                  <Icons.edit size={16} />
                </Button>
              </Tooltip>
              <Tooltip content="Delete">
                <Button size="sm" className="px-2 text-red-400">
                  <Icons.trash size={16} />
                </Button>
              </Tooltip>
            </div>
          </Card.Content>
        </Card>
        <Card className="bg-gray-300/30 rounded-md border-none">
          <Card.Content className="p-3 flex items-center justify-between flex-wrap gap-2">
            <div className="text-sm space-x-1 leading-tight">
              <Text as="span" variant="primary">
                The Bootstrap grid system is based on how many columns?
              </Text>
            </div>

            <div className="flex items-center justify-end">
              <Tooltip content="Edit">
                <Button size="sm" className="px-2 text-indigo-700">
                  <Icons.edit size={16} />
                </Button>
              </Tooltip>
              <Tooltip content="Delete">
                <Button size="sm" className="px-2 text-red-400">
                  <Icons.trash size={16} />
                </Button>
              </Tooltip>
            </div>
          </Card.Content>
        </Card>
        <Card className="bg-gray-300/30 rounded-md border-none">
          <Card.Content className="p-3 flex items-center justify-between flex-wrap gap-2">
            <div className="text-sm space-x-1 leading-tight">
              <Text as="span" variant="primary">
                The Bootstrap grid system is based on how many columns?
              </Text>
            </div>

            <div className="flex items-center justify-end">
              <Tooltip content="Edit">
                <Button size="sm" className="px-2 text-indigo-700">
                  <Icons.edit size={16} />
                </Button>
              </Tooltip>
              <Tooltip content="Delete">
                <Button size="sm" className="px-2 text-red-400">
                  <Icons.trash size={16} />
                </Button>
              </Tooltip>
            </div>
          </Card.Content>
        </Card>
      </Grid>

      {/* Queston Edit Modal */}
      <QuestionModal
        id="question-edit-modal"
        question={{
          title: "What is React?",
          description: "A question about React library",
          questionType: "multiple_choice",
          point: "5",
          options: [
            { id: 1, value: "A framework", isCorrect: false },
            { id: 2, value: "A library", isCorrect: true },
            { id: 3, value: "A programming language", isCorrect: false },
          ],
        }}
      />
    </>
  );
};
