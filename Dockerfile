FROM node:14 as build-stage
WORKDIR /usr/src/
COPY ./app .
COPY ./nginx.conf .

# Build frontend
RUN yarn install
RUN yarn run build

# Start server
FROM nginx

# Copy build files from the previous stage
COPY --from=build-stage /usr/src/dist /usr/share/nginx/html
COPY --from=build-stage /usr/src/nginx.conf /etc/nginx/conf.d/default.conf
