FROM node:18-bullseye

RUN corepack enable && corepack prepare pnpm@8.6.9 --activate

WORKDIR /app

COPY ./package.json ./package.json
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
COPY ./patches ./patches

RUN pnpm install

COPY . .

RUN pnpm build

# USER node

# RUN chown -Rh $user:$user /app

# For running image beyond docker compose
CMD ["pnpm", "start"]
