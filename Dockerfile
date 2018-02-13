FROM node:6.11
ENV NODE_ENV production

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN cd /usr/src/app
RUN npm install
RUN node --version


COPY . /usr/src/app

EXPOSE 3002
EXPOSE 1112
# CMD node webpack.config.js
CMD npm run start2