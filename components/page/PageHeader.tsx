import PageTitle from "./PageTitle";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Card } from "@/components/ui/Card";
import { memo } from "react";

type PageHeaderProps = {
  title: string;
  showBreadcrumb?: boolean;
};

export const PageHeader = memo(function PageHeader({
  title,
  showBreadcrumb = true,
}: PageHeaderProps) {
  return (
    <Card className="mb-6 flex items-center justify-between border-none">
      <PageTitle>{title}</PageTitle>
      {showBreadcrumb && <Breadcrumb mode="portal" />}
    </Card>
  );
});

PageHeader.displayName = "PageHeader";
