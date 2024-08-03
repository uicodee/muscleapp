import ReactDOM from 'react-dom/client'
import {App} from './app.tsx'
import './index.css';
import '@telegram-apps/telegram-ui/dist/styles.css';
import {SDKProvider} from "@telegram-apps/sdk-react";
import {AppRoot} from "@telegram-apps/telegram-ui";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <SDKProvider acceptCustomStyles debug>
        <AppRoot platform="base">
            <App/>
        </AppRoot>
    </SDKProvider>
)
