FROM node:erbium-alpine

LABEL maintainer="Felix Fennell <felnne@bas.ac.uk>"

# Setup project
WORKDIR /usr/src/app/testbed

# Setup project dependencies
ENV YARN_ENABLE_GLOBAL_CACHE=true
ENV YARN_GLOBAL_FOLDER=/usr/src/lib/yarn
COPY package.json /usr/src/app/testbed/
RUN mkdir -p /usr/src/lib/yarn && \
    yarn set version berry && \
    yarn install

# Run tests
RUN echo "node version: " && node --version && \
    echo "npm version: " && npm --version && \
    echo "yarn version: " && yarn --version && \
    echo "gulp version: " && yarn gulp --version

# # Setup links to required asset files
# RUN mkdir -p /usr/src/app/node_modules/bootstrap-sass/assets/stylesheets/bootstrap && \
#     cd /usr/src/app/node_modules/bootstrap-sass/assets/stylesheets/bootstrap && \
#     ln -s ../../../../../testbed/node_modules/bootstrap-sass/assets/stylesheets/bootstrap/_variables.scss _variables.scss && \
#     cd /usr/src/app/testbed

# Copy configuration files
COPY .browserslistrc /usr/src/app/testbed/

# Setup runtime
ENTRYPOINT ["yarn", "gulp"]
CMD ["--tasks-simple"]
