import LoadingItem from "@/components/LoadingItem";

function Test() {
  const numberOfItems = 8;

  return (
    <div className="grid grid-cols-1 gap-6 px-10 md:px-16 pt-10 pb-6 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: numberOfItems }, (_, index) => (
        <LoadingItem key={index} />
      ))}
    </div>
  );
}

export default Test;
