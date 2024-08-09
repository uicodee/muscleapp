import { useState, useEffect } from "react";
import { BalanceCard } from "@/shared/ui/balance-card.tsx";
import { Button } from "@/shared/ui/button.tsx";
import { Link } from "react-router-dom";
import { QuestionIcon } from "@/assets/icons/question.tsx";
import skeleton from "@/assets/skeleton.png";
import skeletonBack from "@/assets/back.png";
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

export const LevelOverview = () => {
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
      void queryClient.invalidateQueries({
        queryKey: ["user", "hero", "entity"],
      });
    },
  });

  const [preloadedImages, setPreloadedImages] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    const images = {
      skeleton: skeleton,
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
    <div className="flex flex-col w-full pt-5 xs:pt-2">
      <div className="flex flex-col w-full">
        <div className="flex w-full justify-between mb-4 xs:mb-2">
          <BalanceCard balance={user?.data.balance.points} />
          <Button size="icon" variant="icon" asChild>
            <Link to="/settings">
              <QuestionIcon />
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex relative h-full">
        <div className="flex h-full items-center justify-center w-full aspect-square transition-all duration-200">
          {option === "hand" && preloadedImages.skeleton && (
            <>
              <img
                src={preloadedImages.skeleton}
                alt=""
                className="w-[285px]"
              />
              <div className="bg-primary-blue p-2.5 absolute -translate-y-[120px] text-xs text-white rounded-full translate-x-20">
                Руки {hero?.data.handLevel} lvl
              </div>
              <div className="-translate-y-4 translate-x-20 border-2 border-primary-blue w-[95px] h-[164px] absolute rounded-3xl bg-[#1877F2]/10"></div>
              <div className=" -translate-x-20 border-2 border-primary-blue w-[95px] h-[179px] absolute rounded-3xl bg-[#1877F2]/10"></div>
            </>
          )}
          {option === "leg" && preloadedImages.skeleton && (
            <>
              <img
                src={preloadedImages.skeleton}
                alt=""
                className="w-[285px]"
              />
              <div className="bg-primary-blue p-2.5 absolute -translate-y-2 text-xs text-white rounded-full">
                Ноги {hero?.data.legLevel} lvl
              </div>
              <div className="translate-y-24 border-2 border-primary-blue w-[150px] h-[165px] absolute rounded-3xl bg-[#1877F2]/10"></div>
            </>
          )}
          {option === "back" && preloadedImages.skeletonBack && (
            <>
              <img
                src={preloadedImages.skeletonBack}
                alt=""
                className="w-[320px] h-[320px]"
              />
              <div className="bg-primary-blue p-2.5 absolute -translate-y-24 text-xs text-white rounded-full">
                Спина {hero?.data.backLevel} lvl
              </div>
              <div className="translate-y-10 border-2 border-primary-blue w-[95px] h-[230px] absolute rounded-3xl bg-[#1877F2]/10"></div>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex w-80 xs:w-60 justify-center text-white text-center bg-primary-blue p-2.5 xs:p-2 rounded-full text-xs mb-1 mt-3 xs:mt-1">
          <p className="flex text-center">
            {entity?.data !== null && isLoading !== true
              ? `${entity?.data.price} $MUSCLE до следующего уровня`
              : "Максимальный уровень"}
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
              className="flex text-lg flex-col text-primary-blue items-center justify-between rounded-lg border-2 border-muted bg-popover px-2.5 py-3 xs:px-1.5 xs:py-2 xs:text-sm peer-data-[state=checked]:border-primary-blue [&:has([data-state=checked])]:border-primary"
            >
              Руки
            </Label>
          </div>
          <div>
            <RadioGroupItem value="leg" id="leg" className="peer sr-only" />
            <Label
              htmlFor="leg"
              className="flex text-lg flex-col text-primary-blue items-center justify-between rounded-lg border-2 border-muted bg-popover px-2.5 py-3 xs:px-1.5 xs:py-2 xs:text-sm peer-data-[state=checked]:border-primary-blue [&:has([data-state=checked])]:border-primary"
            >
              Ноги
            </Label>
          </div>
          <div>
            <RadioGroupItem value="back" id="back" className="peer sr-only" />
            <Label
              htmlFor="back"
              className="flex text-lg flex-col text-primary-blue items-center justify-between rounded-lg border-2 border-muted bg-popover px-2.5 py-3 xs:px-1.5 xs:py-2 xs:text-sm peer-data-[state=checked]:border-primary-blue [&:has([data-state=checked])]:border-primary-blue"
            >
              Спина
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div className="flex w-full">
        <Button
          variant="orange"
          className="w-full font-bold gap-x-2 px-4 py-3 xs:text-sm xs:py-2"
          onClick={() => mutation.mutate()}
        >
          Прокачать
        </Button>
      </div>
    </div>
  );
};
