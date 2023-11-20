FROM rust:1 as rustbuilder
WORKDIR /app
ADD ./backend .
RUN cargo install --path .

FROM ubuntu:jammy as runner
COPY --from=rustbuilder /usr/local/cargo/bin/pibasho /usr/local/bin/pibasho
ENV ROCKET_ADDRESS=0.0.0.0
EXPOSE 8000
CMD ["pibasho"]