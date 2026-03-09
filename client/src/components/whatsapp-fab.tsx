import { SiWhatsapp } from "react-icons/si";

export function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/917042180166"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:bg-[#20bd5a] hover:scale-105 active:scale-95 transition-all"
      data-testid="button-whatsapp-fab"
      aria-label="Chat on WhatsApp"
    >
      <SiWhatsapp className="w-7 h-7" />
    </a>
  );
}
