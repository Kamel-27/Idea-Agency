// Builds a click-to-chat link: https://wa.me/<number>?text=<message>
// The message must be URL-encoded so spaces and Arabic letters survive.

export function whatsappLink(number: string, message: string): string | null {
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
