import {PageLayout} from "@/shared/layouts";
import {lazy} from "react";


const RootPage = lazy(() =>
    import("@/pages/root-page").then((module) => ({
        default: module.RootPage,
    })),
);
const WelcomePage = lazy(() =>
    import("@/pages/welcome-page").then((module) => ({
        default: module.WelcomePage,
    })),
);


const HomePage = lazy(() =>
    import("@/pages/home-page").then((module) => ({
        default: module.HomePage,
    })),
);
const LevelOverview = lazy(() =>
    import("@/pages/level-overview").then((module) => ({
        default: module.LevelOverview,
    })),
);
const FriendsOverview = lazy(() =>
    import("@/pages/friends-overview").then((module) => ({
        default: module.FriendsOverview,
    })),
);
const TasksOverview = lazy(() =>
    import("@/pages/tasks-overview").then((module) => ({
        default: module.TasksOverview,
    })),
);
const SettingsOverview = lazy(() =>
    import("@/pages/settings-overview").then((module) => ({
        default: module.SettingsOverview,
    })),
);
const ClaimOverview = lazy(() =>
    import("@/pages/claim-overview").then((module) => ({
        default: module.ClaimOverview,
    })),
);


export const paths = [
    {
        path: "",
        element: <PageLayout/>,
        children: [
            {
                path: "",
                element: <RootPage/>,
                children: [
                    {
                        index: true,
                        element: <HomePage/>,
                    },
                    {
                        path: "level",
                        element: <LevelOverview/>,
                    },
                    {
                        path: "friends",
                        element: <FriendsOverview/>
                    },
                    {
                        path: "tasks",
                        element: <TasksOverview/>
                    },
                    {
                        path: "settings",
                        element: <SettingsOverview/>
                    }
                ],
            },
            {
                path: "claim",
                element: <ClaimOverview/>
            }
        ],

    },
    {
        path: "/welcome",
        element: <WelcomePage/>
    },
];
