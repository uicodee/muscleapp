import character from "@/assets/body.png"
import { Button } from "@/shared/ui/button.tsx";
import {LockIcon} from "@/assets/icons/lock.tsx";
import {BalanceCard} from "@/shared/ui/balance-card.tsx";
import {SettingsIcon} from "@/assets/icons/settings.tsx";
import {Link} from "react-router-dom";

export const HomePage = () => {
    return (
        <div className="flex flex-col h-full w-full pt-5 pb-10">
            <div className="flex flex-col w-full">
                <div className="flex w-full justify-between mb-4">
                    <BalanceCard balance={1232.44}/>
                    <Button size="icon" variant="icon" asChild><Link to="/settings"><SettingsIcon /></Link></Button>
                </div>
                {/*    <Card className="flex px-5 py-2 gap-x-4">*/}
                {/*        <img className="flex" src={musclecoin} alt=""/>*/}
                {/*        <div className="flex flex-col">*/}
                {/*            <span className="flex font-inter text-sm">$MUSCLE</span>*/}
                {/*            <p className="flex text-base">1232.44</p>*/}
                {/*        </div>*/}
                {/*    </Card>*/}
                {/*    <Button variant="icon" size="icon" asChild>*/}
                {/*        <Link to="/settings">*/}
                {/*            <svg width="26" height="26" viewBox="0 0 26 26" fill="none"*/}
                {/*                 xmlns="http://www.w3.org/2000/svg">*/}
                {/*                <path*/}
                {/*                    d="M13 17.3334C15.3898 17.3334 17.3333 15.3899 17.3333 13C17.3333 10.6102 15.3898 8.66669 13 8.66669C10.6101 8.66669 8.66663 10.6102 8.66663 13C8.66663 15.3899 10.6101 17.3334 13 17.3334ZM13 10.8334C14.1743 10.8334 15.1666 11.8257 15.1666 13C15.1666 14.1744 14.1743 15.1667 13 15.1667C11.8256 15.1667 10.8333 14.1744 10.8333 13C10.8333 11.8257 11.8256 10.8334 13 10.8334Z"*/}
                {/*                    fill="white"/>*/}
                {/*                <path*/}
                {/*                    d="M3.08204 17.4807L4.16538 19.3549C4.74063 20.3483 6.12513 20.7209 7.12288 20.1457L7.69596 19.8142C8.32646 20.3093 9.01871 20.7155 9.74996 21.0189V21.6667C9.74996 22.8616 10.7217 23.8334 11.9166 23.8334H14.0833C15.2782 23.8334 16.25 22.8616 16.25 21.6667V21.0189C16.9812 20.7155 17.6735 20.3093 18.304 19.8153L18.877 20.1468C19.877 20.7209 21.2582 20.3504 21.8356 19.3549L22.9179 17.4818C23.5159 16.4472 23.1605 15.119 22.126 14.5221L21.5789 14.2058C21.6374 13.8039 21.6666 13.4019 21.6666 13C21.6666 12.5981 21.6374 12.1951 21.5789 11.7964L22.126 11.4801C23.1605 10.8821 23.5159 9.55502 22.9179 8.52044L21.8356 6.64735C21.2604 5.65069 19.877 5.27694 18.877 5.85435L18.304 6.18585C17.6735 5.69077 16.9812 5.28452 16.25 4.98119V4.33335C16.25 3.13844 15.2782 2.16669 14.0833 2.16669H11.9166C10.7217 2.16669 9.74996 3.13844 9.74996 4.33335V4.98119C9.01871 5.28452 8.32646 5.69077 7.69596 6.18477L7.12288 5.85327C6.12188 5.27802 4.73954 5.65069 4.16429 6.64627L3.08204 8.51935C2.48404 9.55394 2.83938 10.8821 3.87396 11.479L4.42104 11.7954C4.36254 12.1951 4.33329 12.5981 4.33329 13C4.33329 13.4019 4.36254 13.8039 4.42104 14.2036L3.87396 14.5199C2.83938 15.1179 2.48404 16.4461 3.08204 17.4807ZM6.68521 14.4929C6.56279 14.0021 6.49996 13.4994 6.49996 13C6.49996 12.4995 6.56279 11.9969 6.68413 11.5072C6.80113 11.0381 6.59421 10.5484 6.17496 10.3069L4.95838 9.60269L6.03954 7.7296L7.27996 8.44677C7.69596 8.68619 8.21921 8.62552 8.56696 8.29294C9.30688 7.59202 10.1995 7.06769 11.1496 6.77735C11.6057 6.63869 11.9166 6.21727 11.9166 5.74169V4.33335H14.0833V5.74169C14.0833 6.21727 14.3942 6.63869 14.8503 6.77735C15.8004 7.06877 16.693 7.59202 17.433 8.29294C17.7807 8.62552 18.3061 8.6851 18.72 8.44677L19.9593 7.73069L21.0426 9.60377L19.825 10.3069C19.4057 10.5495 19.1988 11.0392 19.3158 11.5072C19.4371 11.9969 19.5 12.4995 19.5 13C19.5 13.4994 19.4371 14.0021 19.3147 14.4929C19.1988 14.9619 19.4057 15.4516 19.825 15.6932L21.0415 16.3963L19.9604 18.2694L18.72 17.5533C18.305 17.3139 17.7807 17.3734 17.433 17.7071C16.693 18.408 15.8004 18.9324 14.8503 19.2227C14.3942 19.3614 14.0833 19.7828 14.0833 20.2584L14.0855 21.6667H11.9166V20.2584C11.9166 19.7828 11.6057 19.3614 11.1496 19.2227C10.1995 18.9313 9.30688 18.408 8.56696 17.7071C8.36113 17.5099 8.09246 17.4092 7.82163 17.4092C7.63529 17.4092 7.44896 17.4569 7.27996 17.5544L6.04063 18.2715L4.95729 16.3984L6.17496 15.6932C6.59421 15.4516 6.80113 14.9619 6.68521 14.4929Z"*/}
                {/*                    fill="white"/>*/}
                {/*            </svg>*/}
                {/*        </Link>*/}
                {/*    </Button>*/}
                {/*</div>*/}
                <div className="grid grid-cols-3 gap-x-1 text-white text-base z-10">
                    <Button variant="chip" size="chip">Руки 1 lvl</Button>
                    <Button variant="chip" size="chip">Спина 1 lvl</Button>
                    <Button variant="chip" size="chip">Ноги 1 lvl</Button>
                </div>
            </div>
            {/*<div className="flex relative items-center justify-center m-4">*/}
            {/*    <div className="flex items-center justify-center w-full aspect-square bg-white/30 rounded-full">*/}
            {/*        <div className="flex items-center justify-center w-10/12 aspect-square bg-white/35 rounded-full">*/}
            {/*            <div className="flex items-center justify-center w-10/12 aspect-square bg-white rounded-full">*/}
            {/*                <img src={character} alt=""/>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
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
                        <LockIcon />
                    </Button>
                    <Button variant="orange" className="font-bold gap-x-2">
                        Boost-game
                        <div className="bg-primary-blue px-2.5 py-2 rounded-full text-sm font-normal rotate-8">soon</div>
                    </Button>
                </div>
            </div>
        </div>
    );
}
