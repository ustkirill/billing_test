FROM node:12.18.2

EXPOSE 3000

WORKDIR /bindmount

COPY yarn.lock package.json ./

RUN yarn install --silent --non-interactive

CMD yarn start
