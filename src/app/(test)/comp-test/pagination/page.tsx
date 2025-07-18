import Pagination from "@/components/general/Pagination";

export default function Home() {
  return (
    <div className="ml-5 mt-6 text-black">
      <h2 className="text-xl font-bold mb-4">📌 ページネーションの確認</h2>

      <div className="flex flex-col space-y-4">
        <Pagination number={1}></Pagination>
        <Pagination number={2} active={true}></Pagination>
        <Pagination number={3}></Pagination>
        <Pagination number={4} active={true}></Pagination>
        <Pagination number={5}></Pagination>
      </div>
    </div>
  );
}
