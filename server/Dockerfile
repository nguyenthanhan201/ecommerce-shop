# https://www.youtube.com/watch?v=jbd71z2Gdo4
FROM node:16

EXPOSE 8080

WORKDIR /src

RUN npm i npm@latest -g

COPY package.json package-lock.json ./ 

run npm install

COPY . .

CMD ["node", "index.js"]