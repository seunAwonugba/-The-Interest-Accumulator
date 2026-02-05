import express from "express";
import { calculateDailyInterest } from "../controller/interest";

const interest = express.Router();

interest.post("/", calculateDailyInterest );

export default interest;
