"use client";

import {
    createContext,
    useContext,
    useState,
    useCallback,
    ReactNode,
} from "react";
import { nb } from "./neo-brutalism";

type ToastType = "success" | "error" | "info";

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = "info") => {
        const id = Math.random().toString(36).substring(7);
        const newToast = { id, message, type };

        setToasts((prev) => [...prev, newToast]);

        // Auto remove after 4 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 4000);
    }, []);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const getToastStyles = (type: ToastType) => {
        switch (type) {
            case "success":
                return "bg-green-50 border-green-600 text-green-900";
            case "error":
                return "bg-red-50 border-red-600 text-red-900";
            case "info":
            default:
                return "bg-blue-50 border-blue-600 text-blue-900";
        }
    };

    const getToastIcon = (type: ToastType) => {
        switch (type) {
            case "success":
                return "✓";
            case "error":
                return "⚠️";
            case "info":
            default:
                return "ℹ️";
        }
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast Container */}
            <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-md">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={nb({
                            border: 4,
                            shadow: "lg",
                            className: `p-4 ${getToastStyles(toast.type)} flex items-start justify-between gap-4 animate-in slide-in-from-right duration-300`,
                        })}
                    >
                        <div className="flex items-start gap-3 flex-1">
                            <span className="text-2xl">{getToastIcon(toast.type)}</span>
                            <p className="font-bold text-sm leading-relaxed">
                                {toast.message}
                            </p>
                        </div>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="font-black text-xl hover:opacity-70 transition-opacity shrink-0"
                            aria-label="Close"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within ToastProvider");
    }
    return context;
}
