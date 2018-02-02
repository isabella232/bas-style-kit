#
# This file is used to define resources for managing permissions to resources related to this project

# Access Keys
#
# IAM Access Keys/Secrets MUST NOT be created through Terraform to ensure this project can be open-sourced later.
# Instead Access Keys/Secrets MAY be created through either the AWS Console or AWS APIs/SDKs.

#    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
#
# Principles
#
#    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *

# Continuous Delivery Principle
#
# This resource relies on the AWS Terraform provider being previously configured.
#
# AWS source: https://aws.amazon.com/iam/
# Terraform source: https://www.terraform.io/docs/providers/aws/r/iam_user.html
resource "aws_iam_user" "bas-gitlab-deploy-bas-style-kit" {
  name = "bas-gitlab-deploy-bas-style-kit"
}

#    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *
#
# Policy definitions & assignments
#
#    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *    *

# Testbed bucket policy
#
# Policy to manage the S3 bucket holding the testbed
#
# Inline policy
#
# This resource implicitly depends on the 'aws_iam_user.bas-gitlab-deploy-bas-style-kit' resource
# This resource relies on the AWS Terraform provider being previously configured.
#
# AWS source: http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html#customer-managed-policies
# Terraform source: https://www.terraform.io/docs/providers/aws/r/iam_user_policy.html
#
# Tags are not supported by this resource
resource "aws_iam_user_policy" "bas-style-kit-testbed" {
  name   = "bas-style-kit-testbed-management-policy"
  user   = "${aws_iam_user.bas-gitlab-deploy-bas-style-kit.name}"
  policy = "${file("70-resources/iam/policies/inline/testbed-bucket.json")}"
}

# BAS packages service policy - Testbed
#
# Policy to upload builds of the testbed
#
# Inline policy
#
# This resource implicitly depends on the 'aws_iam_user.bas-gitlab-deploy-bas-style-kit' resource
# This resource relies on the AWS Terraform provider being previously configured.
#
# AWS source: http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html#customer-managed-policies
# Terraform source: https://www.terraform.io/docs/providers/aws/r/iam_user_policy.html
#
# Tags are not supported by this resource
resource "aws_iam_user_policy" "upload-snapshot-bas-style-kit" {
  name   = "upload-testbed-snapshot"
  user   = "${aws_iam_user.bas-gitlab-deploy-bas-style-kit.name}"
  policy = "${file("70-resources/iam/policies/inline/packages-service-prod.json")}"
}

# BAS CDN policy - Testbed
#
# Policy to upload assets for the testbed
#
# Inline policy
#
# This resource implicitly depends on the 'aws_iam_user.bas-gitlab-deploy-bas-style-kit' resource
# This resource relies on the AWS Terraform provider being previously configured.
#
# AWS source: http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html#customer-managed-policies
# Terraform source: https://www.terraform.io/docs/providers/aws/r/iam_user_policy.html
#
# Tags are not supported by this resource
resource "aws_iam_user_policy" "upload-assets-bas-style-kit" {
  name   = "upload-testbed-assets"
  user   = "${aws_iam_user.bas-gitlab-deploy-bas-style-kit.name}"
  policy = "${file("70-resources/iam/policies/inline/cdn-prod.json")}"
}
