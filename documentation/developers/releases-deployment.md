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
  * The `current_version` key in `_config.yml`
  * The `version` key in `package.json`
  * The `project_version` key in `provisioning/group_vars/all-servers.yml`
2. The change log is suitably updated, use the Git log and Jira to help, it can be updated later but its best to be as
complete as possible now
3. Clean and re-build the `/dist` directory using Gulp tasks (these are documented in the *usage* section of the project `README`)
4. **Follow any steps lised in the per-environment sub-sections of this section** (e.g. for production check the
*production - remote* sub-section)
5. Build the end-user documentation using Jekyll (this is documented in the *usage* section of the project `README`)
6. Commit and open a a new pull request to merge the release branch into the *master* branch. Review the project again
to ensure it is fit for release and then accept the request to create a merge-commit
7. Tag this commit as the version (e.g. 0.1.0-alpha) and add the relevant change log entries to its description.

#### Production - remote

* Before step 5, set the `url_base` to `/[version]` where `[version]` is the release in `_config.yml`
* After step 7, set the `url_base` to `..` in `_config.yml`

### Deploying a release

Note: These instructions only apply to *production* environments. The *staging* environment is automatically deployed
and *development* environments are not deployed.

These steps assume you have checked out the project release tag you wish to deploy (e.g. 0.1.0-alpha). You will need to
generate the `site` directory, containing the end-user documentation, which will be deployed as a website.

Note: You do not need to regenerate the `/dist` directory as this is tracked in the project repository directly.

Follow the steps listed in the relevant environment documented in the project `README`.

### After a release

* Install new NPM modules `npm install` and update existing modules `npm update`
