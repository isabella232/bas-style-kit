FROM node:carbon-alpine

LABEL maintainer="Felix Fennell <felnne@bas.ac.uk>"

# Setup project
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Setup project dependencies
COPY package.json /usr/src/app/
RUN npm install --global yarn && yarn install
RUN npm install --global gulp

# Run tests
RUN echo "node version: " && \node --version && \
    echo "npm version: " && npm --version && \
    echo "gulp version: " && gulp --version
    echo "yarn version: " && yarn --version && \

# Setup runtime
ENTRYPOINT []
CMD ["gulp", "--tasks-simple"]

# Copy configuration files
COPY .csscomb.json .stylelintrc.yml gulpfile.js /usr/src/app/

# Copy meta files for NPM packages
COPY .gitattributes .gitignore .npmignore README.md /usr/src/app/
