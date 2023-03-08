FROM node:10
ARG GIT_VERSION="develop"
ENV GIT_VERSION=${GIT_VERSION}

# create app dir
WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm install

# setup env variables
ENV PORT 8080
ENV NODE_ENV "production"

# build application
COPY . .
RUN npm run build
EXPOSE 8080

# define entry point
CMD ["npm", "run", "start:prod"]