import {FC, useEffect} from "react";
import {RouterProvider} from "react-router-dom";
import {router} from "@/shared/router";
import {
    bindViewportCSSVars, initClosingBehavior, useMiniApp,
    useViewport
} from "@telegram-apps/sdk-react";

export const App: FC = () => {
    const miniApp = useMiniApp();
    const viewport = useViewport();
    const [closingBehavior] = initClosingBehavior();
    // useEffect(() => {
    //     return bindMiniAppCSSVars(miniApp, themeParams);
    // }, [miniApp, themeParams]);
    //
    // useEffect(() => {
    //     return bindThemeParamsCSSVars(themeParams);
    // }, [themeParams]);

    useEffect(() => {
        return viewport && bindViewportCSSVars(viewport);
    }, [viewport]);

    useEffect(() => {
        miniApp.setHeaderColor('#ffffff')
        // swipeBehavior.disableVerticalSwipe()
        viewport?.expand()
        closingBehavior.enableConfirmation();
    }, [miniApp, viewport, closingBehavior]);

    return <RouterProvider router={router}></RouterProvider>
}