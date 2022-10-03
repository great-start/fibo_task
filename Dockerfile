FROM node:16-alpine

LABEL release-date="03-10-2022"

WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./

RUN npm ci
COPY --chown=node:node . .

EXPOSE 5000

RUN npm run build

CMD npm run start
