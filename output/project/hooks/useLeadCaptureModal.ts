'use client';

import { useState, useCallback, useContext, createContext } from 'react';

interface LeadCaptureModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

// Create a context for the modal state
const LeadCaptureModalContext = createContext<LeadCaptureModalContextType | undefined>(undefined);

// Provider component to wrap around the app
export function LeadCaptureModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const value = { isOpen, openModal, closeModal };

  return (
    <LeadCaptureModalContext.Provider value={value}>
      {children}
    </LeadCaptureModalContext.Provider>
  );
}

// Custom hook to consume the modal state
export function useLeadCaptureModal() {
  const context = useContext(LeadCaptureModalContext);
  if (context === undefined) {
    throw new Error('useLeadCaptureModal must be used within a LeadCaptureModalProvider');
  }
  return context;
}
