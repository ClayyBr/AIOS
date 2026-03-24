"use strict";
/**
 * Session Types — State management for each WhatsApp conversation.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionState = void 0;
var SessionState;
(function (SessionState) {
    SessionState["IDLE"] = "IDLE";
    SessionState["ORDERING"] = "ORDERING";
    SessionState["AWAITING_ADDRESS"] = "AWAITING_ADDRESS";
    SessionState["AWAITING_PAYMENT"] = "AWAITING_PAYMENT";
    SessionState["AWAITING_PIX_PROOF"] = "AWAITING_PIX_PROOF";
    SessionState["CONFIRMED"] = "CONFIRMED";
    SessionState["HANDOFF"] = "HANDOFF";
})(SessionState || (exports.SessionState = SessionState = {}));
//# sourceMappingURL=session.types.js.map