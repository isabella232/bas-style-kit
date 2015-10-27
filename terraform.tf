# Terraform definition file - this file is used to describe the required infrastructure for this project.

# Variables

variable "aws_access_key" {}  # Define using environment variable - e.g. TF_VAR_aws_access_key=XXX
variable "aws_secret_key" {}  # Define using environment variable - e.g. TF_VAR_aws_secret_key=XXX

# Providers

# AWS provider configuration
provider "aws" {
  access_key = "${var.aws_access_key}"
  secret_key = "${var.aws_secret_key}"
  region = "eu-west-1"
}


# Resources

# `bas-style-kit-docs-stage` resource

# S3 bucket with static website hosting
resource "aws_s3_bucket" "bas-style-kit-docs-stage-bucket" {
  bucket = "bas-style-kit-docs-stage"
  acl = "public-read"
  policy = "${file("provisioning/data/S3-bucket-policies/bas-style-kit-docs-stage.json")}"
  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}

# `bas-style-kit-docs-prod` resource

# S3 bucket with static website hosting
resource "aws_s3_bucket" "bas-style-kit-docs-prod-bucket" {
  bucket = "bas-style-kit-docs-prod"
  acl = "public-read"
  policy = "${file("provisioning/data/S3-bucket-policies/bas-style-kit-docs-prod.json")}"
  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}
