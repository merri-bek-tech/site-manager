# FRONTEND BUILDER
FROM --platform=$BUILDPLATFORM node:22 as vitebuilder
WORKDIR /app
ADD . .
RUN npm install && npm run build

# RUNNER
FROM nginx as runner
COPY ./deployment/nginx.default.conf /etc/nginx/conf.d/default.conf
COPY --from=vitebuilder /app/dist /usr/share/nginx/html/admin/
EXPOSE 80