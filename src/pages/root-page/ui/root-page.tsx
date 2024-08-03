import {Suspense} from "react";
import {Spinner, Tabbar} from "@telegram-apps/telegram-ui";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {tabs} from "@/shared/data/constants.tsx";

export const RootPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
            <div style={{flex: 1, overflowY: 'auto', paddingBottom: '100px'}} className="px-4">
                <Suspense fallback={
                    <div className="flex h-full justify-center items-center">
                        <Spinner size="m"/>
                    </div>
                }>
                    <Outlet/>
                </Suspense>
            </div>
            <Tabbar style={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                zIndex: 1000,
                background: "white",
                border: "0.5px solid #ccc"
            }}>
                {tabs.map((tab, index) => (
                    <Tabbar.Item
                        key={index}
                        // text={<p className="font-unbounded font-normal text-xs">{tab.title}</p>}
                        text={tab.title}
                        selected={location.pathname === tab.href}
                        onClick={() => navigate(tab.href)}
                        style={{
                            paddingRight: "8px",
                            paddingLeft: "8px",
                        }}
                    >
                        {tab.icon}
                    </Tabbar.Item>
                ))}
            </Tabbar>
        </div>
    )
}