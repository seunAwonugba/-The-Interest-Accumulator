import "dotenv/config";
import express from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import interest from "./router/interest";

const app = express();
app.set("trust proxy", 1);
app.disable("x-powered-by");

app.use(express.json());

app.use((req, res, next) => {
    res.removeHeader("Server");
    res.removeHeader("X-Powered-By");
    next();
});
app.use(express.text({ type: "application/xml" }));
app.use((req, res, next) => {
    res.setHeader("Server", "secure-server");
    next();
});

app.use("/api/v1/interest", interest);

app.get("/health", (req, res) => {
    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
    });
});

app.use("*", (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        data: `service ${ReasonPhrases.NOT_FOUND.toLowerCase()}`,
    });
});
// app.use(errorMiddleware);

const startServer = async () => {
    try {
        app.listen(Number(process.env.PORT), String(process.env.HOST), () => {
            console.log(
                `⚡️[server]: Server is running at http://${process.env.HOST}:${process.env.PORT}`,
            );
        });
    } catch (error) {
        console.log("😥 [server]", error);
        process.exit(1);
    }
};

startServer();
