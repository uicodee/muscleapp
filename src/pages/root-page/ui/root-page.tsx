import { Spinner, Tabbar } from "@telegram-apps/telegram-ui";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { tabs } from "@/shared/data/constants.tsx";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { useQuery } from "@tanstack/react-query";
import UserService from "@/shared/api/service/user";

export const RootPage = () => {
  const { initDataRaw } = retrieveLaunchParams();
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { data: _ } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      UserService.getUser(initDataRaw).then((res) => {
        void i18n.changeLanguage(res.data.language);
        return res;
      }),
  });
  return (
    <div className="flex flex-col h-lvh">
      <div style={{ flex: 1 }} className="overflow-y-auto px-4 pb-24">
        <Suspense
          fallback={
            <div className="flex h-full justify-center items-center">
              <Spinner size="m" />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </div>
      <Tabbar className="flex fixed bottom-0 w-full z-10 bg-white border-t">
        {tabs.map((tab, index) => (
          <Tabbar.Item
            key={index}
            // text={<p className="font-unbounded font-normal text-xs">{tab.title}</p>}
            text={t("menu." + tab.key)}
            selected={location.pathname === tab.href}
            onClick={() => navigate(tab.href)}
            className="px-2"
          >
            {tab.icon}
          </Tabbar.Item>
        ))}
      </Tabbar>
    </div>
  );
};
