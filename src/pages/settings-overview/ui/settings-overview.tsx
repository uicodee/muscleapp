import { Heading } from "@/shared/ui/heading.tsx";
import { PrimaryCard } from "@/shared/ui/primary-card.tsx";
import { ChevronRightIcon } from "@/assets/icons/chevron-right.tsx";
import { CheckIcon } from "@/assets/icons/check.tsx";
import { CloseIcon } from "@/assets/icons/close.tsx";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useBackButton } from "@telegram-apps/sdk-react";

export const SettingsOverview = () => {
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
      <div className="flex justify-between items-center mb-6">
        <div className="flex"></div>
        <Heading>Настройки</Heading>
        <Link to="/" className="flex">
          <CloseIcon />
        </Link>
      </div>
      <div className="flex flex-col gap-y-4 ">
        <PrimaryCard className="justify-between items-center">
          <div>
            <p className="font-medium">Сменить язык</p>
            <p>Русский</p>
          </div>
          <div className="flex">
            <ChevronRightIcon />
          </div>
        </PrimaryCard>
        <div className="flex text-sm text-white font-medium rounded-3xl px-4 py-8 w-full h-10 justify-between items-center bg-primary-blue">
          <p className="flex">Подключить свой кошелёк TON</p>
          <CheckIcon />
        </div>
      </div>
    </div>
  );
};
