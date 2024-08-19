import ReactDOM from "react-dom/client";
import { App } from "./app.tsx";
import "./index.css";
import "@telegram-apps/telegram-ui/dist/styles.css";
import { SDKProvider } from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import i18n from "@/shared/i18n/18n.ts";
import { I18nextProvider } from "react-i18next";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <I18nextProvider i18n={i18n}>
    <QueryClientProvider client={queryClient}>
      <SDKProvider acceptCustomStyles debug>
        <AppRoot platform="base">
          <App />
        </AppRoot>
      </SDKProvider>
    </QueryClientProvider>
  </I18nextProvider>
);
