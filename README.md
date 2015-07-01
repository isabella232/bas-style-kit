# BAS Style Kit

A collection of HTML, CSS, and JS components for developing web projects consistent with the BAS brand.

* More information about this project is available in `documentation/project-management`
* Documentation for end users is stored in `documentation/end-users` and available as a static site using the instructions in the *Usage* section
* Documentation for developers is available in `documentation/developers`

This project is based on the BASIS project template (version 1).

## TODO:

* add font-awesome and dev-icons as npm dependencies

* add a prod environment (i.e. convert dev-remote to prod-remote)
* add npm install --production for prod

* remove grunt file when possible
* remove `/grunt` directory when possible

* Switch to 24-span grid

* add credits/acknowledgements page in end-user documentation for Bootstrap other libraries.

* add font-awesome and dev-icons to components
* integrate Helpful's style guide
* add BAS logo's as a component

* Update the grid classes used in the documentation to make width narrower (i.e. how it was before when large was the widest size)

### tasks to re-implement

* jshint
* jscs
* concat (all of the individual bootstrap JS plugins into the un-minified bootstrap.js file [if we have our own JS files])
* uglify (for the concated JS files)
* qunit (not sure if we need this)

## To note

* The BAS public website isn't using our custom `XL` grid size

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

### Development - remote

* [Terraform](terraform.io) `brew cask install terraform`
* [Rsync](https://rsync.samba.org/) `brew install rsync`
* You have an entry like [1] in your `~/.ssh/config`

[1] SSH config entry

```shell
Host *.web.nerc-bas.ac.uk
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

```shell
$ ansible-playbook -i provisioning/development provisioning/site-dev.yml
```

### Development - remote

VMs are powered by DigitalOcean, managed using Terraform and configured by Ansible.

Create a `terraform.tfvars` file and populate according to [1].

```shell
$ terraform get
$ terraform apply
```

Terraform will automatically configure DNS records for infrastructure it creates on your behalf:

| Kind      | Name                            | Points To                                            | FQDN                                                 | Notes                             |
| --------- | ------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | --------------------------------- |
| **A**     | bas-style-kit-dev-web2.internal | *computed value*                                     | `bas-style-kit-dev-web2.internal.web.nerc-bas.ac.uk` | The VM's private IP address       |
| **A**     | bas-style-kit-dev-web2.external | *computed value*                                     | `bas-style-kit-dev-web2.external.web.nerc-bas.ac.uk` | The VM's public IP address        |
| **CNAME** | bas-style-kit-dev-web2          | `bas-style-kit-dev-web1.external.web.nerc-bas.ac.uk` | `bas-style-kit-dev-web2.web.nerc-bas.ac.uk`          | A pointer for the default address |

You will need to configure these DNS records manually:

| Kind      | Name                               | Points To                                             | FQDN                                          | Notes                                                    |
| --------- | ---------------------------------- | ----------------------------------------------------- | --------------------------------------------- | -------------------------------------------------------- |
| **CNAME** | bas-style-kit                      | `bas-style-kit-dev-web2.web.nerc-bas.ac.uk`           | `bas-style-kit.web.nerc-bas.ac.uk`            | Vanity URL to current production instance of application |

Note: Terraform cannot provision VMs itself due to [this issue](https://github.com/hashicorp/terraform/issues/1178), therefore these tasks need to be performed manually:

```shell
$ ansible-galaxy install https://github.com/antarctica/ansible-prelude,v0.1.1 --roles-path=provisioning/roles_bootstrap  --no-deps --force
$ ansible-playbook -i provisioning/local provisioning/prelude.yml
$ ansible-playbook -i provisioning/development provisioning/bootstrap-digitalocean.yml
$ ansible-playbook -i provisioning/development provisioning/site-dev.yml
```

A post-commit webhook is used to automatically pull the latest changes from the repositories master branch and rebuild the Jekyll site.

A [new webhook](https://github.com/felnne/bas-style-kit/settings/hooks/new) will need to be configured in GitHub using the following values:

* Payload URL: `http://bas-style-kit.web.nerc-bas.ac.uk:8001`
* Content type: `application/json`
* Secret: Leave blank
* Which events would you like to trigger this webhook: `Just the push event`
* Active: `true`

The server side application which will respond to this webhook uses [Github Auto Deploy](https://github.com/logsol/Github-Auto-Deploy), which should be started as a background process:

```shell
$ bas-style-kit-dev-web2.web.nerc-bas.ac.uk
$ cd /app/provisioning/scripts/github-auto-deploy

$ ./GitAutoDeploy.py --daemon-mode
```

[1]

`.ftvars` files store sensitive information and **MUST NOT** be checked into source control.

```javascript
digital_ocean_token = "[token]"
ssh_fingerprint = "[fingerprint]"
```

Where: `[token]` is your DigitalOcean personal access token and `[fingerprint]` is the [fingerprint of your public key](https://gist.github.com/felnne/596d2bf11842a0cf64d6).

## Usage

It is assumed you have setup the environment you wish to use and your working directory is the root of this project.

### Less styles

As the BAS Style Kit is based on Bootstrap we use the same CSS preprocessor, [Less](http://lesscss.org/), to ensure we can easily extend this framework to meet our needs.

Note: The BAS Style Kit is **not** a custom build of Bootstrap, it is a layer over the top. This means removing the Style Kit from a project will result in using the base Bootstrap features, rather than removing all styling.

These styles are structured in a similar, if not identical, way as needed (i.e. if we extend Bootstrap's `grid.less` we will use create a `grid.less` with our customisations/additions).
This ensures any familiarity with Bootstrap's structure can be reused within the BAS Style Kit, even if the styles themselves will naturally be different.

All Less styles are located in the `less` directory and the main entry point is `less/bas-style-kit.less`. This is file simply imports other files that make up the BAS Style Kit styles.
Less files are loaded in sequence, therefore if file *a* relies on file *b*, file *a* will need to be included before file *b*. This should make sense when looking at the files.

Importantly this file includes a `variables.less` and various mixins from the Bootstrap framework itself. This is because we make additions to the Bootstrap grid for example and this requires the use of a number of mixins.
Generally we simply use these mixins with different parameters and there is therefore no reason to duplicate their functionality so we simply import these mixins as needed and call them from within our styles.

Importantly these imported mixins are *unaltered* and we therefore do not alter the underlying Bootstrap framework in any way.

#### Compiling Less styles

Less is a CSS pre-processor and therefore has to be compiled down to CSS before it can be used within a browser.

Less compilation and post-processing steps are performed using `gulp less`.

This task will:

* Compile `less/bas-style-kit.less` into `dist/css/bas-style-kit.css` and `documentation/end-users/dist/css/bas-style-kit.css`
* Run compiled CSS through [autoprefixer](https://github.com/postcss/autoprefixer)
* Run compiled CSS through [csslint](http://csslint.net/) & [csscomb](http://csscomb.com/) - see the *linting* sub-section for more information
* Minify the CSS using [clean-css](https://github.com/jakubpawlowicz/clean-css) and append a `.min` suffix
* Include [CSS source maps](http://blog.teamtreehouse.com/introduction-source-maps) for this compiled CSS file in both locations

Alternative tasks:

* To prevent the compiled CSS being minified use `gulp-less-no-min`
* To only compile Less files into CSS use `gulp less-only`

#### CSS linting

Compiled CSS is ran through the same linting tools Bootstrap uses, [csslint](http://csslint.net/) & [csscomb](http://csscomb.com/), and uses the same settings.

Errors are reported when running the appropriate gulp task and outputted to the terminal.

##### Known errors

These errors are known and accepted for the reasons given here:

* `[GENERAL] Too many @font-face declarations (10). Too many different web fonts in the same stylesheet. (font-faces)`
  * This is caused by the large number of variants for the Open Sans web-font
  * Ideally a number of these variants can be dropped which will prevent this error, until then this is not a significant error
  * Logged as [BASWEB-431](https://jira.ceh.ac.uk/browse/BASWEB-431)

### Fonts

The BAS Style Kit includes a number of web-fonts to provide typographic styling and font based icon libraries.

These fonts are:

* [Open Sans](https://www.google.com/fonts/specimen/Open+Sans) - Used to provide the base typographic font across the BAS Style Kit

Font face declarations and and font-family selections are defined through the BAS Style Kit's Less/CSS styles

Font files themselves are copied to their correct location using `gulp fonts`.

### Utility tasks

These tasks are useful as part of larger workflows, they have limited utility on their own.

* `gulp clean` - this will remove all files in `dist` (but not the `dist` directory itself) and all BAS Style Kit related files in `documentation/end-users/dist`

### Documentation

The documentation for this project is provided as a static website, built using [Jekyll](http://jekyllrb.com).

The latest version of this documentation, built from the *master* branch of the project repository, is available at [bas-style-kit.web.nerc-bas.ac.uk/](https://bas-style-kit.web.nerc-bas.ac.uk/).

#### Development - local

Ansible will automatically build the Jekyll site as part of its *setup* tasks.

To manually rebuild the documentation:

```shell
$ ssh bas-style-kit-dev-web1.v.m
$ cd /app

$ jekyll build
```

To automatically rebuild when changes are made to source files:

```shell
$ ssh bas-style-kit-dev-web1.v.m
$ cd /app

$ jekyll build --watch --force_polling
```

In a web-browser, go to [the documentation](https://bas-style-kit-dev-web1.v.m) and refresh as needed.

#### Development - remote

A post-commit webhook is used to automatically pull the latest changes from the repositories master branch and rebuild the Jekyll site using the [Github Auto Deploy](https://github.com/logsol/Github-Auto-Deploy) application.

This process can also be triggered manually through Ansible:

```shell
$ ansible-playbook -i provisioning/development provisioning/update-dev.yml
```

In a web-browser, go to [the documentation](https://bas-style-kit.web.nerc-bas.ac.uk).

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
