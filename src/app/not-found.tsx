import Header from "@/components/general/Header";

const userName = "ユーザー名";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col">
      <Header userName={userName} />

      {/* 中央コンテンツ */}
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4 text-cp-black text-[50px]">
          <p>404 Not Found</p>
          <p>ページが見つかりません</p>
        </div>
      </main>
    </div>
  );
}
