import { Accordion } from "@/components/ui/Accordion";
import { Card } from "@/components/ui/Card";

export default function CourseFAQ() {
  return (
    <section id="faq">
      <Card className="max-w-full rounded-xl p-6">
        <Card.Title className="mb-4">Frequently Asked Questions</Card.Title>
        <Card.Content className="text-sm sm:text-base">
          <Accordion
            type="single"
            defaultValue="item-1"
            items={[
              {
                value: "item-1",
                trigger: "What prerequisites do I need for this course?",
                content:
                  "Basic knowledge of HTML, CSS, and JavaScript is required. Familiarity with React.js fundamentals will be helpful but not mandatory as we&apos;ll cover the basics. You&apos;ll need a computer with Node.js installed.",
              },
              {
                value: "item-2",
                trigger: "How long do I have access to the course?",
                content:
                  "You&apos;ll have lifetime access to all course materials, including future updates. You can learn at your own pace and revisit the content whenever you need.",
              },
              {
                value: "item-3",
                trigger: "Is there a certificate upon completion?",
                content:
                  "Yes, you&apos;ll receive a certificate of completion once you finish all course modules. This certificate can be shared on LinkedIn and other professional platforms.",
              },
              {
                value: "item-4",
                trigger: "What kind of support is available?",
                content:
                  "You&apos;ll have access to our community forum where you can ask questions and get help from other students and instructors. We also provide email support for technical issues.",
              },
              {
                value: "item-5",
                trigger: "Are the projects practical for a portfolio?",
                content:
                  "Absolutely! You&apos;ll build several real-world projects that you can add to your portfolio. These projects are designed to demonstrate your skills to potential employers.",
              },
            ]}
          />
        </Card.Content>
      </Card>
    </section>
  );
}
