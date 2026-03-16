import { SiWhatsapp } from "react-icons/si";

export function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/917042180166?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20your%20products."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-5 z-40 w-13 h-13 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:bg-[#20bd5a] hover:scale-105 active:scale-95 transition-all lg:bottom-24 lg:right-6"
      data-testid="button-whatsapp-fab"
      aria-label="Chat on WhatsApp"
    >
      <SiWhatsapp className="w-6 h-6" />
    </a>
  );
}
