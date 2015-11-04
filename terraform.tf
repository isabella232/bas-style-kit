# Terraform definition file - this file is used to describe the required infrastructure for this project.

# Variables

variable "aws_access_key" {}  # Define using environment variable - e.g. TF_VAR_aws_access_key=XXX
variable "aws_secret_key" {}  # Define using environment variable - e.g. TF_VAR_aws_secret_key=XXX

# Providers

provider "aws" {
  access_key = "${var.aws_access_key}"
  secret_key = "${var.aws_secret_key}"
  region = "eu-west-1"
}


# Resources

# Static website for staging documentation (Global)

resource "aws_iam_user" "semmaphore-deploy-bas-style-kit-docs-stage" {
    name = "semmaphore-deploy-bas-style-kit-docs-stage"
}
resource "aws_iam_user_policy" "semmaphore-deploy-bas-style-kit-docs-stage" {
    name = "semmaphore-deploy-bas-style-kit-docs-stage"
    user = "${aws_iam_user.semmaphore-deploy-bas-style-kit-docs-stage.name}"
    policy = "${file("provisioning/data/iam-inline-policies/semmaphore-deploy-bas-style-kit-docs-stage.json")}"
}
resource "aws_s3_bucket" "bas-style-kit-docs-stage" {
  bucket = "bas-style-kit-docs-stage"
  acl = "public-read"
  policy = "${file("provisioning/data/S3-bucket-policies/bas-style-kit-docs-stage.json")}"
  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}

# Static website for production documentation (Global)

resource "aws_iam_user" "semmaphore-deploy-bas-style-kit-docs-prod" {
    name = "semmaphore-deploy-bas-style-kit-docs-prod"
}
resource "aws_iam_user_policy" "semmaphore-deploy-bas-style-kit-docs-prod" {
    name = "semmaphore-deploy-bas-style-kit-docs-prod"
    user = "${aws_iam_user.semmaphore-deploy-bas-style-kit-docs-prod.name}"
    policy = "${file("provisioning/data/iam-inline-policies/semmaphore-deploy-bas-style-kit-docs-prod.json")}"
}
resource "aws_s3_bucket" "bas-style-kit-docs-prod" {
  bucket = "bas-style-kit-docs-prod"
  acl = "public-read"
  policy = "${file("provisioning/data/S3-bucket-policies/bas-style-kit-docs-prod.json")}"
  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}

# BAS CDN user for distributing assets (Global)

resource "aws_iam_user" "semmaphore-deploy-bas-cdn-prod" {
    name = "semmaphore-deploy-bas-cdn-prod"
}
resource "aws_iam_user_policy" "semmaphore-deploy-bas-cdn-prod" {
    name = "semmaphore-deploy-bas-cdn-prod"
    user = "${aws_iam_user.semmaphore-deploy-bas-cdn-prod.name}"
    policy = "${file("provisioning/data/iam-inline-policies/semmaphore-deploy-cdn-prod.json")}"
}
