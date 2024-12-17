# Stage for downloading curl-impersonate
FROM debian:bullseye AS curl-impersonate

# Install necessary packages, including ca-certificates for SSL verification
RUN apt-get update && apt-get install -y \
    wget \
    tar \
    ca-certificates \
    --no-install-recommends && \
    update-ca-certificates && \
    rm -rf /var/lib/apt/lists/*

RUN wget https://github.com/lwthiker/curl-impersonate/releases/download/v0.6.1/curl-impersonate-v0.6.1.x86_64-linux-gnu.tar.gz \
    && tar -xvzf curl-impersonate-v0.6.1.x86_64-linux-gnu.tar.gz \
    && rm curl-impersonate-v0.6.1.x86_64-linux-gnu.tar.gz

RUN ls ./curl-impersonate-chrome

# Main build stage
FROM node:20-bullseye

# Copy curl-impersonate-chrome from the previous stage directly into the main stage
COPY --from=curl-impersonate /curl-impersonate-chrome /usr/local/bin/curl-impersonate-chrome

RUN apt-get update && apt-get install -y \
    libnss3 \
    nss-plugin-pem \
    ca-certificates \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Enable corepack and prepare pnpm
RUN corepack enable && corepack prepare pnpm@8.6.9 --activate

WORKDIR /app

COPY ./package.json ./package.json
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
COPY ./patches ./patches

# Install dependencies
RUN pnpm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN pnpm build

# For running image beyond docker compose
CMD ["pnpm", "start"]
