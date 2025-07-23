import { mockUserDetails } from "@/mocks/userDetails";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default function UserDetailPage({ params }: Props) {
  const userId = parseInt(params.id, 10);
  const user = mockUserDetails.find((u) => u.id === userId);

  if (!user) return notFound();

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4 text-cp-black bg-cp-white">
      <h1 className="text-xl font-bold">食事記録</h1>
    </div>
  );
}
