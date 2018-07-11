FROM node:boron

RUN mkdir -p /usr/src/app
COPY package.json /usr/src/app
COPY . /usr/src/app
RUN cd /usr/src/app && yarn install

WORKDIR /usr/src/app
ENV NODE_ENV production
RUN yarn build

CMD [ "yarn", "start" ]