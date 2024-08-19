import { Heading } from "@/shared/ui/heading.tsx";
import { BringCard } from "@/shared/ui/bring-card.tsx";
import { useQuery } from "@tanstack/react-query";
import UserService from "@/shared/api/service/user";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { useTranslation } from "react-i18next";
import { LeaderboardCard } from "@/shared/ui/leaderboard-card";
import { Referral } from "@/shared/api/models/user";

export const FriendsOverview = () => {
  const { t } = useTranslation();
  const { initDataRaw } = retrieveLaunchParams();
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => UserService.getUser(initDataRaw),
  });
  const { data, isLoading } = useQuery({
    queryKey: ["referrals"],
    queryFn: () => UserService.getReferrals(initDataRaw),
  });
  return (
    !isLoading && (
      <div className="mt-20">
        <Heading className="text-center">{t("friends.title")}</Heading>
        <BringCard balance={user?.data.balance.points as string} />
        <LeaderboardCard
          referralsCount={data?.data.referrals.length as number}
          referrals={data?.data.referrals as Referral[]}
        />
      </div>
    )
  );
};
