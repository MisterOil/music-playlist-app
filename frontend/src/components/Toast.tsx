import { type FC } from 'react';
import { useToast, type Toast as ToastType } from '../contexts/ToastContext';

interface ToastProps {
  toast: ToastType;
}

const Toast: FC<ToastProps> = ({ toast }) => {
  const { removeToast } = useToast();

  const getToastStyles = (type: ToastType['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-600 border-green-500';
      case 'error':
        return 'bg-red-600 border-red-500';
      case 'warning':
        return 'bg-yellow-600 border-yellow-500';
      case 'info':
        return 'bg-blue-600 border-blue-500';
      default:
        return 'bg-neutral-600 border-neutral-500';
    }
  };

  const getIcon = (type: ToastType['type']) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return '';
    }
  };

  return (
    <div className={`${getToastStyles(toast.type)} text-white p-4 rounded-lg shadow-lg border-l-4 flex items-center justify-between min-w-80 max-w-md`}>
      <div className="flex items-center">
        <span className="mr-2 text-lg">{getIcon(toast.type)}</span>
        <span>{toast.message}</span>
      </div>
      <button
        onClick={() => removeToast(toast.id)}
        className="ml-4 text-white hover:text-neutral-300 text-xl leading-none"
      >
        ×
      </button>
    </div>
  );
};



export default Toast;
