'use client';
import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

import { useToasts } from '@/contexts/UIProvider';

const toastIcons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info
};

const toastColors = {
    success: 'bg-green text-white',
    error: 'bg-red text-white', 
    warning: 'bg-orange text-white',
    info: 'bg-blue text-white'
};

export function ToastContainer() {
    const { toasts, removeToast } = useToasts();

    useEffect(() => {
        toasts.forEach(toast => {
            if (toast.duration) {
                const timer = setTimeout(() => {
                    removeToast(toast.id);
                }, toast.duration);
                
                return () => clearTimeout(timer);
            }
        });
    }, [toasts, removeToast]);

    return (
        <div className="fixed top-4 right-4 z-[2000] space-y-2">
            {toasts.map(toast => {
                const Icon = toastIcons[toast.type] || Info;
                const colorClass = toastColors[toast.type] || toastColors.info;
                
                return (
                    <div key={toast.id} className={`${colorClass} px-4 py-3 rounded-lg shadow-lg 
                        flex items-center gap-3 max-w-sm animate-slide-in`}>
                        <Icon size={20} />
                        <span className="flex-1 text-sm">{toast.message}</span>
                        <button onClick={() => removeToast(toast.id)}>
                            <X size={16} />
                        </button>
                    </div>
                );
            })}
        </div>
    );
}