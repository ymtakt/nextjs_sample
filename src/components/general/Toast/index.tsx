import { IoIosClose } from "react-icons/io";
import { useEffect } from "react";

type Status = "success" | "warning" | "error";

type StatusToastProps = {
  message: string;
  status: Status;
  onClose: () => void;
};

export default function StatusToast({
  message,
  status,
  onClose,
}: StatusToastProps) {
  const duration = 4000;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose]);

  const statusStyles = {
    success: {
      iconBg: "bg-cp-toast-success-sub",
      iconColor: "text-cp-white",
      box: "bg-cp-toast-success-main border-cp-toast-success-sub",
      text: "text-cp-black",
    },
    warning: {
      iconBg: "bg-cp-toast-warning-sub",
      iconColor: "text-cp-white",
      box: "bg-cp-toast-warning-main border-cp-toast-warning-sub",
      text: "text-cp-black",
    },
    error: {
      iconBg: "bg-cp-toast-error-sub",
      iconColor: "text-cp-white",
      box: "bg-cp-toast-error-main border-cp-toast-error-sub",
      text: "text-cp-black",
    },
  };

  const styles = statusStyles[status];

  return (
    <div
      className={`fixed top-5 right-5 w-[300px] h-[59px] z-50 border-2 rounded-md p-4 ${styles.box} `}
    >
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center space-x-2 overflow-hidden">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center ${styles.iconBg}`}
          >
            {status === "success" && (
              <span className={styles.iconColor}>✔</span>
            )}
            {status === "warning" && (
              <span className={styles.iconColor}>✔</span>
            )}
            {status === "error" && <span className={styles.iconColor}>✔</span>}
          </div>
          <div className={`font-bold text-sm ${styles.text} truncate`}>
            {message}
          </div>
        </div>
        <button onClick={onClose} className="text-black" aria-label="閉じる">
          <IoIosClose size={25} />
        </button>
      </div>
    </div>
  );
}
