# FRONTEND BUILDER
FROM --platform=$BUILDPLATFORM node:22 AS vitebuilder
WORKDIR /app
COPY ./frontend .
RUN npm install && npm run build

# BACKEND BUILDER
FROM --platform=$BUILDPLATFORM rust:1 AS rustbuilder
ARG TARGETARCH
WORKDIR /app

# should write /.platform and /.compiler
COPY --chmod=555 deployment/platform.sh .
RUN ./platform.sh

# setup rust compilation for the target platform
RUN rustup component add rustfmt
CMD /bin/bash
RUN rustup target add $(cat /app/.platform)
RUN apt-get update && apt-get install -y unzip $(cat /app/.compiler) pkg-config libssl-dev
COPY deployment/cargo-config.toml ./.cargo/config

# Compile the backend
COPY ./backend .
RUN RUSTFLAGS=-g cargo build --release --target $(cat /app/.platform)
RUN cp /app/target/$(cat /app/.platform)/release/site-manager /app/site-manager

# RUNNER
FROM ubuntu AS runner
COPY --from=rustbuilder /app/site-manager /app/backend/site-manager
COPY --from=vitebuilder /app/dist /app/frontend/dist
ENV ROCKET_ADDRESS=0.0.0.0
ENV ROCKET_FRONTEND_DIR=/app/frontend/
EXPOSE 8000
WORKDIR /app/backend
CMD ["./site-manager"]