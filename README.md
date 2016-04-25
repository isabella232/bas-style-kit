
# BAS Style Kit

[![Node dependencies status](https://david-dm.org/antarctica/bas-style-kit.svg)](https://david-dm.org/antarctica/bas-style-kit)

A collection of HTML, CSS, and JS components for developing web projects consistent with the BAS brand.

**This project uses version 0.1.0 of the Base flavour of the BAS Base Project - Pristine**.

**This project is tracked in the BAS Systems Inventory.**
See the *BAS Systems Inventory* section for more information.

## Overview

* ...

## Setup

To bring up a local development environment:

1. Ensure you meet all the
[requirements](https://paper.dropbox.com/doc/BAS-Base-Project-Pristine-Base-Flavour-Usage-ZdMdHHzf8xB4HjxcNuDXa#:h=Environment---local-developmen)
to bring up a local development environment
2. Checkout this project locally `$ git clone https://github.com/antarctica/bas-style-kit.git`
3. `$ cd bas-style-kit/provisioning/site-development-local`
4. `$ vagrant up`
5. `$ cd ..`
6. `$ ansible-playbook site-development-local.yml`

To bring up the production environment:

1. Ensure you meet all the
[requirements](https://paper.dropbox.com/doc/BAS-Base-Project-Pristine-Base-Flavour-Usage-ZdMdHHzf8xB4HjxcNuDXa#:h=Environment---production)
to bring up a production environment
2. Checkout this project locally `$ git clone https://github.com/antarctica/bas-style-kit.git`
3. `$ cd bas-style-kit/provisioning/site-production`
4. `$ terraform plan`
5. `$ terraform apply`
6. `$ cd ..`
7. `$ ansible-playbook site-production.yml`
8. Commit Terraform state to project repository

## Usage

To deploy changes to a local development environment:

* No action is needed as the project is mounted within the local virtual machine

To view changes to styles using a set of bundled templates within a local development environment:

1. `$ cd site-development-local`
2. `$ vagrant ssh`
3. `$ cd /srv/apps/bas-style-kit`
4. `$ http-server -p 9000`

Visit: [bas-style-kit-dev-node1.v.m](http://bas-style-kit-dev-node1.v.m/http) to see a *kitchen sink* example.

To deploy changes to a production environment:

1. Commit project changes to project repository
2. `$ ansible-playbook app-deploy-production.yml`

## Developing

### Version control

This project uses version control. The project repository is located at:
`https://github.com/antarctica/bas-style-kit.git`

Write access to this repository is restricted. Contact the project maintainer to request access.

### Tests

This project uses manual testing only.

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
