import { ANNUAL_RATE } from "../constant/constant";
import { IInterestPayload } from "../interface/Interest";
//Ensure math precision (no floating-point errors).
import { Decimal } from "decimal.js";

export class InterestService {
    async calculateDailyInterest(payload: IInterestPayload) {
        const { principal, days } = payload;
        if (principal < 0 || days < 0)
            throw new Error("Principal and days must be positive numbers.");

        // Convert annual rate to daily rate using Decimal
        const dailyRate = new Decimal(ANNUAL_RATE).div(100).div(365);

        // Calculate interest
        const interest = new Decimal(principal).mul(dailyRate).mul(days);

        // Round to 2 decimal places
        return interest.toDecimalPlaces(2).toNumber();
    }
}
