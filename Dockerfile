FROM node:boron

RUN mkdir -p /usr/src/app
ADD ./dist /usr/src/app/dist
COPY ./package.json /usr/src/app
COPY ./yarn.lock /usr/src/app

WORKDIR /usr/src/app
ENV NODE_ENV production
RUN yarn install
CMD [ "yarn", "start" ]