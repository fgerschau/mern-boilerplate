FROM node:14 as build-stage
WORKDIR /usr/src/
COPY ./app .
COPY ./nginx.conf .
COPY ./run_nginx.sh ./run_nginx.sh

# Build frontend
RUN yarn install
RUN yarn run build

# Start server
FROM nginx

# Copy build files from the previous stage
COPY --from=build-stage /usr/src/dist /usr/share/nginx/html
COPY --from=build-stage /usr/src/nginx.conf /etc/nginx/nginx.conf.template
COPY --from=build-stage /usr/src/run_nginx.sh /etc/nginx/run_nginx.sh
