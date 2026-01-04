import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Grid } from "@/components/ui/grid";
import Text from "@/components/ui/Text";
import { Tooltip } from "@/components/ui/Tooltip";
import { useModalStore } from "@/stores/modal-store";
import { QuestionModal } from "./QuestionModal";
import { toast } from "sonner";
import { useConfirmDialog } from "@/stores/confirmDialog";
import { useQuizQuestionAction } from "../hooks/useQuizQuesAction";
export const QuizzQuestions = ({ quizQuestions, quizId = undefined }: any) => {
  const openModal = useModalStore((state) => state.openModal);
  const isOpen = useModalStore((state) => state.isOpen("question-edit-modal"));
  const { removeQuestion } = useQuizQuestionAction();
  const { openDialog } = useConfirmDialog();

  const handleDelete = async (questionId: number) => {
    const result = await removeQuestion(quizId, questionId);
    if (result && !result.success) {
      toast.error(result.message || "Failed to delete question");
      return;
    }
    toast.success("Question deleted successfully");
  };

  return (
    <>
      <Grid>
        {quizQuestions.map((question: any) => (
          <Card className="rounded-md border-none bg-gray-300/30" key={question.id}>
            <Card.Content className="flex flex-wrap items-center justify-between gap-2 p-3">
              <div className="space-x-1 text-sm leading-tight">
                <Text as="span" variant="primary">
                  {question?.question}
                </Text>
              </div>

              <div className="flex items-center justify-end">
                <Tooltip content="Edit">
                  <Button
                    size="sm"
                    className="px-2 text-indigo-700"
                    onClick={() =>
                      openModal("question-edit-modal", {
                        quizId: question.quizId,
                        question: question,
                      })
                    }
                  >
                    <Icons.edit size={16} />
                  </Button>
                </Tooltip>
                <Tooltip content="Delete">
                  <Button
                    size="sm"
                    className="px-2 text-red-400"
                    onClick={() =>
                      openDialog({
                        title: "Delete Category",
                        message: `Are you sure you want to delete "${question.question}"?`,
                        confirmText: "Yes, Delete",
                        cancelText: "Cancel",
                        onConfirm: () => handleDelete(question.id),
                      })
                    }
                  >
                    <Icons.trash size={16} />
                  </Button>
                </Tooltip>
              </div>
            </Card.Content>
          </Card>
        ))}
      </Grid>

      {/* Queston Edit Modal */}
      {isOpen && <QuestionModal id="question-edit-modal" />}
    </>
  );
};
