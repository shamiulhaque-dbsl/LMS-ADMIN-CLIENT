import Text from "@/components/ui/Text";
export default function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <Text as="div" className="text-dark text-2xl font-semibold">
      {children}
    </Text>
  );
}
