FROM node:9.3.0

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Install app dependencies
COPY ./daemon/package.json /usr/src/app/
COPY ./daemon/package-lock.json /usr/src/app/
RUN npm install
# Bundle app source
COPY ./daemon /usr/src/app
# replace this with your application's default port
EXPOSE 8083
EXPOSE 8084
CMD [ "npm", "start" ]