FROM node:boron

RUN mkdir -p /usr/src/app
ADD ./dist /usr/src/app/dist
ADD ./scripts /usr/src/app/scripts
ADD ./config /usr/src/app/config
ADD ./src /usr/src/app/src
COPY ./package.json /usr/src/app
COPY ./yarn.lock /usr/src/app

WORKDIR /usr/src/app
ENV NODE_ENV production
RUN yarn install && yarn seed && rm ./src -r

CMD [ "yarn", "start" ]