export interface Farming {
    id: number;
    heroId: number;
    farmingSpeed: number;
    lastClaim: string | null;
}

export interface Hero {
    id: number;
    userId: number;
    legLevel: number;
    handLevel: number;
    backLevel: number;
    farming: Farming
}
