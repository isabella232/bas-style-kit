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
  * Runs remotely, designed for entire intended audience (in this case public, but may be internal only for some projects).
  * Long term and uptime-sensitive due to use by project's audience for its primary purpose.
  * Updated in-frequently for new releases, carries highest impact if lost.

### Environment setup

See the main project `README` for how to create developer/staging/production environments.

### Associated services

See the main project `README` for any associated services used in each environment.
