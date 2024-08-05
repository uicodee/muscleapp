import character from "@/assets/body.png"
import {Button} from "@/shared/ui/button.tsx";
import {LockIcon} from "@/assets/icons/lock.tsx";
import {BalanceCard} from "@/shared/ui/balance-card.tsx";
import {SettingsIcon} from "@/assets/icons/settings.tsx";
import {Link} from "react-router-dom";
import {retrieveLaunchParams} from "@telegram-apps/sdk-react";
import HeroService from "@/shared/api/service/hero.ts";
import {useQuery} from "@tanstack/react-query";
import UserService from "@/shared/api/service/user.ts";

export const HomePage = () => {
    const {initDataRaw} = retrieveLaunchParams();
    const {data: hero} = useQuery({
        queryKey: ["hero"],
        queryFn: () => HeroService.getHero(initDataRaw)
    })
    const {data: user} = useQuery({
        queryKey: ["user"],
        queryFn: () => UserService.getUser(initDataRaw)
    })
    return (
        <div className="flex flex-col w-full pt-5">
            <div className="flex flex-col w-full">
                <div className="flex w-full justify-between mb-4">
                    <BalanceCard balance={user?.data.balance.points}/>
                    <Button size="icon" variant="icon" asChild><Link to="/claim"><SettingsIcon/></Link></Button>
                </div>
                <div className="grid grid-cols-3 gap-x-1 text-white text-base z-10">
                    <Button variant="chip" size="chip">Руки {hero?.data.handLevel} lvl</Button>
                    <Button variant="chip" size="chip">Спина {hero?.data.backLevel} lvl</Button>
                    <Button variant="chip" size="chip">Ноги {hero?.data.legLevel} lvl</Button>
                </div>
            </div>
            <div className="flex relative h-full">
                <div className="flex h-full items-center justify-center w-full aspect-square">
                    <div
                        className="absolute inset-0 flex items-center justify-center rounded-full bg-white/30 ring-4 ring-white/30">
                        <div
                            className="flex items-center justify-center w-10/12 aspect-square bg-white/35 rounded-full ring-4 ring-white/35">
                            <div
                                className="flex items-center justify-center w-10/12 aspect-square bg-white rounded-full ring-4 ring-white">
                                <img src={character} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-auto">
                <div className="flex w-full flex-col gap-y-4 text-lg">
                    <Button className="w-full font-bold gap-x-2">
                        Начать фарминг
                        <LockIcon/>
                    </Button>
                    <Button variant="orange" className="font-bold gap-x-2">
                        Boost-game
                        <div
                            className="bg-primary-blue px-2.5 py-2 rounded-full text-sm font-normal rotate-8">soon</div>
                    </Button>
                </div>
            </div>
        </div>
    );
}
