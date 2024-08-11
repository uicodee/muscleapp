import muscle from "@/assets/muscle.png";
import ConfettiExplosion from "react-confetti-explosion";
import { Link, useParams } from "react-router-dom";

export const ClaimOverview = () => {
  const { amount } = useParams();
  return (
    <Link to="/">
      <div className="flex w-full justify-center">
        <ConfettiExplosion
          particleCount={250}
          duration={3000}
          width={1600}
          zIndex={100}
        />
      </div>
      <div className="flex flex-col w-full h-lvh justify-center items-center gap-y-6">
        <img src={muscle} alt="" className="flex w-36" />
        <h2 className="text-center w-10/12 text-3xl text-primary-text font-bold">
          Вы получили {amount} $MUSCLE
        </h2>
      </div>
    </Link>
  );
};
