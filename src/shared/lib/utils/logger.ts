import chalk from "chalk";
import pino from "pino";
import pretty from "pino-pretty";

export const log = pino(pretty({ colorize: true }));

export function logger(
  message: string | Error,
  level: "info" | "warn" | "error" | "success" = "info",
): void {
  const logMessage = `[${level.toUpperCase()}] ${message}`;

  if (level === "warn") {
    log.warn(logMessage);
  }
  if (level === "error") {
    log.error(logMessage);
  }

  if (level === "info") {
    log.info(logMessage);
  }
  if (level === "success") {
    console.log(`${chalk.green(message)}`);
  }
}
