import {BalanceCard} from "@/shared/ui/balance-card.tsx";
import {Button} from "@/shared/ui/button.tsx";
import {Link} from "react-router-dom";
import {QuestionIcon} from "@/assets/icons/question.tsx";
import skeletHand from "@/assets/skelet-hand.svg";
import skeletLeg from "@/assets/skelet-leg.svg";
import skeletBack from "@/assets/skelet-back.svg";
import {RadioGroup, RadioGroupItem} from "@/shared/ui/radio-group.tsx";
import {Label} from "@/shared/ui/label.tsx";
import {useState} from "react";

export const LevelOverview = () => {
    const [option, setOption] = useState<string>("hands")
    return (
        <div className="flex flex-col h-full w-full pt-5 pb-10">
            <div className="flex flex-col w-full">
                <div className="flex w-full justify-between mb-4">
                    <BalanceCard balance={1232.44}/>
                    <Button size="icon" variant="icon" asChild><Link to="/settings"><QuestionIcon/></Link></Button>
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
                                {option === "hands" && <img src={skeletHand} alt=""/>}
                                {option === "legs" && <img src={skeletLeg} alt=""/>}
                                {option === "back" && <img src={skeletBack} alt=""/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center text-white text-center bg-primary-blue p-2.5 rounded-full text-xs mb-1 mt-3">
                <p className="flex text-center">243 $MUSCLE до следущего уровня</p>
            </div>
            <div className="mb-4">
                <RadioGroup defaultValue={option} className="flex justify-center" onValueChange={(value) => setOption(value)}>
                    <div>
                        <RadioGroupItem value="hands" id="hands" className="peer sr-only"/>
                        <Label
                            htmlFor="hands"
                            className="flex text-lg flex-col text-primary-blue items-center justify-between rounded-lg border-2 border-muted bg-popover px-2.5 py-3 peer-data-[state=checked]:border-primary-blue [&:has([data-state=checked])]:border-primary"
                        >
                            Руки
                        </Label>
                    </div>
                    <div>
                        <RadioGroupItem value="legs" id="legs" className="peer sr-only"/>
                        <Label
                            htmlFor="legs"
                            className="flex text-lg flex-col text-primary-blue items-center justify-between rounded-lg border-2 border-muted bg-popover px-2.5 py-3 peer-data-[state=checked]:border-primary-blue [&:has([data-state=checked])]:border-primary"
                        >
                            Ноги
                        </Label>
                    </div>
                    <div>
                        <RadioGroupItem value="back" id="back" className="peer sr-only"/>
                        <Label
                            htmlFor="back"
                            className="flex text-lg flex-col text-primary-blue items-center justify-between rounded-lg border-2 border-muted bg-popover px-2.5 py-3 peer-data-[state=checked]:border-primary-blue [&:has([data-state=checked])]:border-primary-blue"
                        >
                            Спина
                        </Label>
                    </div>

                </RadioGroup>
            </div>
            <div className="flex w-full">
                <Button variant="orange" className="w-full font-bold gap-x-2">
                    Прокачать
                </Button>
            </div>
        </div>
    )
}