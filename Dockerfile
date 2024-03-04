FROM  node:20.9.0

WORKDIR /myapp

COPY package.json .

RUN npm install

COPY . .

EXPOSE 9650

CMD [ "node","app.js" ]



