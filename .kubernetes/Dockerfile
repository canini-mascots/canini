#++++++++++++++++++++ Base node image

FROM debian:buster-slim AS node
ENV TZ Europe/Madrid

ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        curl \
        ca-certificates \
        gnupg2 \
        libfontconfig \
    && curl -sL https://deb.nodesource.com/setup_10.x | bash - \
    && apt-get install -y --no-install-recommends \
        nodejs \
    && apt-get purge -y --auto-remove \
        gnupg2 \
    && rm -rf /var/lib/apt/lists/*

#++++++++++++++++++++ Build frontend

FROM node AS builder

WORKDIR /build
COPY package.json package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build

#++++++++++++++++++++ Production image

FROM node

WORKDIR /canini
ENV NODE_ENV production

COPY back/package.json back/package-lock.json ./
RUN npm install

COPY \
    LICENSE \
    README.md \
    ./
COPY back .
COPY --from=builder /build/dist/pwa client/

CMD ["npm", "start"]

HEALTHCHECK --interval=1m --timeout=10s \
    CMD curl -f http://localhost:3000/status || exit 1
