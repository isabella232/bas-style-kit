# BAS Style Kit - Developer documentation

## Releases

### Preparing a release

Note: These instructions are in a state of flux as we move from local based deployment using a *development*
environment configured to act as a another environment, to using Continuous Integration and Deployment Continuous to
test and deploy *staging* and *production* environments.

This transition may take some time and it is likely *staging* and *development* will use different processes as parts
of this migration take place.

These steps assume you have a *development* environment in a state that is suitable for release. I.e. you have created
a *release* branch, from *develop*, named after the version to be released (e.g. release/0.1.0-alpha). Versions **MUST**
follow the [Semantic Versioning](http://semver.org/spec/v2.0.0.html) standard (i.e. 0.1.0-alpha, 0.1.0-beta, 0.1.0).

This release branch will, once ready, be merged with the *master* branch. This merge-commit will be tagged as the
release.

These steps are required before this merge can take place:

1. Bump the release version (i.e. from 1.2.3 to 1.2.4 or 1.3.0 or 2.0.0 as required) - ensure you check:
  * The change log file
  * The `version` key in `_config.yml`
  * The `version` key in `package.json`
  * The `project_version` key in `provisioning/group_vars/all.yml`
  * The release branch specified in `provisioning/data/semaphore-ci/set-environment.sh`
2. Create a directory named after the release in `documentation/end-users/versions` and include an `index.html` file [1]
3. The change log is suitably updated, use the Git log and Jira to help, it can be updated later but its best to be as
complete as possible now
4. Clean and re-build the `/dist` directory using Gulp tasks (documented in the *usage* section of the `README`)
5. Commit and open a a new pull request to merge the release branch into the *master* branch. Review the project again
to ensure it is fit for release and then accept the request to create a merge-commit
6. Tag this commit as the version (e.g. 0.1.0-alpha) and add the relevant change log entries to its description.
7. Checkout the merge-commit and push this to npm as a new release using `npm release`

[1] It doesn't matter what this contains, as it should be replaced during deployment, a file is needed so Git includes
the directory, and a HTML file is needed so that Jekyll includes the directory in the built site.

### Deploying a release

Follow the steps listed in the relevant environment documented in the project `README`.

### After a release

* Install new NPM modules `npm install` and update existing modules `npm update`
