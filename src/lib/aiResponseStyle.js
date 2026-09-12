export const AI_RESPONSE_STYLE_RULE = "Write in clean plain language. Do not use Markdown formatting. Do not use asterisks for emphasis or bullets. Do not use hash symbols for headings. Avoid parentheses unless they are genuinely required for grammar, math, code, citations, URLs, or user-requested formatting. Prefer ordinary sentences, short paragraphs, commas, colons, and simple numbered steps when structure is needed.";

export function cleanAIResponse(value) {
  if (value == null) return "";
  let text = String(value);
  text = text.replace(/^\s{0,3}#{1,6}\s+/gm, "");
  text = text.replace(/\*\*([^*]+)\*\*/g, "$1");
  text = text.replace(/__([^_]+)__/g, "$1");
  text = text.replace(/^\s*[-*+]\s+/gm, "");
  text = text.replace(/\*([^*\n]+)\*/g, "$1");
  text = text.replace(/\n{3,}/g, "\n\n");
  return text.trim();
}
