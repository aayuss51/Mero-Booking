import React from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from './Button';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  isProcessing?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  isProcessing = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-gray-100 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-50 text-red-600 rounded-full border border-red-100">
            <AlertTriangle size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed">
          {message}
        </p>
        
        <div className="flex gap-3 mt-2">
          <Button variant="secondary" onClick={onClose} className="flex-1" disabled={isProcessing}>
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={onConfirm} 
            className="flex-1 shadow-lg shadow-red-600/20"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <span className="flex items-center gap-2"><Loader2 className="animate-spin" size={16} /> Processing...</span>
            ) : (
              confirmLabel
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};