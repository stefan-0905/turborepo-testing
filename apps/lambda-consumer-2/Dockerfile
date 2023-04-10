FROM node:18-alpine as base

## Globally install `turbo`
RUN npm i -g turbo

# Prune the workspace for the `lambda-consumer-2` app
FROM base as pruner
WORKDIR /app
COPY . .
RUN turbo prune --scope=lambda-consumer-2 --docker

# Add pruned lockfile and package.json's of the pruned subworkspace
FROM base as installer
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
# Install only the deps needed to build the target
RUN npm install

# Copy source code of pruned subworkspace and build
FROM base as builder
WORKDIR /app
COPY --from=pruner /app/.git ./.git
COPY --from=pruner /app/out/full/ .
COPY --from=installer /app/ .
RUN turbo run build --filter=lambda-consumer-2

FROM builder as runner

# Don't run production as root
RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs
USER expressjs

ENTRYPOINT [ "/usr/local/bin/node" ]
CMD ["./apps/lambda-consumer-2/dist/index.js"]