import muscle from "@/assets/musclecoin.png";

interface BalanceCard {
  balance: string | undefined;
}
export const BalanceCard = ({ balance }: BalanceCard) => {
  return (
    <div className="flex items-center px-4 py-2 xs:px-3 xs:py-1 bg-primary-orange rounded-lg gap-x-4">
      <img src={muscle} alt="" className="flex w-10 h-10 xs:w-8 xs:h-8" />
      <div className="flex flex-col text-white">
        <p className="font-inter text-xs">$MUSCLE</p>
        <p className="text-base xs:text-sm">{balance}</p>
      </div>
    </div>
  );
};
