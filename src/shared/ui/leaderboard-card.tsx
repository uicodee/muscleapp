interface User {
    fullName: string;
    tokens: number
}

interface LeaderboardCardProps {
    referrals: number;
    users: User[]
}

export const LeaderboardCard = ({referrals, users}: LeaderboardCardProps) => {
    return (
        <div
            className="flex flex-col text-primary-text mt-4 w-full bg-white rounded-3xl p-4 justify-center text-center">
            <div className="flex justify-between">
                <p>{referrals} Referrals</p>
                <p>Tokens</p>
            </div>
            <div className="flex flex-col gap-y-5 mt-5">
                {users.map((user, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-x-2">
                            <div className="w-7 h-7 rounded-full bg-purple-200"/>
                            <p className="text-sm">{user.fullName}</p>
                        </div>
                        <p className="flex text-sm">{user.tokens}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}