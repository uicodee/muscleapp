// {
//   "tg_id": 0,
//   "id": 0,
//   "username": "string",
//   "wallet_address": "string",
//   "balance": {
//     "id": 0,
//     "user_id": 0,
//     "points": "string"
//   }
// }

export interface Balance {
  id: number;
  userId: number;
  points: string;
}

export interface User {
  tgId: number;
  id: number;
  language: string;
  username: string;
  walletAddress: string;
  balance: Balance;
}

export interface Referral {
  id: number;
  points: number;
  username: string;
}

export interface Referrals {
  totalPoints: number;
  referrals: Referral[];
}
