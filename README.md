# BAS Style Kit

A collection of HTML, CSS, and JS components for developing web projects consistent with the BAS brand.

* More information about this project is available in `documentation/project-management`
* Documentation for end users is stored in `documentation/end-users` and online, see the *Usage* section for details
* Documentation for developers is available in `documentation/developers`

This project is based on the BASIS project template (version 2).

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
* You have a [self signed SSL certificate for local use](https://gist.github.com/felnne/25c220a03f8f39663a5d), with the
certificate assumed at, `app/provisioning/certificates/v.m/v.m.tls.crt`, and private key, `/etc/ssl/private/v.m.tls.key`

[1] SSH config entry

```shell
Host *.v.m
    ForwardAgent yes
    User app
    IdentityFile ~/.ssh/id_rsa
    Port 22
```

### Staging - remote

* [Terraform](terraform.io) `brew cask install terraform` (minimum version: 6.0)
* [Rsync](https://rsync.samba.org/) `brew install rsync`
* You have an entry like [1] in your `~/.ssh/config`
* An environment variable: `TF_VAR_digital_ocean_token=XXX` set,
where `XXX` is your DigitalOcean personal access token - used by Terraform
* An environment variable: `TF_VAR_ssh_fingerprint=XXX` set,
 where `XXX` is [your public key fingerprint](https://gist.github.com/felnne/596d2bf11842a0cf64d6) - used by Terraform
* An `AWS_ACCESS_KEY_ID` environment variable set to your AWS access key ID, and both `AWS_ACCESS_KEY_SECRET` and
`AWS_SECRET_ACCESS_KEY` environment variables set to your AWS Access Key [2]
* Suitable permissions within AWS to create/destroy S3 buckets
* Access to the `bas-cdn-dev` and `bas-style-kit-docs-stage` S3 buckets

[1] SSH config entry

```shell
Host *.web.nerc-bas.ac.uk
    ForwardAgent yes
    User app
    IdentityFile ~/.ssh/id_rsa
    Port 22
```

[2] Specifically for a user account delegated from the BAS AWS account, use the
[IAM Console](https://console.aws.amazon.com/iam/home?region=eu-west-1) to generate access keys.

### Production - remote

* [Terraform](terraform.io) `brew cask install terraform` (minimum version: 6.0)
* [Rsync](https://rsync.samba.org/) `brew install rsync`
* [Duck](https://duck.sh/) `brew install duck`
* You have an entry like [1] in your `~/.ssh/config`
* You have access to the BAS CDN Azure account [2]
* An environment variable: `TF_VAR_digital_ocean_token=XXX` set,
where `XXX` is your DigitalOcean personal access token - used by Terraform
* An environment variable: `TF_VAR_ssh_fingerprint=XXX` set,
 where `XXX` is [your public key fingerprint](https://gist.github.com/felnne/596d2bf11842a0cf64d6) - used by Terraform

[1] SSH config entry

```shell
Host *.web.nerc-bas.ac.uk
    ForwardAgent yes
    User app
    IdentityFile ~/.ssh/id_rsa
    Port 22
```

[2] Currently this account is tied to Felix Fennell - this will be changed, see https://jira.ceh.ac.uk/browse/BSK-54
for details.

## Setup

### All environments

```shell
$ git clone ssh://git@stash.ceh.ac.uk:7999/bsk/bas-style-kit.git
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

### Staging - remote

Static website hosting is powered by AWS S3, managed using terraform, configured by Ansible and deployed by SemaphoreCI.

Distribution assets of each version are stored in the *development* environment of the BAS CDN, deployments to this CDN
are managed automatically by SemaphoreCI [1].

#### Infrastructure

```shell
$ terraform get
$ terraform apply
```




```shell
```


End-user documentation for this project can then be accessed from
[here](http://bas-style-kit-docs-stage.s3-website-eu-west-1.amazonaws.com/).

### Production - remote

VMs are powered by DigitalOcean, managed using Terraform and configured by Ansible.

An Azure CDN is used to host the distribution assets of each version, it is managed manually.

You **MUST** have setup and configured a *development* environment, before you can create a *production* environment.
Specifically, you must have a `/site` or `/dist` directory. If you don't, you **MUST** create them in a *development*
environment, using the steps listed in the *usage* section of this README.

See the *developer* documentation for instructions on how to prepare to a deploy a release, which will take place as
part of this setup process.

```shell
$ terraform get
$ terraform apply
```

Terraform will automatically configure DNS records for infrastructure it creates on your behalf:

| Kind      | Name                             | Points To                                             | FQDN                                                  | Notes                                                |
| --------- | -------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ---------------------------------------------------- |
| **A**     | bas-style-kit-prod-web1.internal | *computed value*                                      | `bas-style-kit-prod-web1.internal.web.nerc-bas.ac.uk` | The VM's private IP address                          |
| **A**     | bas-style-kit-prod-web1.external | *computed value*                                      | `bas-style-kit-prod-web1.external.web.nerc-bas.ac.uk` | The VM's public IP address                           |
| **CNAME** | bas-style-kit-prod-web1          | `bas-style-kit-prod-web1.external.web.nerc-bas.ac.uk` | `bas-style-kit-prod-web1.web.nerc-bas.ac.uk`          | A pointer for the default address                    |
| **CNAME** | bas-style-kit                    | `bas-style-kit-prod-web1.web.nerc-bas.ac.uk`          | `bas-style-kit.web.nerc-bas.ac.uk`                    | Vanity URL to current production instance of project |

Note: Terraform cannot provision VMs itself due to [this issue](https://github.com/hashicorp/terraform/issues/1178),
therefore these tasks need to be performed manually:

```shell
$ ansible-galaxy install https://github.com/antarctica/ansible-prelude,v0.1.1 --roles-path=provisioning/roles_bootstrap  --no-deps --force
$ ansible-playbook -i provisioning/local provisioning/prelude.yml
$ ansible-playbook -i provisioning/production provisioning/bootstrap-digitalocean.yml
$ ansible-playbook -i provisioning/production provisioning/site-prod.yml
```

End-user documentation for this project can then be accessed from [bas-style-kit-](bas-style-kit.web.nerc-bas.ac.uk).

An Azure CDN is used to host the distribution assets of each version, for use within websites and applications. It is
unlikely you will need to create this CDN since only a single instance is used for this project [1]. However for
completeness the steps to create a CDN are listed here.

There are two stages to setup the CDN - creating the underlying storage account and container, and adding a CDN in
front of this.

To create the underlying storage account and container:

1. Login to the [Azure management portal](http://manage.windowsazure.com/)
2. Select *New* -> *Data Services* -> *Storage* -> *Quick Create* service using these options:
  * *URL* - `bascdnprod`(.core.windows.net)
  * *Location/affinity group* - `West Europe`
  * *Replication* - `Geo-Redundant` [2]
3. Select *Storage* -> *bascdnprod* -> *containers* -> *add* using these options:
  * *Name* - `bas-style-kit`
  * *Access* - `public blob`

To create the CDN backed by this storage account:

1. Login to the [Azure management portal](http://manage.windowsazure.com/)
2. Select *New* -> *App Services* -> *CDN* -> *Quick Create* service using these options:
  * *Origin type* - `Storage Accounts`
  * *Origin URL* - `bascdnprod.blob.core.windows.net`
3. Select *CDN* -> *[3]* and set these options:
  * *Enable HTTPS*

[1] This CDN may also be used by other projects as needed, these will use the same storage account, but different
containers within this. The CDN in front of these containers will also be shared as it links to the storage account,
not the containers within.

[2] The means the content in the storage account will be mirrored between the `West Europe` and `North Europe`
locations. Data will not pass beyond the EU (i.e. to a US location). However as Microsoft is a US company this isn't
really a meaningful distinction.

[3] The name of the CDN instance is random but will be something like `az792977`.

## Usage

### All environments

It is assumed you have setup the environment you wish to use and your working directory is the root of this project.

### Development - local

#### Less styles

As the BAS Style Kit is based on Bootstrap we use the same CSS preprocessor, [Less](http://lesscss.org/),
to ensure we can easily extend this framework to meet our needs.

Note: The BAS Style Kit is **not** a custom build of Bootstrap, it is a layer over the top.
Removing the Style Kit will result in using the underlying Bootstrap features, rather than breaking styling.

These styles are structured in a similar, if not identical, way to Boostrap.
E.g. if we extend Bootstrap's `grid.less` we will use create a `grid.less` with our customisations/additions).

All Less styles are located in the `less` directory and the main entry point is `less/bas-style-kit.less`.
This is file simply imports other files that make up the BAS Style Kit styles. Less files are loaded in sequence,
therefore if file *a* relies on file *b*, file *a* will need to be included before file *b*.
This should make sense when looking at the files.

This ensures any familiarity with Bootstrap's structure can be reused within the BAS Style Kit,
even if the styles themselves will be different.

Importantly this file includes a `variables.less` and various mixins from the Bootstrap framework itself.
This is because we make additions to the Bootstrap grid for example and this requires the use of a number of mixins.
Generally we simply use these mixins with different parameters. There is therefore no reason to duplicate their
functionality so we can simply import any mixins we need for our styles, without needing to maintain our own versions.

##### Compiling Less styles

[Less](http://lesscss.org/) is a [CSS pre-processor](https://github.com/showcases/css-preprocessors)
and therefore has to be compiled down to CSS before it can be used within a browser.

Less compilation, processing steps and output of both minified and non-minified CSS files using `gulp less`.

This task will call these tasks in parallel: `gulp [less-min | less-no-min]`.

`gulp less-no-min` will:

* Compile `less/bas-style-kit.less` into CSS
* Run compiled CSS through [autoprefixer](https://github.com/postcss/autoprefixer)
* Run compiled CSS through [csslint](http://csslint.net/) & [csscomb](http://csscomb.com/) - see *linting* for more
* Include [CSS source maps](http://blog.teamtreehouse.com/introduction-source-maps) for compiled CSS files
* Output compiled, processed CSS files and CSS maps to `dist/css` and `documentation/end-users/dist/css`

`gulp less-min` will, in addition to the steps performed in `gulp less-no-min`:

* Minify the CSS using [clean-css](https://github.com/jakubpawlowicz/clean-css) and append a `.min` filename suffix
* Include [CSS source maps](http://blog.teamtreehouse.com/introduction-source-maps) for compiled minified CSS files
* Output compiled, minified CSS files and CSS maps to `dist/css` and `documentation/end-users/dist/css`

Note: If needed to only compile Less files into CSS use the `gulp less-only` task.

##### CSS linting

Compiled CSS is ran through the same linting tools Bootstrap uses,
[csslint](http://csslint.net/) & [csscomb](http://csscomb.com/), and uses the same setting files.

Errors are reported to the terminal.

###### Known errors

These errors are known and accepted for the reasons given here:

* `[GENERAL] Too many @font-face declarations (10). Too many different web fonts in the same stylesheet. (font-faces)`
  * This is caused by the large number of variants for the Open Sans web-font
  * Ideally a number of these variants can be dropped preventing this error
  * See [BASWEB-431](https://jira.ceh.ac.uk/browse/BASWEB-431) for details

#### Fonts

The BAS Style Kit includes a number of web-fonts to provide typographic styling and icon-font libraries:

* [Open Sans](https://www.google.com/fonts/specimen/Open+Sans) - Base typographic font
* [Gill Sans](http://www.fonts.com/font/monotype/gill-sans) - Brand typographic font
* [Font Awesome](http://fontawesome.io) - Base icon-font for general purposes/actions in projects
* [Map Glyphs](http://mapglyphs.com) - Icon-font for states, countries, continents and globes
* [Devicons](http://vorillaz.github.io/devicons) - Icon-font for logos of technology frameworks, tools and services
* [Glyphicons Halflings](http://glyphicons.com/) - Icon-font included with Bootstrap, **NOT** supported here

Font file locations and font-family declarations are defined through the BAS Style Kit's Less/CSS styles.

Font files can be copied to their relevant locations using `jekyll fonts`.

This task will call these tasks in parallel:
`gulp [fonts-opensans | fonts-gillsans | fonts-fontawesome | fonts-mapglyphs | fonts-devicons | fonts-glyphicons]`.

Individual font files can be copied if needed using:

* `gulp fonts-opensans` - For Open Sans
* `gulp fonts-gillsans` - For Gill Sans
* `gulp fonts-fontawesome` - For Font Awesome
* `gulp fonts-mapglyphs` - For Map Glyphs
* `gulp fonts-devicons` - For Devicons
* `gulp fonts-glyphicons` - For Glyphicons

##### Gill Sans

Gill Sans is the font face used in the BAS logo. It is not distributed publicly and requires a license for use.

BAS pays for a subscription to use this font within BAS projects, subject to a limit of 250,000 page views within a 30
day period. This limit applies across all websites and applications that use fonts under the BAS subscription.

This means if projects other than the BAS Style Kit (and websites and applications in which it is used) use fonts from
this subscription, they will all count against the same page view restriction.

This font subscription is with [Fonts.com](https://wwww.fonts.com) and is paid for the BAS Communications Team.
If we would like access to this subscription or have questions related to licensing, please create an issue within
this project in the first instance.

##### Map Glyphs

Map Glyphs is not distributed publicly and requires a license for attribution free usage.

BAS has paid for attribution free usage when used in official projects and bundles the font within the Style Kit.

##### Glyphicons

Bootstrap includes a default icon web-font, Glyphicons Halflings.
This font is **NOT** supported within the BAS Style Kit and **SHOULD NOT** be used.
Font Awesome, or any of the other speciality icon fonts, **SHOULD** be used instead.

As Bootstrap uses Glyphicons by defaultm references it its web-font files are included in the pre-compiled CSS.
As we don't modify this CSS, it is not possible to remove such references. To avoid browser warnings over references to
these missing web-fonts they are copied into the `dist` directories of this project using `gulp fonts-glyphicons`.
This is not ideal as they are placed directly within the `fonts` directory, rather than in a name-spaced directory.

##### Jekyll data files for icon fonts

To display the dizzying array of icons within icon fonts,
Gulp is used to parse the icon classes into a Jekyll data file.

Where possible, icons are linked to the detail page on their respective provider's site.

Jekyll data files can be generated for all icon fonts using `gulp jekyll-data`.

This task will call these tasks in parallel: `gulp [jekyll-data-fa | jekyll-data-mg | jekyll-data-di]`.

Individual font data files can be generated if needed using:

* `gulp jekyll-data-fa` - For Font Awesome
* `gulp jekyll-data-mg` - For Map Glyphs
* `gulp jekyll-data-di` - For Devicons

Note: There is no task for Glyphicons as this icon font is not supported by this project.

#### Utility tasks

These tasks are useful as part of larger workflows, they have limited utility on their own.

* `gulp clean` - Removes all BAS Style Kit related files in `dist` and `documentation/end-users/dist`

#### Special tasks

This is limited essentially to the *default* task run when `gulp` is run by itself:

This task calls the `gulp clean` task, then these tasks in parallel: `gulp [clean | less | fonts | jekyll-data]`

#### End-user documentation

Other than distributed assets, the end-user documentation is the primary output of this project as it is used by users
to apply the Style Kit to their own projects. It is a static website, built using [Jekyll](http://jekyllrb.com) and
modelled on the Bootstrap end-user documentation.

In this, *development* environment this documentation will be re-generated frequently and used locally to ensure new
features are correctly documented.

Note: The *development* environment is the only environment which can build the Jekyll site, as it is the only environment
in which Jekyll is available. This means other environments rely on the site files being generated in a *development*
environment first, before they are then uploaded to another environment. This is explained in these other environments.

Note: The definitive version of this documentation, built from the latest release of the project, is available at
[here](https://bas-style-kit.web.nerc-bas.ac.uk/).

To manually rebuild the documentation:

```shell
$ ssh bas-style-kit-dev-web1.v.m
$ cd /app

$ jekyll build
```

To automatically rebuild when changes are made to source files (this is only useful in development environments):

```shell
$ ssh bas-style-kit-dev-web1.v.m
$ cd /app

$ jekyll build --watch --force_polling
```

### Staging - remote

#### End-user documentation

TODO: Set and use environment variable to determine build environment (currently locked to *development*).

The Continuous Deployment element of SemaphoreCI will deploy project documentation to the staging documentation
website automatically. This documentation is generated from the *develop* branch of the Project Repository providing it
has passed certain tests. These is automatic, taking place whenever changes are pushed to the Project Repository.

The Continuous Deployment element of SemaphoreCI will also deploy distribution assets to the *development* environment
of the BAS CDN automatically. These assets are also generated from the *develop* branch of the Project Repository
providing it has passed the same tests. These processes are also automatic.

Note: The definitive version of this documentation, built from the latest, passing, version of the *develop* branch of
this project, is available [here](http://bas-style-kit-docs-stage.s3-website-eu-west-1.amazonaws.com/).

### Production - remote

#### CDN distribution for assets and project release

The distribution assets (i.e. compiled CSS, etc.) and the current snapshot of the overall project are hosted on the
project CDN for each release. These resources are used by others in their own websites and applications in order to
implement or build on a particular release of the Style Kit.

Note: You **MUST** make sure you have the correct version checked out and that you do not have the *master* branch
checked out instead. This ensures the correct distribution files are used and the associated documentation generated.

The distribution files to be uploaded to the CDN will have already been compiled within the `dist` directory. The
snapshot of the overall project to be uploaded can be downloaded from Stash directly as a `.zip` archive. Both files
will be uploaded the CDN's underlying Storage Account.

To upload the distribution files (it is assumed all files inside `/dist` will be uploaded):

```
$ duck --upload azure://bascdnprod.blob.core.windows.net/bas-style-kit/[version]/dist dist/ -u bascdndev -p [primary_access_key]
```

Where: `[version]` represents the release being uploaded and `[primary access key]` is the primary access key of the
Storage Account being used [1], in this case `bascdnprod`.

E.g.

```
$ duck --upload azure://bascdnprod.blob.core.windows.net/bas-style-kit/0.1.0-alpha/dist dist/ -u bascdndev -p xxx
```

To upload the snapshot of the overall project:

1. Access the [project's Stash repo](https://stash.ceh.ac.uk/projects/BSK/repos/bas-style-kit/browse)
2. Using the tag/branch selector, select the relevant tag for the release
3. Select the *download* action
4. Change to the path containing the downloaded `.zip` archive and use the command below to upload to the CDN:

```
$ duck --upload azure://bascdnprod.blob.core.windows.net/bas-style-kit/[version] [snapshot] -u bascdndev -p [primary_access_key]
```

Where: `[version]` represents the release being uploaded, `[snapshot]` the snapshit archive and `[primary access key]`
the primary access key of the Storage Account being used [1], in this case `bascdnprod`.

E.g.

```
$ duck --upload azure://bascdnprod.blob.core.windows.net/bas-style-kit/0.1.0-alpha/ bas-style-kit/0.1.0-alpha.zip dist/ -u bascdndev -p xxx
```

[1] You can find this access key through the [Azure management portal](http://manage.windowsazure.com/) by logging in
and selecting *Storage* -> *bascdnprod* -> *manage access keys*

#### End-user documentation

To generate end-user documentation for a *production* environment ensure you have the relevant release tag checked out
in a *development* environment.

Note: You **MUST** make sure you have the correct version checked out and that you do not have the *master* branch
checked out instead. This ensures the correct distribution files are used and the associated documentation generated.

Within this environment generate the documentation:

```shell
$ ssh bas-style-kit-dev-web1.v.m
$ cd /app

$ jekyll build

$ logout
```

Then publish this to the *production* environment:

```shell
$ ansible-playbook -i provisioning/production provisioning/update-prod.yml
```

This will update the documentation on the production server using the generated site files.

## Contributing

This project welcomes contributions, see `CONTRIBUTING` for our general policy.

## Releases

See the *developer* documentation for instructions on how to create and manage releases.

## Acknowledgements

The vast majority of this project is based on the amazing [Bootstrap](http://getbootstrap.com) project.

97% of any credit for this project should go to Boostrap's [authors and contributors](http://getbootstrap.com/about/).

The original Bootstrap licensing statement is shown below,
see their original `LICENSE-BOOTSTRAP-MIT` further licensing information.

> Code and documentation copyright 2011-2015 Twitter, Inc. Code released under
[the MIT license](https://github.com/twbs/bootstrap/blob/master/LICENSE).
Docs released under [Creative Commons](https://github.com/twbs/bootstrap/blob/master/docs/LICENSE).

The authors of this project are incredibly grateful for their work.

## License

Copyright 2015 NERC BAS. Licensed under the MIT license, see `LICENSE` for details.
