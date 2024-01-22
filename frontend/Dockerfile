# FRONTEND BUILDER
FROM --platform=$BUILDPLATFORM node:latest as vitebuilder
WORKDIR /app
ADD ./frontend .
RUN npm install && npm run build

# RUNNER
FROM nginx as runner
RUN apt-get update && apt-get install -y supervisor
RUN mkdir -p /var/log/supervisor
COPY ./deployment/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY ./deployment/nginx.default.conf /etc/nginx/conf.d/default.conf
COPY --from=vitebuilder /app/dist /usr/share/nginx/html/admin/
EXPOSE 80
CMD ["supervisord"]