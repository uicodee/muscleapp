export interface Farming {
    id: number;
    heroId: number;
    lastClaim: string | null;
    farmingSpeed: number;
    alreadyFarmed: number;
    leftToClaim: number;
}