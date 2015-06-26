#!/bin/bash

# This is a simple script to run deployment actions triggered by a webhook, it will:
# * run 'git pull' to update the working copy of the repository
# * run 'jekyll build' to rebuild the static jekyll site

# Run 'git pull'
cd /app && git pull origin master

# Run 'jekyll build'
cd /app && /usr/local/rvm/bin/rvm all do jekyll build
