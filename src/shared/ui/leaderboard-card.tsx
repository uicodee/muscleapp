import { Referral } from "../api/models/user";

interface LeaderboardCardProps {
  referralsCount: number;
  referrals: Referral[];
}

export const LeaderboardCard = ({
  referralsCount,
  referrals,
}: LeaderboardCardProps) => {
  return (
    <div className="flex flex-col text-primary-text mt-4 w-full bg-white rounded-3xl p-4 justify-center text-center">
      <div className="flex justify-between">
        <p>{referralsCount} Referrals</p>
        <p>Tokens</p>
      </div>
      <div className="flex flex-col gap-y-5 mt-5">
        {referrals.map((referral, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <div className="w-7 h-7 rounded-full bg-purple-200" />
              <p className="text-sm">{referral.username}</p>
            </div>
            <p className="flex text-sm">{referral.points}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
