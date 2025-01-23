import pino from "pino"

export const logger = pino({
  name: "fish-bite",
  level: "debug",
})
