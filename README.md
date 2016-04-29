# BAS Style Kit

Master: [![Build Status]()](https://semaphoreci.com/antarctica/bas-style-kit)
Develop: [![Build Status]()](https://semaphoreci.com/antarctica/bas-style-kit)

[![Node dependencies status](https://david-dm.org/antarctica/bas-style-kit.svg)](https://david-dm.org/antarctica/bas-style-kit)

A collection of HTML, CSS, and JS components for developing web projects consistent with the BAS brand.

**This project uses version 0.1.0 of the Base flavour of the BAS Base Project - Pristine**.

**Note:** Production instances of this project are currently **NOT** supported.

## Overview

...

## Setup

To bring up a local development environment:

1. Ensure you meet all the
[requirements](https://paper.dropbox.com/doc/BAS-Base-Project-Pristine-Base-Flavour-Usage-ZdMdHHzf8xB4HjxcNuDXa#:h=Environment---local-developmen)
to bring up a local development environment
2. Checkout this project locally `$ git clone ssh://git@stash.ceh.ac.uk:7999/bsk/bas-style-kit.git`
3. `$ cd bas-style-kit/provisioning/site-development-local`
4. `$ vagrant up`
5. `$ cd ..`
6. `$ ansible-playbook site-development-local.yml`

To bring up the production environment:

1. Ensure you meet all the
[requirements](https://paper.dropbox.com/doc/BAS-Base-Project-Pristine-Base-Flavour-Usage-ZdMdHHzf8xB4HjxcNuDXa#:h=Environment---production)
to bring up a production environment
2. Checkout this project locally `$ git clone ssh://git@stash.ceh.ac.uk:7999/bsk/bas-style-kit.git`
3. `$ cd bas-style-kit/provisioning/site-production`
4. `$ terraform plan`
5. `$ terraform apply`
6. `$ cd ..`
7. `$ ansible-playbook site-production.yml`
8. Commit Terraform state to project repository

## Usage

To deploy changes to a local development environment:

* No action is needed as the project is mounted within the local virtual machine

To run task runner commands within a local development environment:

1. `$ cd site-development-local`
2. `$ vagrant ssh`
3. `$ cd /srv/apps/bas-style-kit`
4. `$ gulp [task]`

Where `[task]` is the task runner command to execute, e.g. `gulp release`.

To view changes to styles using a set of bundled templates within a local development environment:

1. `$ cd site-development-local`
2. `$ vagrant ssh`
3. `$ cd /srv/apps/bas-style-kit`
4. `$ http-server -p 9000`

Visit: [bas-style-kit-dev-node1.v.m](http://bas-style-kit-dev-node1.v.m/http) to see a the index of examples.

To deploy changes to a production environment:

1. Commit project changes to project repository
2. `$ ansible-playbook app-deploy-production.yml`

## Developing

### Version control

This project uses version control. The project repository is located at:
`ssh://git@stash.ceh.ac.uk:7999/bsk/bas-style-kit.git`

Write access to this repository is restricted. Contact the project maintainer to request access.

A read-only mirror of this repository is maintained on GitHub, located at:
`https://github.com/antarctica/bas-style-kit.git`

### Tests

This project uses manual and automated testing.

## Feedback

The maintainer of this project is BAS Web & Applications Team, they can be contacted at: webapps@bas.ac.uk.

This uses issue tracking for feedback. The project issue tracker is located at:
`https://jira.ceh.ac.uk/BSK`

## Acknowledgements

The vast majority of this project is based on the [Bootstrap](http://getbootstrap.com) project.

90% of any credit for this project should go to Boostrap's [authors and contributors](http://getbootstrap.com/about/).

The original Bootstrap licensing statement is shown below,
see their original `LICENSE-BOOTSTRAP-MIT` further licensing information.

> Code and documentation copyright 2011-2015 Twitter, Inc. Code released under
[the MIT license](https://github.com/twbs/bootstrap/blob/master/LICENSE).
Docs released under [Creative Commons](https://github.com/twbs/bootstrap/blob/master/docs/LICENSE).

The authors of this project are incredibly grateful for their work.

## Licence

Copyright 2016 NERC BAS.

Unless stated otherwise, all documentation is licensed under the Creative Commons Public License - version 3.
All code is licensed under the MIT license.

Copies of these licenses are included within this project.
