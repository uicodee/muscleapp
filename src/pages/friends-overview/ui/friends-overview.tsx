import {Heading} from "@/shared/ui/heading.tsx";
import {BringCard} from "@/shared/ui/bring-card.tsx";
import {LeaderboardCard} from "@/shared/ui/leaderboard-card.tsx";

export const FriendsOverview = () => {
    return (
        <div className="mt-20">
            <Heading className="text-center">Приглашай</Heading>
            <BringCard balance="1227"/>
            <LeaderboardCard
                referrals={0}
                users={[
                    {
                        fullName: "Abduxalilov Abduxalil",
                        tokens: 45000
                    },
                    {
                        fullName: "Ivan Ivanov",
                        tokens: 99000
                    },
                    {
                        fullName: "Jason Stateham",
                        tokens: 99000
                    },
                    {
                        fullName: "Robert Downey JR",
                        tokens: 99000
                    },
                    {
                        fullName: "Hamster User",
                        tokens: 199000
                    },
                    {
                        fullName: "Combatter",
                        tokens: 19900089
                    }
                ]}
            />
        </div>
    )
}