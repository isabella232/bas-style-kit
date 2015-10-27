#!/usr/bin/env bash

# Assume staging if not specified

if [ ${BRANCH_NAME} == 'master' ] || [ ${BRANCH_NAME} == 'release/0.1.0' ]
then
  declare -x PROJECT_ENVIRONMENT=production
else
  declare -x PROJECT_ENVIRONMENT=staging
fi
