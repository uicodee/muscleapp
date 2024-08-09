import character from "@/assets/body.png";
import { Button } from "@/shared/ui/button.tsx";
import { LockIcon } from "@/assets/icons/lock.tsx";
import { BalanceCard } from "@/shared/ui/balance-card.tsx";
import { SettingsIcon } from "@/assets/icons/settings.tsx";
import { Link } from "react-router-dom";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import HeroService from "@/shared/api/service/hero.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import UserService from "@/shared/api/service/user.ts";
import FarmingService from "@/shared/api/service/farming";

export const HomePage = () => {
  const { initDataRaw } = retrieveLaunchParams();
  const { data: hero } = useQuery({
    queryKey: ["hero"],
    queryFn: () => HeroService.getHero(initDataRaw),
  });
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => UserService.getUser(initDataRaw),
  });
  const { data: farming } = useQuery({
    queryKey: ["farming"],
    queryFn: () => FarmingService.getFarming(initDataRaw),
  });
  const mutation = useMutation({
    mutationFn: () => FarmingService.claim(initDataRaw),
  });
  return (
    <div className="flex flex-col w-full pt-5 xs:pt-2">
      <div className="flex flex-col w-full">
        <div className="flex w-full justify-between mb-4 xs:mb-2">
          <BalanceCard balance={user?.data.balance.points} />
          <Button size="icon" variant="icon" asChild>
            <Link to="/settings">
              <SettingsIcon />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-x-1 text-white text-base z-10">
          <Button
            className="px-4 py-3 xs:px-1 xs:py-1 xs:text-sm"
            variant="chip"
            size="chip"
          >
            Руки {hero?.data.handLevel} lvl
          </Button>
          <Button
            className="px-4 py-3 xs:px-1 xs:py-1 xs:text-sm"
            variant="chip"
            size="chip"
          >
            Спина {hero?.data.backLevel} lvl
          </Button>
          <Button
            className="px-4 py-3 xs:px-1 xs:py-1 xs:text-sm"
            variant="chip"
            size="chip"
          >
            Ноги {hero?.data.legLevel} lvl
          </Button>
        </div>
      </div>
      <div className="flex relative h-full">
        <div className="flex h-full items-center justify-center w-full aspect-square">
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white/30 ring-4 ring-white/30">
            <div className="flex items-center justify-center w-10/12 aspect-square bg-white/35 rounded-full ring-4 ring-white/35">
              <div className="flex items-center justify-center w-10/12 aspect-square bg-white rounded-full ring-4 ring-white">
                <img src={character} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <div className="flex w-full flex-col gap-y-4 xs:gap-y-2 text-lg ">
          {farming?.data !== null ? (
            <div
              className="bg-primary-blue/65 rounded-lg z-10 text-center text-sm px-2 py-2"
              onClick={() => mutation.mutate()}
            >
              <p>
                Фарминг $MUSCLE {farming?.data.alreadyFarmed} /{" "}
                {farming?.data.farmingSpeed}
              </p>
              {/* <div className="rounded-lg w-6/12 bg-primary-blue px-4 py-4"></div> */}
            </div>
          ) : (
            // <p>
            //   {farming?.data.alreadyFarmed} / {farming?.data.farmingSpeed}
            // </p>
            <Button className="w-full font-bold gap-x-2 px-4 py-3 xs:text-sm xs:py-2">
              Начать фарминг
              <LockIcon />
            </Button>
          )}
          <Button
            variant="orange"
            className="font-bold gap-x-2 px-4 py-3 xs:text-sm xs:py-2"
          >
            Boost-game
            <div className="bg-primary-blue px-2.5 py-2 xs:text-xs xs:px-2 xs:py-1 rounded-full text-sm font-normal rotate-8">
              soon
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};
