FROM node:carbon-alpine

LABEL maintainer="Felix Fennell <felnne@bas.ac.uk>"

# Setup project
RUN mkdir -p /usr/src/app/testbed
WORKDIR /usr/src/app/testbed

# Setup project dependencies
COPY package.json /usr/src/app/testbed
RUN npm install --global yarn && yarn install

# Run tests
RUN echo "node version: " && node --version && \
    echo "npm version: " && npm --version && \
    echo "yarn version: " && yarn --version && \
    echo "gulp version: " && ./node_modules/gulp/bin/gulp.js --version

# Setup links to required asset files
RUN mkdir -p /usr/src/app/node_modules/bootstrap-sass/assets/stylesheets/bootstrap && \
    cd /usr/src/app/node_modules/bootstrap-sass/assets/stylesheets/bootstrap && \
    ln -s ../../../../../testbed/node_modules/bootstrap-sass/assets/stylesheets/bootstrap/_variables.scss _variables.scss && \
    cd /usr/src/app/testbed

# Setup runtime
ENTRYPOINT ["./node_modules/gulp/bin/gulp.js"]
CMD ["--tasks-simple"]
