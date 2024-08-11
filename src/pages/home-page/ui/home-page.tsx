import { Button } from "@/shared/ui/button.tsx";
import { BalanceCard } from "@/shared/ui/balance-card.tsx";
import { SettingsIcon } from "@/assets/icons/settings.tsx";
import { Link, useNavigate } from "react-router-dom";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import HeroService from "@/shared/api/service/hero.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UserService from "@/shared/api/service/user.ts";
import FarmingService from "@/shared/api/service/farming";
import { useEffect, useState } from "react";
import character from "@/assets/body.png";
import { formatTime } from "@/shared/data/helpers";
import { LockIcon } from "@/assets/icons/lock";

export const HomePage = () => {
  const navigate = useNavigate();
  const [width, setWidth] = useState<number>(0);
  // const [seconds, setSeconds] = useState<number>(0);
  const queryClient = useQueryClient();

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
    queryFn: () =>
      FarmingService.getFarming(initDataRaw).then((r) => {
        const initialWidth =
          (380 / (r?.data?.farmingSpeed ?? 1)) * (r?.data?.alreadyFarmed ?? 0);
        setWidth(initialWidth);
        return r;
      }),
  });
  const mutation = useMutation({
    mutationFn: () => FarmingService.claim(initDataRaw),
  });

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setSeconds((prevSeconds) => prevSeconds + 1);

  //     if (farming?.data?.farmingSpeed && farming?.data?.alreadyFarmed) {
  //       const newWidth =
  //         (380 / farming.data.farmingSpeed) * farming.data.alreadyFarmed;

  //       setWidth(newWidth);
  //     }
  //   }, 1000);

  //   return () => clearInterval(intervalId);
  // }, [farming]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      queryClient.invalidateQueries({ queryKey: ["farming"] });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [farming]);

  return (
    <div className="flex flex-col w-full min-h-full pt-5 xs:pt-2">
      {/* <div className="flex w-full justify-center">
        {isExploding && (
          <ConfettiExplosion
            particleCount={500}
            duration={3000}
            width={1600}
            zIndex={100}
            onComplete={() => setIsExploding(false)}
          />
        )}
      </div> */}
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
            className="px-4 py-3 xs:px-3 xs:py-2.5 xs:text-sm"
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

      {/* Circle Block */}
      <div className="flex-grow flex justify-center items-center relative w-full h-full overflow-visible -z-10">
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-[434px] h-[434px] rounded-full bg-white/29 flex justify-center items-center">
            <div className="w-[380px] h-[380px] rounded-full bg-white/35 flex justify-center items-center">
              <div className="w-[330px] h-[330px] rounded-full bg-white"></div>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <img src={character} alt="Character" />
          <div className="absolute -translate-y-10 translate-x-12 w-[215px] h-[41px] rounded-[50%] bg-[#17283C] -z-10"></div>
        </div>
      </div>

      <div className="mt-auto">
        {hero?.data.handLevel !== 0 &&
          farming?.data.farmingSpeed !== farming?.data.alreadyFarmed && (
            <div className="flex w-full justify-center font-base text-primary-gray leading-6 text-center text-xs">
              {formatTime(farming?.data.leftToClaim as number)}
            </div>
          )}
        <div className="flex w-full flex-col gap-y-3 xs:gap-y-1 text-lg ">
          {hero?.data.handLevel !== 0 ? (
            farming?.data.farmingSpeed === farming?.data.alreadyFarmed ? (
              <Button
                variant="chip"
                className="font-bold py-3 xs:py-1 xs:text-base xs:leading-9 leading-9"
                onClick={() => {
                  mutation.mutate();
                  navigate(`/claim/${farming?.data.alreadyFarmed}`);
                  // queryClient
                  //   .invalidateQueries({ queryKey: ["hero"] })
                  //   .then(() => {
                  //     queryClient
                  //       .invalidateQueries({ queryKey: ["user"] })
                  //       .then(() => {
                  //         queryClient
                  //           .invalidateQueries({
                  //             queryKey: ["farming"],
                  //           })
                  //           .then(() => {
                  //             navigate(`/claim/${farming?.data.alreadyFarmed}`);
                  //           });
                  //       });
                  //   });
                }}
              >
                Клейм
              </Button>
            ) : (
              <div className="relative w-full py-3 xs:py-1 bg-primary-blue/65 rounded-lg overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-primary-blue rounded-lg transition-all duration-1000 ease-in-out"
                  style={{ width: width }}
                ></div>
                <div className="relative z-10 text-white text-center text-base xs:text-sm leading-9">
                  <p className="leading-9">
                    Фарминг $MUSCLE {farming?.data.alreadyFarmed} /{" "}
                    {farming?.data.farmingSpeed}
                  </p>
                </div>
              </div>
            )
          ) : (
            <Button className="w-full font-bold gap-x-2 py-3 xs:text-base xs:py-1 xs:leading-9 leading-9">
              Начать фарминг
              <LockIcon />
            </Button>
          )}
          <Button
            variant="orange"
            className="font-bold gap-x-2 py-3 xs:py-1 xs:text-base xs:leading-9 leading-9"
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
