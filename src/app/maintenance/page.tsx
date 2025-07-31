import Header from "@/components/general/Header";
import Image from "next/image";

const userName = "ユーザー名";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col">
      <Header userName={userName} />

      {/* 中央コンテンツ */}
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4 text-cp-black bg-cp-white h-[500px] w-[410px]">
          <div className="flex justify-center items-center pt-10 pb-2.5">
            <Image
              src="/maintenance.svg"
              alt="ミラレル"
              width={180}
              height={180}
            />
          </div>
          <p className="headline-cp-large pb-10">システムメンテナンス中です</p>
          <p className="body-cp-medium pb-10">
            現在システムメンテナンスを行っているため、
            <br /> 利用停止しています。
            <br /> ご不便をおかけいたしますが、
            <br /> ご理解の程よろしくお願い申し上げます。
          </p>
        </div>
      </main>
    </div>
  );
}
