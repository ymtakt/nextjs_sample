"use client";

// ネイティブライブラリ
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// 共通コンポーネント
import BaseButton from "@/components/general/Button/BaseButton";
import { ROUTES } from "@/constants/routes";
// featureコンポーネント
import {
  MIrallelVideo,
  mockMIrallelVideos,
} from "@/features/video-management/mocks/videos";
import VideoAddKeyword from "@/features/video-management/components/VideoKeyword";
import VideoSearchForm, {
  VideoSearchParams,
} from "@/features/video-management/components/VideoSearch";
import VideoTable from "@/features/video-management/components/VideoTable";

export default function NotificationManagement() {
  // インスタンス化
  const router = useRouter();
  const searchParams = useSearchParams();

  // テーブル要素を組み合わせて追加
  const addTableItems = useCallback(
    (item: MIrallelVideo) => ({
      ...item,
      displayIsPublishStatus: item.isPublishStatus ? "公開" : "非公開",
    }),
    []
  );

  // フィルターしたテーブル要素のステート
  const [filteredTableItems, setFilteredTableItems] = useState(() =>
    mockMIrallelVideos.map(addTableItems)
  );

  // 検索時の処理
  const handleSearch = useCallback(
    (params: VideoSearchParams) => {
      // 表示用のデータを作成
      const enriched = mockMIrallelVideos.map(addTableItems);
      // フィルター処理
      const filtered = enriched.filter((item) => {
        return Object.entries(params).every(([key, value]) => {
          if (!value) return true;
          const codeValue = item[key as keyof typeof item];
          // 完全一致させたいキー
          if (
            key === "viewingRestriction" ||
            key === "displayIsPublishStatus"
          ) {
            return codeValue === value;
          }
          // 通常は部分一致
          return codeValue?.toString().includes(value.toString());
        });
      });
      setFilteredTableItems(filtered);
    },
    [addTableItems]
  );

  // リセット時の処理
  const handleReset = () => {
    const resetData = mockMIrallelVideos.map(addTableItems);
    setFilteredTableItems(resetData);
  };

  // URLの操作でも検索を反映させる
  useEffect(() => {
    const queryParams: VideoSearchParams = {
      id: searchParams.get("id") || "",
      title: searchParams.get("title") || "",
      category: searchParams.get("category") || "",
      keyword: searchParams.get("keyword") || "",
      viewingRestriction: searchParams.get("viewingRestriction") || "",
      displayIsPublishStatus: searchParams.get("displayIsPublishStatus") || "",
    };
    handleSearch(queryParams);
  }, [handleSearch, searchParams]);

  // TODO: 動画追加処理を書く
  const makeNemItem = () => {
    console.log("動画追加");
    router.push(`/${ROUTES.VIDEO_MANAGEMENT}/${ROUTES.MAKE_VIDEO}`);
  };

  return (
    <div>
      {/* タイトル */}
      <div className="px-5 flex justify-between">
        <p className="flex items-center title-cp-medium text-cp-slate-gray">
          動画管理
        </p>
        <div className="py-2.5">
          <BaseButton
            onClick={makeNemItem}
            text={"動画追加"}
            color={"cp-white"}
            size={"small"}
          />
        </div>
      </div>

      {/* キーワード追加 */}
      <div>
        <VideoAddKeyword />
      </div>

      {/* 検索機能 */}
      <div>
        <VideoSearchForm onSearch={handleSearch} onReset={handleReset} />
      </div>

      {/* 件数表示 */}
      <div className="pl-5 pb-1 body-cp-small text-cp-slate-gray text-left">
        合計 {filteredTableItems.length}件
      </div>

      {/* テーブル */}
      <div>
        <VideoTable videos={filteredTableItems} />
      </div>
    </div>
  );
}
