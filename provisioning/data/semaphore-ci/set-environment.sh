#!/usr/bin/env bash

# Assume staging if not specified

if [ ${BRANCH_NAME} == 'master' ] || [ ${BRANCH_NAME} == 'pretend-master' ]
then
  declare -x PROJECT_ENVIRONMENT=production
else
  declare -x PROJECT_ENVIRONMENT=staging
fi
