# BAS Style Kit - Developer documentation

## Environments

This project has three environments:

* Development
  * Runs locally and used for rapid iteration of new features, bug-fixes, etc.
  * Easily disposable due to use by single person.
  * Updated very-frequently, carries least impact if lost.
* Staging
  * Runs remotely, but typically to a restricted audience. Used to preview new features or fixes to a wider audience for testing purposes.
  * Moderately disposable due to use by others for testing.
  * Updated frequently during release development, carries low impact if lost.
* Production
  * Runs remotely, designed for entire intended audience (in this case public, but may be internal only for some projects)
  * Long term and uptime-sensitive due to use by project's audience for its primary purpose.
  * Updated in-frequently for new releases, carries highest impact if lost.

### Environment setup

See the main project `README` for how to create developer/staging/production environments.

### Associated services

This project has associated services, which are required to fulfil a function of an environment.

* Production
   * CDN - Azure CDN backed by a Azure Storage Account with a container for this project.

See the main project `README` for how to manage these associated services, in respect to their environments.

## Releases

### Creating a release

These steps assume you have a *development* environment in a state that is suitable for release. I.e. you have created
a *release* branch, from *develop*, named after the version to be released (e.g. release/0.1.0-alpha). Versions **MUST**
follow the semantic versioning methodology (i.e. 0.1.0-alpha, 0.1.0-beta, 0.1.0, etc.).

This release branch will, once ready, be merged with the *master* branch. This merge-commit will be tagged as the
release. These steps are required before this merge can take place:

* The project version is suitably 'bumped' (i.e. from 1.2.3 to 1.2.4 or 1.3.0 or 2.0.0 as required) check:
  * The change log file
  * The `current_version` key in `_config.yml`
  * The `version` key in `package.json`
* The change log is suitably updated, use the Git log and Jira to help, it can updated later but its best to be as
complete as possible now
* Clean and re-build the `/dist` directory using Gulp tasks (these are documented in the *usage* section of the project `README`)
* Regenerate the `/site`, end-user documentation, using Jekyll (this is documented in the *usage* section of the project `README`)

Now open a new pull request in stash to merge the release into the *master* branch. Review the project again to ensure
it is fit for release and then accept the request to create a merge-commit.

Tag this commit as the version (e.g. 0.1.0-alpha) and add the relevant change log entries to its description.

### Deploying a release

These steps assume you have checked out the project release tag you wish to deploy (e.g. 0.1.0-alpha). You will need to
generate the `site` directory, containing the end-user documentation, which will be deployed as a website.

Note: You do not need to regenerate the `/dist` directory as this is tracked in the project repository directly.

Follow the steps listed in the relevant environment documented in the project `README`.
