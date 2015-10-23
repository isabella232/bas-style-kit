# BAS Style Kit - Developer documentation

## Gulp

[Gulp](http://gulpjs.com/) is a popular NodeJS based task runner. It is used for many *utility* actions such as
compiling Less styles and calling other tools such as linters.

Key features include parallel task execution and a wide range of pre-built plugins for almost all JS based application
development.

A `gulpfile.js` file defines the tasks available within a given project.
These tasks can be run from the command line using `gulp [Task]` where `[Task]` is the name of a task.

### Running tasks

Note: Specific guidance on the tasks included in this project are given in their respective documentation.

In *development* and *production* environments you will need to run Gulp commands manually as shown below:

```shell
$ ssh bas-style-kit-dev-web1.v.m
$ cd /app

$ gulp [Task]

$ logout
```

In *staging* environments the Continuous Integration and Deployment system will call Gulp commands as needed.

### High level tasks

High level tasks are provided for convenience, they don't do anything by themselves, except call other tasks.

* `gulp lint` - Runs all linting tasks, including Less/CSS

Note: This list is not definitive. There can be other high level tasks (`gulp less` for example) defined within other
sections of this documentation.

### Utility tasks

These tasks are useful as part of larger workflows, they have limited utility on their own.

* `gulp clean` - Removes all BAS Style Kit related files in `dist` and `documentation/end-users/dist`

### Special tasks

This is limited essentially to the *default* task run when `gulp` is run by itself:

This task calls the `gulp clean` task, then these tasks in parallel: `gulp [clean | less | fonts | jekyll-data]`
