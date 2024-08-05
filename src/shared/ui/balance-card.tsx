import muscle from "@/assets/musclecoin.png"

interface BalanceCard {
    balance: string | undefined
}
export const BalanceCard = ({balance}: BalanceCard) => {
    return (
        <div className="flex px-4 py-2 bg-primary-orange rounded-lg gap-x-4">
            <img src={muscle} alt="" className="flex w-10 h-10"/>
            <div className="flex flex-col text-white">
                <p className="font-inter text-xs">$MUSCLE</p>
                <p>{balance}</p>
            </div>
        </div>
    )
}