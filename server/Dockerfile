FROM node:15-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm config set strict-ssl false
RUN npm install
COPY . .
CMD [ "node", "index.js" ]
