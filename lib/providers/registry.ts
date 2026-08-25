import {
  SimulatedImageProvider,
  SimulatedLanguageProvider,
  SimulatedMotionProvider,
  SimulatedPaymentProvider,
  SimulatedSearchProvider,
  SimulatedSpeechProvider,
  SimulatedStorageProvider,
  SimulatedTranscriptionProvider,
} from "./simulated";

// Live adapters should be registered here after their server-side credentials and
// vendor approvals exist. No secret value is ever returned by this registry.
export const providers = {
  language: new SimulatedLanguageProvider(),
  image: new SimulatedImageProvider(),
  motion: new SimulatedMotionProvider(),
  tts: new SimulatedSpeechProvider(),
  stt: new SimulatedTranscriptionProvider(),
  storage: new SimulatedStorageProvider(),
  search: new SimulatedSearchProvider(),
  payment: new SimulatedPaymentProvider(),
} as const;

export async function providerHealth() {
  return Promise.all(Object.values(providers).map((provider) => provider.health()));
}

