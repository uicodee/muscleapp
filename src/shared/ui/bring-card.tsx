import muscle from "@/assets/musclecoin.png";
import { Button } from "@/shared/ui/button.tsx";
import { CopyIcon } from "@/assets/icons/copy.tsx";

interface BringCardProps {
  balance: string;
}

export const BringCard = ({ balance }: BringCardProps) => {
  return (
    <div className="flex flex-col text-white gap-y-7 mt-4 w-full bg-primary-orange rounded-3xl py-5 justify-center text-center">
      <p>Приглашайте друзей, чтобы заработать $MUSCLE</p>
      <div className="flex w-full justify-center items-center gap-x-2">
        <img className="flex w-14" src={muscle} alt="" />
        <p className="flex text-3xl font-semibold">{balance}</p>
      </div>
      <div className="flex w-full justify-center gap-x-2">
        <Button variant="secondary" className="font-medium px-4 py-3">
          Пригласить друга
        </Button>
        <Button className="p-4">
          <CopyIcon />
        </Button>
      </div>
    </div>
  );
};
