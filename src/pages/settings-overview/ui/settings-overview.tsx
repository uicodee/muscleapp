import { Heading } from "@/shared/ui/heading.tsx";
import { PrimaryCard } from "@/shared/ui/primary-card.tsx";
import { ChevronRightIcon } from "@/assets/icons/chevron-right.tsx";
import { CheckIcon } from "@/assets/icons/check.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { retrieveLaunchParams, useBackButton } from "@telegram-apps/sdk-react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@tanstack/react-query";
import UserService from "@/shared/api/service/user";
import { Drawer, DrawerContent } from "@/shared/ui/drawer";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { Label } from "@/shared/ui/label";

export const SettingsOverview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const backButton = useBackButton();
  const { initDataRaw } = retrieveLaunchParams();
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => UserService.getUser(initDataRaw),
  });
  const mutation = useMutation({
    mutationFn: (language: string) =>
      UserService.updateLanguage(initDataRaw, language),
    onSuccess: (res) => {
      void i18n.changeLanguage(res.data.language);
    },
  });

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
        <PrimaryCard
          className="justify-between items-center"
          onClick={() => setIsOpen(true)}
        >
          <div>
            <p className="font-medium">{t("settings.change_language")}</p>
            <p>{user?.data.language === "ru" ? "Русский" : "English"}</p>
          </div>
          <div className="flex">
            <ChevronRightIcon />
          </div>
        </PrimaryCard>
        <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
          <DrawerContent className="pb-6">
            {/* <DrawerHeader>
              <DrawerTitle>Are you absolutely sure?</DrawerTitle>
              <DrawerDescription>
                This action cannot be undone.
              </DrawerDescription>
            </DrawerHeader> */}
            <RadioGroup
              defaultValue={user?.data.language}
              className="px-6 py-4"
            >
              <div className="flex items-center space-x-2 ">
                <RadioGroupItem
                  value="en"
                  id="en"
                  onClick={() => mutation.mutate("en")}
                />
                <Label htmlFor="en" className="text-base">
                  English
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="ru"
                  id="ru"
                  onClick={() => mutation.mutate("ru")}
                />
                <Label htmlFor="ru" className="text-base">
                  Русский
                </Label>
              </div>
            </RadioGroup>
          </DrawerContent>
        </Drawer>

        <div className="flex text-sm text-white font-medium rounded-3xl px-4 py-8 w-full h-10 justify-between items-center bg-primary-blue">
          <p className="flex">{t("settings.connect_ton_wallet")}</p>
          <CheckIcon />
        </div>
      </div>
    </div>
  );
};
