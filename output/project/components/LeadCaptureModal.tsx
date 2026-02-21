'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useLeadCaptureModal } from '@/hooks/useLeadCaptureModal';

interface LeadCaptureFormData {
  name: string;
  email: string;
  phone: string;
}

export default function LeadCaptureModal() {
  const { isOpen, closeModal } = useLeadCaptureModal();
  const [formData, setFormData] = useState<LeadCaptureFormData>({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shakeKey, setShakeKey] = useState(0); // Key to re-trigger shake animation
  const initialFocusRef = useRef<HTMLInputElement>(null); // Ref for initial focus
  const modalRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error on change
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório.';
    if (!formData.email.trim()) newErrors.email = 'Email é obrigatório.';
    else if (!/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email))
      newErrors.email = 'Email inválido.';
    if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório.';
    else if (!/^\(?\d{2}\)?\s?\d{4,5}\-?\d{4}$/.test(formData.phone))
      newErrors.phone = 'Telefone inválido (ex: (19) 99887-6655).';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setShakeKey((prev) => prev + 1); // Trigger shake animation on form errors
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Lead captured:', formData);
      alert('Obrigado! Em breve entraremos em contato.');
      setFormData({ name: '', email: '', phone: '' }); // Clear form
      closeModal();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Houve um erro ao enviar sua inscrição. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Accessibility: Trap focus within the modal
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen || !modalRef.current) return;

      if (e.key === 'Escape') {
        closeModal();
      }

      if (e.key === 'Tab') {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>;
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      }
    },
    [isOpen, closeModal]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling background
      initialFocusRef.current?.focus(); // Set initial focus
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = ''; // Restore scrolling
      document.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
    >
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="modal-content"
        aria-live="assertive"
      >
        <h3
          id="lead-modal-title"
          className="text-3xl font-oswald font-bold text-white mb-6 text-center"
        >
          Comece sua Jornada!
        </h3>
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full p-1"
          aria-label="Fechar formulário de inscrição"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Nome completo
            </label>
            <motion.input
              key={`name-input-${shakeKey}`}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`input-field ${errors.name ? 'border-primary-500 animate-shake' : ''}`}
              placeholder="Seu nome"
              ref={initialFocusRef}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="text-primary-500 text-sm mt-1 animate-shake-quick">
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <motion.input
              key={`email-input-${shakeKey}`}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`input-field ${errors.email ? 'border-primary-500 animate-shake' : ''}`}
              placeholder="seu.email@exemplo.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-primary-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
              Telefone
            </label>
            <motion.input
              key={`phone-input-${shakeKey}`}
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`input-field ${errors.phone ? 'border-primary-500 animate-shake' : ''}`}
              placeholder="(XX) XXXXX-XXXX"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && (
              <p id="phone-error" className="text-primary-500 text-sm mt-1">
                {errors.phone}
              </p>
            )}
          </div>
          <motion.button
            type="submit"
            className="btn-primary w-full mt-6"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
            aria-label={isSubmitting ? 'Enviando...' : 'Enviar inscrição'}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Inscrição'}
          </motion.button>
        </form>
      </motion.div>
    </div>,
    document.body
  );
}

// Custom Hook for Modal State Management
// This allows different components to open/close the same modal instance
export function useLeadCaptureModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  // Provide a global context or simply export for direct use (simpler for this case)
  // For larger apps, a Context API approach would be better.
  // For this example, we'll assume it's just exported and consumed.
  return { isOpen, openModal, closeModal };
}
