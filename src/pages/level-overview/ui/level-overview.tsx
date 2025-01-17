import { useEffect, useState } from "react";
import { BalanceCard } from "@/shared/ui/balance-card.tsx";
import { Button } from "@/shared/ui/button.tsx";
import skeletonHands from "@/assets/skelet_hands.png";
import skeletonLegs from "@/assets/skelet_legs.png";
import skeletonBack from "@/assets/skelet_back.png";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group.tsx";
import { Label } from "@/shared/ui/label.tsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UserService from "@/shared/api/service/user.ts";
import {
  retrieveLaunchParams,
  useHapticFeedback,
} from "@telegram-apps/sdk-react";
import HeroService from "@/shared/api/service/hero.ts";
import EntityService from "@/shared/api/service/entity.ts";
import { useTranslation } from "react-i18next";

export const LevelOverview = () => {
  const { t } = useTranslation();
  const haptic = useHapticFeedback();
  const { initDataRaw } = retrieveLaunchParams();
  const [option, setOption] = useState<string>("hand");
  const queryClient = useQueryClient();
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => UserService.getUser(initDataRaw),
  });
  const { data: hero } = useQuery({
    queryKey: ["hero"],
    queryFn: () => HeroService.getHero(initDataRaw),
  });
  const { data: entity, isLoading } = useQuery({
    queryKey: ["entity", initDataRaw, option],
    queryFn: () => EntityService.getNextLevel(initDataRaw, option),
  });
  const mutation = useMutation({
    mutationFn: () => EntityService.upgradeLevel(initDataRaw, option),
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: ["user"],
        })
        .then(() => {
          queryClient.invalidateQueries({ queryKey: ["hero"] }).then(() => {
            queryClient.invalidateQueries({ queryKey: ["entity"] });
          });
        });
    },
  });

  const [preloadedImages, setPreloadedImages] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    const images = {
      skeletonHands: skeletonHands,
      skeletonLegs: skeletonLegs,
      skeletonBack: skeletonBack,
    };
    const loadImages = async () => {
      const promises = Object.entries(images).map(([key, src]) =>
        new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        }).then((img) => ({ [key]: img.src }))
      );
      const loadedImages = await Promise.all(promises);
      setPreloadedImages(Object.assign({}, ...loadedImages));
    };
    loadImages();
  }, []);

  return (
    <div className="flex flex-col w-full min-h-full pt-5 xs:pt-2">
      <div className="flex flex-col w-full">
        <div className="flex w-full justify-between mb-4 xs:mb-3">
          <BalanceCard balance={user?.data.balance.points} />
          {/* <Button size="icon" variant="icon" asChild>
            <Link to="/settings">
              <QuestionIcon />
            </Link>
          </Button> */}
        </div>
      </div>
      <div className="flex-grow flex justify-center items-center relative w-full h-full overflow-visible -z-10">
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-[434px] h-[434px] rounded-full bg-white/29 flex justify-center items-center">
            <div className="w-[380px] h-[380px] rounded-full bg-white/35 flex justify-center items-center">
              <div className="w-[330px] h-[330px] rounded-full bg-white"></div>
            </div>
          </div>
        </div>
        <div className="relative z-10 transition-all duration-200">
          {option === "hand" && preloadedImages.skeletonHands && (
            <>
              <img
                src={preloadedImages.skeletonHands}
                alt=""
                className="w-[285px] xs:w-[250px]"
              />
              <div className="bg-primary-blue p-2.5 absolute -translate-y-[323px] translate-x-[177px] xs:-translate-y-[290px] text-xs text-white rounded-full xs:translate-x-[150px]">
                {t("common.hands")} {hero?.data.handLevel} lvl
              </div>
              <div className="absolute bg-primary-blue text-white rounded-lg w-[105px] text-xs px-1.5 py-2 translate-x-[170px] -translate-y-[120px] xs:translate-x-[130px] xs:-translate-y-[105px]">
                {t("pumping.description_for_hands")}
              </div>
            </>
          )}
          {option === "leg" && preloadedImages.skeletonLegs && (
            <>
              <img
                src={preloadedImages.skeletonLegs}
                alt=""
                className="w-[285px] xs:w-[250px]"
              />
              <div className="bg-primary-blue p-2.5 absolute translate-x-[100px] -translate-y-[215px] xs:translate-x-[83px] xs:-translate-y-[190px] text-xs text-white rounded-full">
                {t("common.legs")} {hero?.data.legLevel} lvl
              </div>
              <div className="absolute bg-primary-blue text-white rounded-lg w-[105px] text-xs px-1.5 py-2 translate-x-[215px] -translate-y-[172px] xs:translate-x-[190px] xs:-translate-y-[151px]">
                {t("pumping.description_for_legs")}
              </div>
            </>
          )}
          {option === "back" && preloadedImages.skeletonBack && (
            <>
              <img
                src={preloadedImages.skeletonBack}
                alt=""
                className="w-[320px] xs:w-[250px]"
              />
              <div className="bg-primary-blue p-2.5 absolute translate-x-[110px] -translate-y-[295px] xs:translate-x-[75px] xs:-translate-y-[240px] text-xs text-white rounded-full">
                {t("common.back")} {hero?.data.backLevel} lvl
              </div>
              <div className="absolute bg-primary-blue text-white rounded-lg w-[105px] text-xs px-1.5 py-2 translate-x-[240px] -translate-y-[200px] xs:translate-x-[190px] xs:-translate-y-[195px]">
                {t("pumping.description_for_back")}
              </div>
            </>
          )}
        </div>

        {/* <div className="relative z-10">
          {option === "hand" && preloadedImages.skeleton && (
            <>
              <img
                src={preloadedImages.skeleton}
                alt=""
                className="w-[285px] xs:w-[250px]"
              />
              <div className="bg-primary-blue p-2.5 absolute -translate-y-[120px] text-xs text-white rounded-full translate-x-20">
                Руки {hero?.data.handLevel} lvl
              </div>
              <div className="-translate-y-4 translate-x-20 border-2 border-primary-blue w-[95px] xs:w-[65px] h-[164px] xs:h-[144px] absolute rounded-3xl bg-[#1877F2]/10"></div>
              <div className=" -translate-x-20 xs:-translate-x-16 border-2 border-primary-blue w-[95px] xs:w-[65px] h-[179px] xs:h-[159px] absolute rounded-3xl bg-[#1877F2]/10"></div>
            </>
          )}
          {option === "leg" && preloadedImages.skeleton && (
            <>
              <img
                src={preloadedImages.skeleton}
                alt=""
                className="w-[285px] xs:w-[250px]"
              />
              <div className="bg-primary-blue p-2.5 absolute -translate-y-2 text-xs text-white rounded-full">
                Ноги {hero?.data.legLevel} lvl
              </div>
              <div className="translate-y-24 xs:translate-y-20 border-2 border-primary-blue w-[150px] h-[165px] xs:w-[130px] xs:h-[145px] absolute rounded-3xl bg-[#1877F2]/10"></div>
            </>
          )}
          {option === "back" && preloadedImages.skeletonBack && (
            <>
              <img
                src={preloadedImages.skeletonBack}
                alt=""
                className="w-[320px] h-[320px] xs:w-[260px] xs:h-[260px]"
              />
              <div className="absolute -translate-y-10 xs:-translate-y-[40px] translate-x-12 xs:translate-x-[25px] w-[285px] h-[41px] xs:w-[215px] xs:h-[54px] rounded-[50%] bg-[#17283C] -z-10"></div>
              <div className="bg-primary-blue p-2.5 absolute -translate-y-24 text-xs text-white rounded-full">
                Спина {hero?.data.backLevel} lvl
              </div>
              <div className="translate-y-10 border-2 border-primary-blue w-[95px] h-[230px] xs:w-[80px] xs:h-[180px] absolute rounded-3xl bg-[#1877F2]/10"></div>
            </>
          )}
          <img
            src={character}
            alt="Character"
            className="w-[326px] h-[326px] xs:w-[280px] xs:h-[280px]"
          />
          <div className="absolute -translate-y-10 xs:-translate-y-[35px] translate-x-12 xs:translate-x-[60px] w-[215px] h-[41px] xs:w-[150px] rounded-[50%] bg-[#17283C] -z-10"></div>
        </div> */}
      </div>
      {/* <div className="flex relative h-full">
        <div className="flex h-full items-center justify-center w-full transition-all duration-200">
          {option === "hand" && preloadedImages.skeleton && (
            <>
              <img
                src={preloadedImages.skeleton}
                alt=""
                className="w-[285px] xs:w-[250px]"
              />
              <div className="bg-primary-blue p-2.5 absolute -translate-y-[120px] text-xs text-white rounded-full translate-x-20">
                Руки {hero?.data.handLevel} lvl
              </div>
              <div className="-translate-y-4 translate-x-20 border-2 border-primary-blue w-[95px] xs:w-[65px] h-[164px] xs:h-[144px] absolute rounded-3xl bg-[#1877F2]/10"></div>
              <div className=" -translate-x-20 xs:-translate-x-16 border-2 border-primary-blue w-[95px] xs:w-[65px] h-[179px] xs:h-[159px] absolute rounded-3xl bg-[#1877F2]/10"></div>
            </>
          )}
          {option === "leg" && preloadedImages.skeleton && (
            <>
              <img
                src={preloadedImages.skeleton}
                alt=""
                className="w-[285px] xs:w-[250px]"
              />
              <div className="bg-primary-blue p-2.5 absolute -translate-y-2 text-xs text-white rounded-full">
                Ноги {hero?.data.legLevel} lvl
              </div>
              <div className="translate-y-24 xs:translate-y-20 border-2 border-primary-blue w-[150px] h-[165px] xs:w-[130px] xs:h-[145px] absolute rounded-3xl bg-[#1877F2]/10"></div>
            </>
          )}
          {option === "back" && preloadedImages.skeletonBack && (
            <>
              <img
                src={preloadedImages.skeletonBack}
                alt=""
                className="w-[320px] h-[320px] xs:w-[260px] xs:h-[260px]"
              />
              <div className="bg-primary-blue p-2.5 absolute -translate-y-24 text-xs text-white rounded-full">
                Спина {hero?.data.backLevel} lvl
              </div>
              <div className="translate-y-10 border-2 border-primary-blue w-[95px] h-[230px] xs:w-[80px] xs:h-[180px] absolute rounded-3xl bg-[#1877F2]/10"></div>
            </>
          )}
        </div>
      </div> */}

      <div className="mt-auto">
        <div className="flex justify-center">
          <div className="flex w-80 xs:w-60 justify-center text-white text-center bg-primary-blue p-2.5 xs:p-2 rounded-full text-xs mb-1 mt-3 xs:mt-1">
            <p className="flex text-center">
              {entity?.data !== null && isLoading !== true
                ? `${entity?.data.price} ${t("pumping.to_next_level")}`
                : t("pumping.maximal_level")}
            </p>
          </div>
        </div>
        <div className="mb-4 xs:mb-2">
          <RadioGroup
            defaultValue={option}
            className="flex justify-center"
            onValueChange={(value: string) => {
              haptic.impactOccurred("soft");
              setOption(value);
            }}
          >
            <div>
              <RadioGroupItem value="hand" id="hand" className="peer sr-only" />
              <Label
                htmlFor="hand"
                className="flex text-lg flex-col text-primary-blue items-center justify-between rounded-lg border-2 border-muted bg-popover px-2.5 py-3 xs:px-2.5 xs:py-1 xs:text-sm peer-data-[state=checked]:border-primary-blue [&:has([data-state=checked])]:border-primary"
              >
                {t("common.hands")}
              </Label>
            </div>
            <div>
              <RadioGroupItem value="leg" id="leg" className="peer sr-only" />
              <Label
                htmlFor="leg"
                className="flex text-lg flex-col text-primary-blue items-center justify-between rounded-lg border-2 border-muted bg-popover px-2.5 py-3 xs:px-2.5 xs:py-1 xs:text-sm peer-data-[state=checked]:border-primary-blue [&:has([data-state=checked])]:border-primary"
              >
                {t("common.legs")}
              </Label>
            </div>
            <div>
              <RadioGroupItem value="back" id="back" className="peer sr-only" />
              <Label
                htmlFor="back"
                className="flex text-lg flex-col text-primary-blue items-center justify-between rounded-lg border-2 border-muted bg-popover px-2.5 py-3 xs:px-2.5 xs:py-1 xs:text-sm peer-data-[state=checked]:border-primary-blue [&:has([data-state=checked])]:border-primary"
              >
                {t("common.back")}
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex w-full">
          <Button
            variant="orange"
            className="w-full font-bold gap-x-2 py-3 xs:py-1 xs:text-base xs:leading-9 leading-9"
            onClick={() => mutation.mutate()}
          >
            {t("pumping.upgrade")}
          </Button>
        </div>
      </div>
    </div>
  );
};
