FROM node:15-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
CMD [ "npm", "run", "pm2" ]
