FROM node

WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm update --location=global npm

RUN npm install

COPY . .

RUN npm run build:css

CMD ["npm", "run", "start"]
