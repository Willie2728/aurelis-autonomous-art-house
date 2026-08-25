const directImitationPatterns = [
  /\bin (?:the )?style of\b/i,
  /\bcopy (?:the work|the style|a painting) of\b/i,
  /\bidentical to\b/i,
  /\brecreate\b.*\b(?:painting|artwork|composition)\b/i,
  /\bchristian hook\b/i,
  /\bvoka\b/i,
];

const safeTransformations: Record<string, string> = {
  "christian hook": "expressive contemporary portraiture, fragmented figurative construction, energetic brushwork, and abstract-figurative integration",
  voka: "bold chromatic contrast, deconstructed facial planes, visible paint texture, and high-emotion portrait composition",
};

export function reviewPrompt(prompt: string) {
  const normalized = prompt.trim();
  const flags = directImitationPatterns.filter((pattern) => pattern.test(normalized)).map((pattern) => pattern.source);
  return {
    allowed: flags.length === 0,
    flags,
    guidance: flags.length ? "Describe medium, composition, emotion, palette, texture, lighting, and historical movement without naming or copying a living artist or protected work." : undefined,
  };
}

export function transformNamedReference(prompt: string) {
  return Object.entries(safeTransformations).reduce((result, [name, replacement]) => result.replace(new RegExp(name, "gi"), replacement), prompt);
}

export function buildOriginalityNegativePrompt() {
  return "protected artwork, signature, trademark, brand logo, celebrity likeness, living artist imitation, copied composition, watermark, stereotype, demeaning cultural symbol";
}

