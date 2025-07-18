"use client";

import StatusToast from "@/components/general/Toast";
import { useState } from "react";

export default function ToastPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showError, setShowError] = useState(false);

  return (
    <div className="p-6 space-y-6 text-black min-h-screen">
      <h2 className="text-xl font-bold mb-4">📌 Toast表示 テスト</h2>

      <div className="flex flex-col space-y-4 w-50">
        <button
          onClick={() => setShowSuccess(true)}
          className="px-4 py-2 bg-cp-sky-blue text-white rounded"
        >
          成功トースト
        </button>
        <button
          onClick={() => setShowWarning(true)}
          className="px-4 py-2 bg-orange-500 text-white rounded"
        >
          警告トースト
        </button>
        <button
          onClick={() => setShowError(true)}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          エラートースト
        </button>
      </div>

      <div className="space-y-4 mt-6">
        {showSuccess && (
          <StatusToast
            message="メールを送信しました"
            status="success"
            onClose={() => setShowSuccess(false)}
          />
        )}

        {showWarning && (
          <StatusToast
            message="xxxが未入力です"
            status="warning"
            onClose={() => setShowWarning(false)}
          />
        )}

        {showError && (
          <StatusToast
            message="通信に失敗しました"
            status="error"
            onClose={() => setShowError(false)}
          />
        )}
      </div>
    </div>
  );
}
