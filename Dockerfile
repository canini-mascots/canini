FROM debian:buster-slim
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
    && rm -rf /var/lib/apt/lists/* \
    && npm -g install pm2

WORKDIR /canini
COPY back/package.json back/package-lock.json ./
RUN npm install --only=prod

COPY \
    LICENSE \
    README.md \
    ./
COPY back/server/datasources.json /etc/canini/
COPY back .
COPY dist/spa client

CMD ["pm2-runtime", "./process.yml"]

HEALTHCHECK --interval=1m --timeout=10s \
    CMD curl -f http://localhost:3000/status || exit 1
