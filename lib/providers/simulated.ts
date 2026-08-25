import type {
  GeneratedImage,
  ImageGenerationRequest,
  ImageProvider,
  LanguageProvider,
  MotionProvider,
  PaymentProvider,
  ProviderHealth,
  SearchProvider,
  SpeechProvider,
  StorageProvider,
  TranscriptionProvider,
} from "./types";

function health(provider: string): ProviderHealth {
  return { provider, mode: "simulated", ok: true, checkedAt: new Date().toISOString(), message: "Simulated provider is ready; no external request was made." };
}

function stableId(prefix: string, value: string) {
  let hash = 2166136261;
  for (const char of value) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return `${prefix}_${(hash >>> 0).toString(36)}`;
}

export class SimulatedLanguageProvider implements LanguageProvider {
  readonly id = "aurelis-simulated-llm";
  readonly mode = "simulated" as const;
  async health() { return health(this.id); }
  async complete(input: Parameters<LanguageProvider["complete"]>[0]) {
    const prompt = input.messages.at(-1)?.content ?? "";
    return {
      text: `In demo mode, Seraphina can help with artwork, rooms, memberships, living art, and purchases. You asked: “${prompt.slice(0, 180)}”`,
      model: this.id,
      promptTokens: Math.ceil(prompt.length / 4),
      completionTokens: 34,
      simulated: true,
    };
  }
}

export class SimulatedImageProvider implements ImageProvider {
  readonly id = "aurelis-simulated-image";
  readonly mode = "simulated" as const;
  async health() { return health(this.id); }
  async generate(request: ImageGenerationRequest): Promise<GeneratedImage> {
    const id = stableId("demo_image", JSON.stringify(request));
    const dimensions = request.aspectRatio === "16:9" ? [1536, 864] : request.aspectRatio === "3:2" ? [1536, 1024] : request.aspectRatio === "4:5" ? [1024, 1280] : [1024, 1024];
    return {
      id,
      url: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1400&q=82",
      revisedPrompt: `${request.prompt}. Original composition; no living-artist imitation; diversity profile applied.`,
      width: dimensions[0],
      height: dimensions[1],
      estimatedCostCents: 0,
      provider: this.id,
      simulated: true,
    };
  }
}

export class SimulatedMotionProvider implements MotionProvider {
  readonly id = "aurelis-simulated-motion";
  readonly mode = "simulated" as const;
  async health() { return health(this.id); }
  async create(input: Parameters<MotionProvider["create"]>[0]) {
    return { jobId: stableId("motion", JSON.stringify(input)), status: "complete" as const, videoUrl: "https://videos.pexels.com/video-files/3129595/3129595-hd_1920_1080_25fps.mp4", estimatedCostCents: 0, simulated: true };
  }
}

export class SimulatedSpeechProvider implements SpeechProvider {
  readonly id = "browser-speech-fallback";
  readonly mode = "simulated" as const;
  async health() { return health(this.id); }
  async synthesize(input: Parameters<SpeechProvider["synthesize"]>[0]) {
    return { audioUrl: "browser-speech://synthesize", transcript: input.text, simulated: true };
  }
}

export class SimulatedTranscriptionProvider implements TranscriptionProvider {
  readonly id = "simulated-stt";
  readonly mode = "simulated" as const;
  async health() { return health(this.id); }
  async transcribe() { return { text: "Voice transcription is simulated until an STT provider is connected.", confidence: 1, simulated: true }; }
}

export class SimulatedStorageProvider implements StorageProvider {
  readonly id = "simulated-storage";
  readonly mode = "simulated" as const;
  async health() { return health(this.id); }
  async put(input: Parameters<StorageProvider["put"]>[0]) { return { key: input.key, url: `/api/assets/${encodeURIComponent(input.key)}` }; }
  async signedUrl(key: string, expiresInSeconds: number) { return `/api/assets/${encodeURIComponent(key)}?demo=1&expires=${expiresInSeconds}`; }
}

export class SimulatedSearchProvider implements SearchProvider {
  readonly id = "curated-seed-search";
  readonly mode = "simulated" as const;
  async health() { return health(this.id); }
  async search(input: Parameters<SearchProvider["search"]>[0]) {
    return [{ title: `Demo evidence result for ${input.query}`, url: "https://www.artbasel.com/stories/the-art-basel-and-ubs-global-art-market-report-2026?lang=en", snippet: "Curated seed evidence only. Connect an approved search provider for live research." }].slice(0, input.limit ?? 5);
  }
}

export class SimulatedPaymentProvider implements PaymentProvider {
  readonly id = "stripe-safe-demo";
  readonly mode = "simulated" as const;
  async health() { return health(this.id); }
  async createCheckout(input: Parameters<PaymentProvider["createCheckout"]>[0]) { return { checkoutId: stableId("demo_checkout", JSON.stringify(input)), url: null, status: "demo" as const }; }
  async verifyWebhook() { return false; }
}
