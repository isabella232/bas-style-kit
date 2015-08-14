# Terraform definition file - this file is used to describe the required infrastructure for this project.

# Variables

variable "digital_ocean_token" {}  # Define using environment variable - e.g. TF_VAR_digital_ocean_token=XXX
variable "ssh_fingerprint" {}      # Define using environment variable - e.g. TF_VAR_ssh_fingerprint=XXX


# Providers

# Digital Ocean provider configuration

provider "digitalocean" {
	token = "${var.digital_ocean_token}"
}


# Resources

# 'bas-style-kit-stage-web1' resource

# VM

module "bas-style-kit-stage-web1-droplet" {
  source = "github.com/antarctica/terraform-module-digital-ocean-droplet?ref=v1.1.0"
  hostname = "bas-style-kit-stage-web1"
  ssh_fingerprint = "${var.ssh_fingerprint}"
  image = 13126041
}

# DNS records (public, private and default [which is an APEX record and points to public])

module "bas-style-kit-stage-web1-records" {
  source = "github.com/antarctica/terraform-module-digital-ocean-records?ref=v1.0.2"
  hostname = "bas-style-kit-stage-web1" # If this changes you *MUST* update the vanity record below
  machine_interface_ipv4_public = "${module.bas-style-kit-stage-web1-droplet.ip_v4_address_public}"
  machine_interface_ipv4_private = "${module.bas-style-kit-stage-web1-droplet.ip_v4_address_private}"
}

# Additional vanity DNS records (point to default record)
# Add a record to the domain
resource "digitalocean_record" "bas-style-kit-staging-vanity-records" {
  domain = "web.nerc-bas.ac.uk"
  type = "CNAME"
  name = "bas-style-kit-staging"
  value = "bas-style-kit-stage-web1.web.nerc-bas.ac.uk."
}

# 'bas-style-kit-prod-web1' resource

# VM

module "bas-style-kit-prod-web1-droplet" {
  source = "github.com/antarctica/terraform-module-digital-ocean-droplet?ref=v1.1.0"
  hostname = "bas-style-kit-prod-web1"
  ssh_fingerprint = "${var.ssh_fingerprint}"
  image = 13126041
}

# DNS records (public, private and default [which is an APEX record and points to public])

module "bas-style-kit-prod-web1-records" {
  source = "github.com/antarctica/terraform-module-digital-ocean-records?ref=v1.0.2"
  hostname = "bas-style-kit-prod-web1"  # If this changes you *MUST* update the vanity record below
  machine_interface_ipv4_public = "${module.bas-style-kit-prod-web1-droplet.ip_v4_address_public}"
  machine_interface_ipv4_private = "${module.bas-style-kit-prod-web1-droplet.ip_v4_address_private}"
}

# Additional vanity DNS records (point to default record)
# Add a record to the domain
resource "digitalocean_record" "bas-style-kit-vanity-records" {
  domain = "web.nerc-bas.ac.uk"
  type = "CNAME"
  name = "bas-style-kit"
  value = "bas-style-kit-prod-web1.web.nerc-bas.ac.uk."
}

# Provisioning (using a fake resource as provisioners can't be first class objects)

# Note: The "null_resource" is an undocumented feature and should not be relied upon.
# See https://github.com/hashicorp/terraform/issues/580 for more information.

#resource "null_resource" "provisioning" {
#
#    depends_on = ["module.bas-style-kit-dev-web2-records"]
#
#    # This replicates the provisioning steps performed by Vagrant
#    provisioner "local-exec" {
#        command = "ansible-galaxy install https://github.com/antarctica/ansible-prelude,v0.1.1 --roles-path=provisioning/roles_bootstrap  --no-deps --force"
#    }
#    provisioner "local-exec" {
#        command = "ansible-playbook -i provisioning/local provisioning/prelude.yml"
#    }
#    provisioner "local-exec" {
#        command = "ansible-playbook -i provisioning/development provisioning/bootstrap-digitalocean.yml"
#    }
#}
