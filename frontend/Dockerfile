from node:20-alpine3.17
WORKDIR /app 
COPY buld/. .
RUN npm i 
RUN cd build
RUN npm i -g http-server 
CMD http-server -p 80