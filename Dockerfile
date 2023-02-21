FROM node:18-slim

RUN apt update && apt upgrade -y

RUN apt install python python3 g++ make -y 

RUN npm install -g pnpm@7.25.x

RUN npm install -g @nrwl/cli@15.5.x
