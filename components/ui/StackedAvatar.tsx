import PlacehodlerIcon from "./PlaceholderIcon";
export default function StackedAvatar() {
  return (
    <>
      <div className="flex -space-x-4 rtl:space-x-reverse">
        <PlacehodlerIcon />
        <PlacehodlerIcon />
        <PlacehodlerIcon />
      </div>
    </>
  );
}
