import ReactDOM from 'react-dom/client'
import {App} from './app.tsx'
import './index.css';
import '@telegram-apps/telegram-ui/dist/styles.css';
import {SDKProvider} from "@telegram-apps/sdk-react";
import {AppRoot} from "@telegram-apps/telegram-ui";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <SDKProvider acceptCustomStyles debug>
            <AppRoot platform="base">
                <App/>
            </AppRoot>
        </SDKProvider>
    </QueryClientProvider>
)
