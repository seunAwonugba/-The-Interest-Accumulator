import { ANNUAL_RATE } from "../constant/constant";

export class InterestService {
    async calculateDailyInterest(payload: any) {
        const { principal, days } = payload;
        if (principal < 0 || days < 0)
            throw new Error("Principal and days must be positive numbers.");

        const dailyRate = ANNUAL_RATE / 100 / 365; // Convert % to fraction and divide by 365
        const interest = principal * dailyRate * days;
        return parseFloat(interest.toFixed(2)); // round to 2 decimal places
    }
}
