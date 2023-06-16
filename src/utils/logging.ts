import winston from "winston";

const { combine, timestamp, colorize, printf } = winston.format;

let logger: winston.Logger;

const loggerFormat = () => {
  return combine(
    timestamp({ format: "DD/MM/YYYY HH:mm:ss" }),
    printf(({ level, message, timestamp }) => {
      return colorize().colorize(
        level,
        `${timestamp} [${level.toUpperCase()}] ${message}`
      );
    })
  );
};

/**
 * Get the root logger.
 */
const getLogger = () => {
  if (!logger) {
    initializeLogger({
      level: process.env.LOG_LEVEL || "info",
      disabled: process.env.LOG_DISABLED === "true",
      defaultMeta: {
        NODE_ENV: process.env.NODE_ENV,
      },
      extraTransports: [],
    });
  }
  return logger;
};

/**
 * Initialize the root logger.
 */
const initializeLogger = ({
  level,
  disabled,
  defaultMeta = {},
  extraTransports = [],
}: {
  level: string;
  disabled: boolean;
  defaultMeta: object;
  extraTransports: winston.transport[];
}) => {
  logger = winston.createLogger({
    level,
    defaultMeta,
    format: loggerFormat(),
    transports: [
      new winston.transports.Console({
        silent: disabled,
      }),
      ...extraTransports,
    ],
  });
  logger.info(
    `Logger initialized with minimum log level: ${level.toUpperCase()}`
  );
};

export { getLogger, initializeLogger };
