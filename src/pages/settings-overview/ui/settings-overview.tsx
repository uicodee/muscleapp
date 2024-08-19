import { Heading } from "@/shared/ui/heading.tsx";
import { PrimaryCard } from "@/shared/ui/primary-card.tsx";
import { ChevronRightIcon } from "@/assets/icons/chevron-right.tsx";
import { CheckIcon } from "@/assets/icons/check.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useBackButton } from "@telegram-apps/sdk-react";
import { useTranslation } from "react-i18next";

export const SettingsOverview = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const backButton = useBackButton();

  useEffect(() => {
    backButton.show();
    const handleBackClick = () => {
      backButton.hide();
      navigate("/");
    };
    backButton.on("click", handleBackClick);
    return () => {
      backButton.off("click", handleBackClick);
      backButton.hide();
    };
  }, []);
  return (
    <div className="flex flex-col mt-6">
      <div className="flex justify-center items-center mb-6">
        <Heading>{t("settings.title")}</Heading>
      </div>
      <div className="flex flex-col gap-y-4 ">
        <PrimaryCard className="justify-between items-center">
          <div>
            <p className="font-medium">{t("settings.change_language")}</p>
            <p>Русский</p>
          </div>
          <div className="flex">
            <ChevronRightIcon />
          </div>
        </PrimaryCard>
        <div className="flex text-sm text-white font-medium rounded-3xl px-4 py-8 w-full h-10 justify-between items-center bg-primary-blue">
          <p className="flex">{t("settings.connect_ton_wallet")}</p>
          <CheckIcon />
        </div>
      </div>
    </div>
  );
};
