export type ProviderMode = "simulated" | "live";

export interface ProviderHealth {
  provider: string;
  mode: ProviderMode;
  ok: boolean;
  checkedAt: string;
  message: string;
}

export interface ProviderAdapter {
  readonly id: string;
  readonly mode: ProviderMode;
  health(): Promise<ProviderHealth>;
}

export interface LanguageMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface LanguageResult {
  text: string;
  model: string;
  promptTokens: number;
  completionTokens: number;
  simulated: boolean;
}

export interface LanguageProvider extends ProviderAdapter {
  complete(input: { messages: LanguageMessage[]; temperature?: number; maxTokens?: number }): Promise<LanguageResult>;
}

export interface DiversityProfile {
  subject: string;
  composition: string;
  cameraDistance: string;
  cameraAngle: string;
  palette: string[];
  lighting: string;
  medium: string;
  surfaceTexture: string;
  geographicInfluence: string;
  historicalInfluence: string;
  emotionalTone: string;
  complexity: "restrained" | "balanced" | "dense";
  negativeSpace: "low" | "medium" | "high";
  humanPresence: string;
  architecture: string;
  environment: string;
  timeOfDay: string;
}

export interface ImageGenerationRequest {
  prompt: string;
  negativePrompt?: string;
  aspectRatio: "1:1" | "4:5" | "3:2" | "16:9";
  operation: "text-to-image" | "image-to-image" | "edit" | "inpaint" | "outpaint" | "upscale" | "background-replace" | "mockup";
  diversity: DiversityProfile;
  sourceAssetUrl?: string;
  seed?: number;
}

export interface GeneratedImage {
  id: string;
  url: string;
  revisedPrompt: string;
  width: number;
  height: number;
  estimatedCostCents: number;
  provider: string;
  simulated: boolean;
}

export interface ImageProvider extends ProviderAdapter {
  generate(request: ImageGenerationRequest): Promise<GeneratedImage>;
}

export interface MotionProvider extends ProviderAdapter {
  create(input: { imageUrl: string; prompt: string; durationSeconds: number; preserveComposition: boolean }): Promise<{ jobId: string; status: "queued" | "complete"; videoUrl?: string; estimatedCostCents: number; simulated: boolean }>;
}

export interface SpeechProvider extends ProviderAdapter {
  synthesize(input: { text: string; voice?: string; format?: "mp3" | "wav" }): Promise<{ audioUrl: string; transcript: string; simulated: boolean }>;
}

export interface TranscriptionProvider extends ProviderAdapter {
  transcribe(input: { audioUrl: string; language?: string }): Promise<{ text: string; confidence: number; simulated: boolean }>;
}

export interface StorageProvider extends ProviderAdapter {
  put(input: { key: string; bytes: Uint8Array; contentType: string }): Promise<{ key: string; url: string }>;
  signedUrl(key: string, expiresInSeconds: number): Promise<string>;
}

export interface SearchProvider extends ProviderAdapter {
  search(input: { query: string; allowedDomains?: string[]; limit?: number }): Promise<{ title: string; url: string; snippet: string; publishedAt?: string }[]>;
}

export interface PaymentProvider extends ProviderAdapter {
  createCheckout(input: { amountCents: number; currency: string; orderReference: string; returnUrl: string }): Promise<{ checkoutId: string; url: string | null; status: "demo" | "created" }>;
  verifyWebhook(rawBody: string, signature: string): Promise<boolean>;
}

