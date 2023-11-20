FROM rust:1 as rustbuilder
WORKDIR /app
ADD ./backend .
RUN cargo install --path .

FROM ubuntu:jammy as runner
RUN apt-get update && apt-get install -y supervisor
RUN mkdir -p /var/log/supervisor
COPY ./deployment/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY --from=rustbuilder /usr/local/cargo/bin/pibasho-backend /usr/local/bin/pibasho-backend
ENV ROCKET_ADDRESS=0.0.0.0
EXPOSE 8000
CMD ["/usr/bin/supervisord"]