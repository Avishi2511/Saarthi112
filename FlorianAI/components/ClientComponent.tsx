"use client";
import { VoiceProvider } from "@humeai/voice-react";
import Controls from "./Controls";

export default function ClientComponent({
  
  accessToken,
  configId
}: {
  accessToken: string;
  configId: string;
}) {
  return (
    <div>
    <VoiceProvider
      configId={configId}
      auth={{ type: "accessToken", value: accessToken }}
    >
      <Controls/>

    </VoiceProvider>
    </div>
  );
}
