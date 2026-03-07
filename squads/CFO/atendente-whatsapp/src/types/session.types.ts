/**
 * Session Types — State management for each WhatsApp conversation.
 */

export enum SessionState {
    IDLE = 'IDLE',
    ORDERING = 'ORDERING',
    AWAITING_ADDRESS = 'AWAITING_ADDRESS',
    AWAITING_PAYMENT = 'AWAITING_PAYMENT',
    AWAITING_PIX_PROOF = 'AWAITING_PIX_PROOF',
    CONFIRMED = 'CONFIRMED',
    HANDOFF = 'HANDOFF',
}

export interface CartItem {
    name: string;
    quantity: number;
    unitPrice: number;
    options: string[];
}

export interface MessageHistoryEntry {
    role: 'user' | 'model';
    content: string;
}

export interface Session {
    phoneNumber: string;
    contactName: string | null;
    messageHistory: MessageHistoryEntry[];
    cart: CartItem[];
    deliveryAddress: string | null;
    paymentMethod: string | null;
    paymentDetails: string | null;
    state: SessionState;
    lastActivity: Date;
    isHandoff: boolean;
    createdAt: Date;
}
