import TextLink from "@/components/general/TextLink";

export default function Home() {
  return (
    <div className="ml-5 mt-6 text-black">
      <h2 className="text-xl font-bold mb-4">📌 テキストリンクの確認</h2>

      <div className="flex flex-col space-y-2">
        <TextLink href="/comp-test/text-link" size="small">
          サイズ小
        </TextLink>
        <TextLink href="/comp-test/text-link" size="large">
          サイズ大
        </TextLink>
        <TextLink href="/comp-test/text-link" color="cp-black">
          cp-black 小
        </TextLink>
        <TextLink href="/comp-test/text-link" color="cp-sky-blue">
          cp-sky-blue 小
        </TextLink>
        <TextLink href="/comp-test/text-link" color="cp-dark-blue">
          cp-dark-blue 小
        </TextLink>
        <TextLink href="/comp-test/text-link" color="cp-black" size="large">
          cp-black 大
        </TextLink>
        <TextLink href="/comp-test/text-link" color="cp-sky-blue" size="large">
          cp-sky-blue 大
        </TextLink>
        <TextLink href="/comp-test/text-link" color="cp-dark-blue" size="large">
          cp-dark-blue 大
        </TextLink>
        <TextLink href="/comp-test/text-link" underline={false}>
          アンダーライン=false
        </TextLink>
      </div>
    </div>
  );
}
