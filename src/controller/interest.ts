import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { InterestService } from "../service/interest";

const interestService = new InterestService();
export const calculateDailyInterest = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const calculateInterest = await interestService.calculateDailyInterest(
            req.body,
        );
        res.status(StatusCodes.OK).json({
            success: true,
            data: calculateInterest,
            statusCode: StatusCodes.OK,
        });
    } catch (error) {
        next(error);
    }
};
