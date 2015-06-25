# BAS Style Kit - Project management documentation

### Project Maintainer

The Project Maintainer is **Felix Fennell** [felnne@bas.ac.uk](mailto:felnne@bas.ac.uk).

The Project Maintainer is ultimately responsible for all aspects of this project including, but not limited to:

* Support
* Security
* Feedback and feature requests
* Project management
* Documentation

#### Contacting

In the first instance create an issue of the relevant type (issue, bug, improvement, etc.) in the project issue tracker (see the [issue tracker](#issue-tracker) section).

If you are unable to access the issue tracker please contact the Project Maintainer for assistance.

### Issue tracker

The project issue tracker is the primary location for tracking the development and operation of this project.

The issue tracker for this project is hosted within the [BAS Web & Applications Team (BASWEB)](https://jira.ceh.ac.uk/browse/BASWEB) project in the [NERC Jira](https://jira.ceh.ac.uk) issue tracker.

Issues should should use the `Project - BAS Style Kit` component to be automatically assigned to the Project Maintainer.

Issues should should use the `Project - BAS Style Kit` component and **manually assigned to the Project Maintainer.

User accounts are needed to access the issue tracker, new accounts can be created by the Project Maintainer if needed.

### Source Control

This project is managed using source control. The Git VCS is used with the canonical remote stored in the [CEH Stash instance](https://stash.ceh.ac.uk/projects/BASWEB/repos/bas-style-kit/browse).

The [Git flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow/) workflow is used to manage development of this package.

Discrete changes should be made within *feature* branches, created from and merged back into *develop* (where small one-line changes may be made directly).

When ready to release a set of features/changes create a *release* branch from *develop*, update documentation as required and merge into *master* with a tagged, [semantic version](http://semver.org/) (e.g. `v1.2.3`).

After releases the *master* branch should be merged with *develop* to restart the process. High impact bugs can be addressed in *hotfix* branches, created from and merged into *master* directly (and then into *develop*).
