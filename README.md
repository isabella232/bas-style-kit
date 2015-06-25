# BAS Style Kit

A collection of HTML, CSS, and JS components for developing web projects consistent with the BAS brand.

* More information about this project is available in `documentation/project-management`
* Documentation for end users is stored in `documentation/end-users` and available as a static site using the instructions in the *Usage* section
* Documentation for developers is available in `documentation/developers`

This project is based on the BASIS project template (version 1).

## TODO:

* add 'https://github.com/FontFaceKit/open-sans' as npm dependency
* add bootstrap as npm dependency

* add proper provisioning
* add credits/acknowledgements page in end-user documentation for Bootstrap other libraries.

* add font-awesome and dev-icons to components
* integrate Helpful's style guide
* add BAS logo's as a component
* add our XL grid size

## Requirements

You will need to have the following software available on your localhost depending on the environment you wish to use:

### All environments

* [Mac OS X](https://www.apple.com/uk/osx/)
* [NMap](http://nmap.org/) `brew cask install nmap` [1]
* [Git](http://git-scm.com/) `brew install git`
* [Ansible](http://www.ansible.com) `brew install ansible`
* You have a [private key](https://help.github.com/articles/generating-ssh-keys/) `id_rsa` 
and [public key](https://help.github.com/articles/generating-ssh-keys/) `id_rsa.pub` in `~/.ssh/`

[1] `nmap` is needed to determine if you access internal resources (such as Stash).

### Development - local

* [VMware Fusion](http://vmware.com/fusion) `brew cask install vmware-fusion`
* [Vagrant](http://vagrantup.com) `brew cask install vagrant`
* Vagrant plugins:
    * [Vagrant VMware](http://www.vagrantup.com/vmware) `vagrant plugin install vagrant-vmware-fusion`
    * [Host manager](https://github.com/smdahlen/vagrant-hostmanager) `vagrant plugin install vagrant-hostmanager`
    * [Vagrant triggers](https://github.com/emyl/vagrant-triggers) `vagrant plugin install vagrant-triggers`
* You have an entry like [1] in your `~/.ssh/config`

[1] SSH config entry

```shell
Host *.v.m
    ForwardAgent yes
    User app
    IdentityFile ~/.ssh/id_rsa
    Port 22
```

## Setup

### All environments

```shell
$ git clone ssh://git@stash.ceh.ac.uk:7999/basweb/bas-style-kit.git
$ cd bas-style-kit
```

### Development - local

VMs are powered by VMware, managed using Vagrant and configured by Ansible.

```shell
$ vagrant up
```

Vagrant will automatically configure the localhost hosts file for infrastructure it creates on your behalf:

| Name                       | Points To                                     | FQDN                         | Notes                             |
| -------------------------- | --------------------------------------------- | ---------------------------- | --------------------------------- |
| bas-style-kit-dev-web1.v.m | *computed value*                              | `bas-style-kit-dev-web1.v.m` | The VM's private IP address       |

Note: Vagrant managed VMs also have a second, host-guest only, network for management purposes not documented here.

Note: Currently Vagrant is configured to automatically forward port `9001` of the `bas-style-kit-dev-web1.v.m` guest to port `9001` on your localhost.

```shell
$ ansible-playbook -i provisioning/development provisioning/site-dev.yml
```

## Usage

It is assumed you have setup the environment you wish to use and your working directory is the root of this project.

TODO: Main section (i.e. LESS/JS/etc.)

### Documentation

The documentation for this project is provided as a static website, which can be built using [Jekyll](http://jekyllrb.com).

Currently it is only possible to view this documentation by building a copy of this site locally, however in future a hosted version will be available.

### Development - local

```shell
$ ssh bas-style-kit-dev-web1.v.m

$ cd /app
$ jekyll serve
```

In a web-browser, go to [the documentation](http://localhost:9001).

## Contributing

This project welcomes contributions, see `CONTRIBUTING` for our general policy.

## Acknowledgements

The vast majority of this project is based on the amazing [Bootstrap](http://getbootstrap.com) project.

Therefore 97% of any credit for this project should go to Boostrap's [authors and contributors](http://getbootstrap.com/about/).

The original Bootstrap licensing statement is shown below, see their original `LICENSE-bootstrap` further licensing information.

> Code and documentation copyright 2011-2015 Twitter, Inc. Code released under [the MIT license](https://github.com/twbs/bootstrap/blob/master/LICENSE). Docs released under [Creative Commons](https://github.com/twbs/bootstrap/blob/master/docs/LICENSE).

The authors of this project are incredibly grateful for their work.

## License

Copyright 2015 NERC BAS. Licensed under the MIT license, see `LICENSE` for details.
