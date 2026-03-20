import pinoHttp from "pino-http";
import pino from "pino";

const isProd = process.env.NODE_ENV === "production";

const transport = !isProd
  ? {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:standard",
        ignore: "pid,hostname",
      },
    }
  : undefined as any;

export const logger = pino({
  level: isProd ? "info" : "debug",
  transport,
});