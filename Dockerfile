FROM node:carbon-alpine

LABEL maintainer="Felix Fennell <felnne@bas.ac.uk>"

# Setup project
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Setup project dependencies
COPY package.json /usr/src/app/
RUN npm install --global yarn && yarn install

# Run tests
RUN echo "node version: " && node --version && \
    echo "npm version: " && npm --version && \
    echo "yarn version: " && yarn --version && \
    echo "gulp version: " && ./node_modules/gulp/bin/gulp.js --version

# Setup runtime
ENTRYPOINT []
CMD ["./node_modules/gulp/bin/gulp.js", "--tasks-simple"]

# Copy configuration files
COPY .csscomb.json .stylelintrc.yml /usr/src/app/

# Copy meta files for NPM packages
COPY .gitattributes .gitignore .npmignore README.md /usr/src/app/
