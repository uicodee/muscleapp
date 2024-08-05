import { FC, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "@/shared/router";
import {
    bindViewportCSSVars, initClosingBehavior, useMiniApp,
    useViewport
} from "@telegram-apps/sdk-react";

export const App: FC = () => {
    // const { platform } = retrieveLaunchParams(); // Ensure platform is correctly retrieved
    const miniApp = useMiniApp();
    const viewport = useViewport();
    const [closingBehavior] = initClosingBehavior();

    useEffect(() => {
        return viewport && bindViewportCSSVars(viewport);
    }, [viewport]);

    useEffect(() => {
        miniApp.setHeaderColor('#ffffff');
        viewport?.expand();
        closingBehavior.enableConfirmation();
    }, [miniApp, viewport, closingBehavior]);

    return <RouterProvider router={router}></RouterProvider>;
}
