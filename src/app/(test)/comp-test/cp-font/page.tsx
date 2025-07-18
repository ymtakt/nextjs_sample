export default function Home() {
  return (
    <div className="ml-5 mt-6 text-black">
      <h2 className="text-xl font-bold mb-4">📌 Font Style リスト</h2>

      <h3 className="text-lg font-semibold mt-6 mb-2">✅ headline</h3>
      <ul className="list-disc ml-6 space-y-2">
        <li className="headline-cp-large">
          headlineLarge: NotoSansJP-Bold-20px
          <br />
          用途：h1、モーダルタイトル
        </li>
        <li className="headline-cp-medium">
          headlineMedium: NotoSansJP-Bold-16px
          <br />
          用途：h2、サイドメニュータイトル、ページタイトル、項目名
        </li>
        <li className="headline-cp-small">
          headlineSmall: NotoSansJP-Regular-16px
          <br />
          用途：h3、サイドメニューサブタイトル
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-2">✅ title</h3>
      <ul className="list-disc ml-6 space-y-2">
        <li className="title-cp-large">
          titleLarge: NotoSansJP-Bold-16px
          <br />
          用途：ボタン、フォームタイトル、タブ名、サプリ記録表示日付
        </li>
        <li className="title-cp-small">
          titleSmall: NotoSansJP-Bold-14px
          <br />
          用途：表カラム名
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-2">✅ body</h3>
      <ul className="list-disc ml-6 space-y-2">
        <li className="body-cp-large">
          bodyLarge: NotoSansJP-Bold-16px
          <br />
          用途：トーストメッセージ、テキストリンク大、モーダル本文大
        </li>
        <li className="body-cp-medium">
          bodyMedium: NotoSansJP-Regular-16px
          <br />
          用途：テキストリンク小、モーダル本文小、ログイン中ユーザー名、本文、ドロップダウンテキスト、ドロップダウン選択肢大、コメント、ログインフォームプレースホルダー、ログインフォーム入力内容
        </li>
        <li className="body-cp-small">
          bodySmall: NotoSansJP-Regular-14px
          <br />
          用途：検索フォーム名、テキストフォームプレースホルダー、テキストフォーム入力内容、表の件数表示、表本文、表内ボタン、CSVアップロードタイトル、文字数制限、フォーム入力テキスト、摂取サプリ名、ラジオボタン選択肢、必須ラベル、内容確認内容、ドロップダウンテキスト、ドロップダウン選択肢小
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-2">✅ label</h3>
      <ul className="list-disc ml-6 space-y-2">
        <li className="label-cp-large">
          labelLarge: NotoSansJP-Bold-16px / LineHeight: 16px
          <br />
          用途：数字ボタン
        </li>
        <li className="label-cp-medium">
          labelMedium: NotoSansJP-Regular-12px
          <br />
          用途：コメント記入者名、表中サプリ摂取時刻
        </li>
      </ul>
    </div>
  );
}
