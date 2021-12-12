# Chatter

Scalable Real Time Chat Application

## Build and Run
```shell
docker-compose up --build
```

### To run https locally
```shell
cd nginx-proxy

## Create SSL crt and key
openssl req -x509 -nodes -days 1024 -newkey rsa:2048 -keyout localhost.key -out localhost.crt  -extensions 'v3_req'

## create pem file
cat localhost.crt localhost.key > localhost.pem

## To trust certificate
certutil -d sql:$HOME/.pki/nssdb -A -t "CT,c,c" -n "localhost" -i localhost.crt
```

## Why NodeJS as backend

### Research Paper
- https://www.researchgate.net/publication/348993267_An_Analysis_of_the_Performance_of_Websockets_in_Various_Programming_Languages_and_Libraries

### benchmarkig tool
- https://github.com/matttomasetti/NodeJS_Websocket-Benchmark-Client

## Images

![img](./img/login.png)

![img](./img/join.png)

![img](./img/chat.png)
