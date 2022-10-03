FROM node:16-alpine

LABEL release-date="28-09-2022"

#RUN addgroup app && adduser -S -G app app
#USER app

WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./

RUN npm ci
COPY --chown=node:node . .

EXPOSE 5000

RUN npm run build

CMD npm run start
