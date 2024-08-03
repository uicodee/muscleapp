import musclecoin from "@/assets/musclecoin.svg";
import {Button} from "@/shared/ui/button.tsx";
import {CopyIcon} from "@/assets/icons/copy.tsx";

interface BringCardProps {
    balance: string;
}

export const BringCard = ({balance}: BringCardProps) => {
    return (
        <div
            className="flex flex-col text-white gap-y-7 mt-4 w-full bg-primary-orange rounded-3xl py-5 justify-center text-center">
            <p>Приглашайте друзей, чтобы заработать $MUSCLE</p>
            <div className="flex w-full justify-center items-center gap-x-2">
                <img className="flex w-14" src={musclecoin} alt=""/>
                <p className="flex text-3xl font-semibold">{balance}</p>
            </div>
            <div className="flex w-full justify-center gap-x-2">
                <Button variant="secondary" className="font-medium">Пригласить друга</Button>
                <Button><CopyIcon /></Button>
            </div>
        </div>
    )
}