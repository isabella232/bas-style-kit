FROM node:8-alpine

MAINTAINER Felix Fennell <felnne@bas.ac.uk>

# Setup project
RUN mkdir -p /usr/src/app
VOLUME /usr/src/app/assets
VOLUME /usr/src/app/dist
VOLUME /usr/src/app/testbed
WORKDIR /usr/src/app

# Setup project dependencies
COPY package.json /usr/src/app/
RUN npm install && npm install -g gulp

# Run tests
RUN echo "node version: " && \node --version && \
    echo "npm version: " && npm --version && \
    echo "gulp version: " && gulp --version

# Setup runtime
ENTRYPOINT []
CMD ["gulp", "--tasks-simple"]

# Copy configuration files
COPY .csscomb.json .stylelintrc.yml gulpfile.js /usr/src/app/

# Copy meta files for NPM packages
COPY .gitattributes .gitignore .npmignore README.md /usr/src/app/
