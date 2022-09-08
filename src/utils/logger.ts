import { transports, createLogger, format } from 'winston';

export default createLogger({
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize({ all: true }),
                format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss' }),
                format.align(),
                format.splat(),
                format.json(),
                format.printf((info) => {
                    const { timestamp, level, message } = info;
                    return `${timestamp} [${level}]: ${message.trim()}`;
                }),
            ),
        }),
    ],
    exitOnError: false,
});
