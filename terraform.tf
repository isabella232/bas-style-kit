# Terraform definition file - this file is used to describe the required infrastructure for this project.

# Digital Ocean provider configuration

provider "digitalocean" {
	token = "${var.digital_ocean_token}"
}


# Resources

# 'bas-style-kit-dev-web2' resource

# VM

module "bas-style-kit-dev-web2-droplet" {
    source = "github.com/antarctica/terraform-module-digital-ocean-droplet?ref=v1.0.0"
    hostname = "bas-style-kit-dev-web2"
    ssh_fingerprint = "${var.ssh_fingerprint}"
    image = 11744346
}

# DNS records (public, private and default [which is an APEX record and points to public])

module "bas-style-kit-dev-web2-records" {
    source = "github.com/antarctica/terraform-module-digital-ocean-records?ref=v0.1.1"
    hostname = "bas-style-kit-dev-web2"
    machine_interface_ipv4_public = "${module.bas-style-kit-dev-web2-droplet.ip_v4_address_public}"
    machine_interface_ipv4_private = "${module.bas-style-kit-dev-web2-droplet.ip_v4_address_private}"
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
