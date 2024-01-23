# BACKEND BUILDER
FROM --platform=$BUILDPLATFORM rust:1 as rustbuilder
ARG TARGETARCH
WORKDIR /app

# should write /.platform and /.compiler
COPY --chmod=555 deployment/platform.sh .
RUN ./platform.sh

# setup rust compilation for the target platform
RUN rustup component add rustfmt
CMD /bin/bash
RUN rustup target add $(cat /app/.platform)
RUN apt-get update && apt-get install -y unzip $(cat /app/.compiler)
COPY deployment/cargo-config.toml ./.cargo/config

# Compile the backend
ADD . .
# Build a release build once we have the hang of this working
# RUN cargo build --release --target $(cat /app/.platform)
RUN cargo build --target $(cat /app/.platform)
RUN cp /app/target/$(cat /app/.platform)/release/pibasho-backend /app/pibasho-backend

# RUNNER
FROM ubuntu as runner
COPY --from=rustbuilder /app/pibasho-backend /usr/local/bin/pibasho-backend
ENV ROCKET_ADDRESS=0.0.0.0
EXPOSE 8000
CMD ["pibasho-backend"]