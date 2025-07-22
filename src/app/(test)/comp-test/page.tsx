import TextLink from "@/components/general/TextLink";

export default function Home() {
  return (
    <div className="ml-5 mt-6 text-black">
      <h2 className="text-xl font-bold mb-4">📌 コンポーネントの確認 リスト</h2>

      <div className="flex flex-col space-y-4">
        <TextLink href="/comp-test/base-button" size="large">
          ベースボタンの確認
        </TextLink>
        <TextLink href="/comp-test/cp-font" size="large">
          フォントの確認
        </TextLink>
        <TextLink href="/comp-test/text-link" size="large">
          テキストリンクの確認
        </TextLink>
        <TextLink href="/comp-test/pagination" size="large">
          ページネーションリンクの確認
        </TextLink>
        <TextLink href="/comp-test/toast" size="large">
          トーストの確認
        </TextLink>
        <TextLink href="/comp-test/text-box" size="large">
          テキストボックスの確認
        </TextLink>
        <TextLink href="/comp-test/comment-box" size="large">
          コメントボックス確認
        </TextLink>
        <TextLink href="/comp-test/drop-down" size="large">
          ドロップダウン確認
        </TextLink>
      </div>
    </div>
  );
}
