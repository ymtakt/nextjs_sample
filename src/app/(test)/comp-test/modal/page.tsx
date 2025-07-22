"use client";

import { useState } from "react";
import ButtonModal from "@/components/general/Modals/ButtonModal";
import BaseButton from "@/components/general/Button/BaseButton";

export default function Home() {
  // コメント用
  const [sendComment, setSendComment] = useState("");
  const [inputComment, setInputComment] = useState("");
  const [showCommentModal, setShowCommentModal] = useState(false);
  // テキストボックス用
  const [sendText, setSendTextBox] = useState("");
  const [inputTextBox, setInputTextBox] = useState("");
  const [showTextBoxModal, setShowTextBoxModal] = useState(false);

  const handleLogout = () => {
    setSendComment(inputComment);
    setSendTextBox(inputTextBox);

    setShowCommentModal(false);
    setShowTextBoxModal(false);
  };
  return (
    <div className="ml-5 my-6  space-y-2 text-black">
      <h2 className="text-xl font-bold mb-4">📌 モーダル テスト</h2>
      <div className="flex">
        <div>
          <BaseButton
            onClick={() => setShowCommentModal(true)}
            text="コメント"
            color="cp-white"
            size="medium"
          />
        </div>
        <ButtonModal
          isOpen={showCommentModal}
          title="タイトル"
          leftButtonText="キャンセル"
          rightButtonText="送信"
          leftButtonColor="cp-white"
          rightButtonColor="cp-red"
          onRight={handleLogout}
          onLeft={() => setShowCommentModal(false)}
          isLine={true}
          isComment={true}
          inputComment={inputComment}
          commentLabel="コメント"
          onChangeComment={setInputComment}
        />
        <div className="mt-4 ml-2 text-sm flex">
          <p className="text-gray-600">送信したコメント：</p>
          <p className="text-cp-black">{sendComment}</p>
        </div>
      </div>
      <div className="flex">
        <div>
          <BaseButton
            onClick={() => setShowTextBoxModal(true)}
            text="テキストボックス"
            color="cp-white"
            size="medium"
          />
        </div>
        <ButtonModal
          isOpen={showTextBoxModal}
          title="タイトル"
          leftButtonText="キャンセル"
          rightButtonText="送信"
          leftButtonColor="cp-white"
          rightButtonColor="cp-red"
          onRight={handleLogout}
          onLeft={() => setShowTextBoxModal(false)}
          isLine={true}
          isTextBox={true}
          inputTextBox={inputTextBox}
          textBoxLabel="テキストボックス タイトル"
          textBoxPlaceholder="テキスト"
          onChangeTextBox={setInputTextBox}
        />
        <div className="mt-4 ml-2 text-sm flex">
          <p className="text-gray-600">送信したテキスト：</p>
          <p className="text-cp-black">{sendText}</p>
        </div>
      </div>
    </div>
  );
}
