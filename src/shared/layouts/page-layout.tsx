import {Outlet} from "react-router-dom"
import {Spinner} from "@telegram-apps/telegram-ui";
import {Suspense} from "react";

export const PageLayout = () => {
    return (
        <Suspense fallback={
            <div className="flex h-lvh max-h-lvh justify-center items-center bg-primary-bg">
                <Spinner size="m"/>
            </div>
        }>
            <Outlet/>
        </Suspense>
    )
}