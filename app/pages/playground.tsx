import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import PlaygroundTitleScreen from "../components/playground/PlaygroundTitleScreen";
import PlaygroundDashboard from "../components/playground/PlaygroundDashboard";

export default function PlaygroundApp() {
  const [stage, setStage] = useState<"welcome" | "app">("welcome");
  useEffect(() => {
    const seen = localStorage.getItem("koalaWelcomeSeen");
    if (seen) setStage("app");
  }, []);
  return (
    <>
      {stage === "welcome" && (
        <PlaygroundTitleScreen
          onEnter={() => {
            localStorage.setItem("koalaWelcomeSeen", "true");
            setStage("app");
          }}
        />
      )}

      {stage === "app" && <PlaygroundDashboard />}

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#111",
            color: "#fff",
            borderRadius: "12px",
          },
        }}
      />
    </>
  );
}

