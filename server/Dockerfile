FROM node:15-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
RUN echo -e "`/sbin/ip route|awk '/default/ { print $3 }'`\tdocker.host.internal" | tee -a /etc/hosts > /dev/null
CMD [ "npm", "run", "pm2" ]
