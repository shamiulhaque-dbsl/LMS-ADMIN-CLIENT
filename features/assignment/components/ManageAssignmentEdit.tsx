import { Card } from "@/components/ui/Card";
import { use } from "react";
import { getAssignment } from "@/api/assignment";
import AssignmentEditForm from "./form/AssignmentEditForm";
import { ErrorMessage } from "@/components/ErrorMessage";

export default function ManageAssignmentEdit({ id }: { id: string }) {
    if (!id) {
        return (
            <ErrorMessage
                title="Assignment ID Missing"
                description="Please check back later or contact support."
            />
        );
    }

    const { data: assignment } = use(getAssignment(id));

    if (!assignment) {
        return (
            <ErrorMessage
                title="Assignment Not Found"
                description="Please check back later or contact support."
            />
        );
    }

    return (
        <Card className="bg-white p-6">
            <Card.Content className="max-w-xl">
                <AssignmentEditForm assignment={assignment} />
            </Card.Content>
        </Card>
    );
}
