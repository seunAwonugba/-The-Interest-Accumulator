import { InterestService } from "../service/interest";
import Decimal from "decimal.js";

describe("InterestService", () => {
    const service = new InterestService();

    it("calculates daily interest correctly for normal values", async () => {
        const result = await service.calculateDailyInterest({
            principal: 1000,
            days: 30,
        });
        // 27.5% annual -> daily rate = 0.275 / 365 ≈ 0.0007534246575
        // Interest = 1000 * dailyRate * 30 ≈ 22.60
        expect(result).toBe(22.6);
    });

    it("rounds to 2 decimal places correctly", async () => {
        const result = await service.calculateDailyInterest({
            principal: 1234.56,
            days: 45,
        });
        const expected = new Decimal(1234.56)
            .mul(new Decimal(27.5).div(100).div(365))
            .mul(45)
            .toDecimalPlaces(2)
            .toNumber();
        expect(result).toBe(expected);
    });

    it("returns 0 if principal or days is 0", async () => {
        const result1 = await service.calculateDailyInterest({
            principal: 0,
            days: 10,
        });
        const result2 = await service.calculateDailyInterest({
            principal: 1000,
            days: 0,
        });
        expect(result1).toBe(0);
        expect(result2).toBe(0);
    });

    it("throws an error for negative principal or days", async () => {
        await expect(
            service.calculateDailyInterest({ principal: -100, days: 10 }),
        ).rejects.toThrow("Principal and days must be positive numbers.");
        await expect(
            service.calculateDailyInterest({ principal: 100, days: -10 }),
        ).rejects.toThrow("Principal and days must be positive numbers.");
    });

    it("handles leap years correctly (using 365 days approximation)", async () => {
        const principal = 1000;
        const days = 366; // Leap year
        const dailyRate = new Decimal(27.5).div(100).div(365);
        const expected = new Decimal(principal)
            .mul(dailyRate)
            .mul(days)
            .toDecimalPlaces(2)
            .toNumber();
        const result = await service.calculateDailyInterest({
            principal,
            days,
        });
        expect(result).toBe(expected);
    });
});
