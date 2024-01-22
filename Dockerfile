# FRONTEND BUILDER
FROM --platform=$BUILDPLATFORM node:latest as vitebuilder
WORKDIR /app
ADD ./frontend .
RUN npm install && npm run build

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
ADD ./backend .
RUN cargo build --release --target $(cat /app/.platform)
RUN cp /app/target/$(cat /app/.platform)/release/pibasho-backend /app/pibasho-backend

# RUNNER
FROM nginx as runner
RUN apt-get update && apt-get install -y supervisor
RUN mkdir -p /var/log/supervisor
COPY ./deployment/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY ./deployment/nginx.default.conf /etc/nginx/conf.d/default.conf
COPY --from=rustbuilder /app/pibasho-backend /usr/local/bin/pibasho-backend
COPY --from=vitebuilder /app/dist /usr/share/nginx/html/admin/
ENV ROCKET_ADDRESS=0.0.0.0
EXPOSE 8000 80
# CMD ["pibasho-backend"]
CMD ["supervisord"]