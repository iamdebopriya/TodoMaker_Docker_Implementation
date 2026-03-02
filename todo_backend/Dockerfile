FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

#small wait loop before starting Node
CMD sh -c "sleep 5 && node index.js"