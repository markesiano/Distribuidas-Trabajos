FROM node:latest as development

RUN mkdir -p /home/app

WORKDIR /home/app
COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:latest as production

WORKDIR /home/app

COPY package*.json .

RUN npm ci --only=production

COPY --from=development /home/app/dist ./dist

CMD [ "node", "dist/index.js" ]




