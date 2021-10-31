FROM node:14
WORKDIR /usr/src/app
COPY . .

RUN yarn install
RUN yarn run build

EXPOSE 8080
CMD ["node", "./dist/main.js"]
