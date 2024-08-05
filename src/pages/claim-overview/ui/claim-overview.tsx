import muscle from "@/assets/muscle.png"
import {Link} from "react-router-dom";

export const ClaimOverview = () => {
    return (
        <Link to="/">
            <div className="flex flex-col w-full h-lvh justify-center items-center gap-y-6">
                <img src={muscle} alt="" className="flex w-36"/>
                <h2 className="text-center w-10/12 text-3xl text-primary-text font-bold">Вы получили 344 $MUSCLE</h2>
            </div>
        </Link>
    )
}