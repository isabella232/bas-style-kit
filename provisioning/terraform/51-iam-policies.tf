#
# Defines a policies for IAM users
#
# This file relies on the AWS Terraform provider being previously configured - see '00-providers.tf'

# In-line user policy
# Grants permission for the IAM user assigned to this project to access resources owned or used by this project

# This resource implicitly depends on the 'aws_iam_user.bas-gitlab-deploy-bas-style-kit' resource
#
# AWS source: https://aws.amazon.com/iam/
# Terraform source: https://www.terraform.io/docs/providers/aws/r/iam_user_policy.html
resource "aws_iam_user_policy" "upload-snapshot-bas-style-kit" {
  name   = "upload-snapshot"
  user   = "bas-gitlab-deploy-bas-style-kit"
  policy = "${file("51-iam-policy-upload-bas-package-service-prod.json")}"
}

# In-line user policy
# Grants permission for the IAM user assigned to this project to access resources owned or used by this project
#
# This resource implicitly depends on the 'aws_iam_user.bas-gitlab-deploy-bas-style-kit' resource
#
# AWS source: https://aws.amazon.com/iam/
# Terraform source: https://www.terraform.io/docs/providers/aws/r/iam_user_policy.html
resource "aws_iam_user_policy" "upload-assets-bas-style-kit-dev" {
  name   = "upload-assets-dev"
  user   = "${aws_iam_user.bas-gitlab-deploy-bas-style-kit.name}"
  policy = "${file("51-iam-policy-upload-bas-cdn-dev.json")}"
}

# In-line user policy
# Grants permission for the IAM user assigned to this project to access resources owned or used by this project
#
# This resource implicitly depends on the 'aws_iam_user.bas-gitlab-deploy-bas-style-kit' resource
#
# AWS source: https://aws.amazon.com/iam/
# Terraform source: https://www.terraform.io/docs/providers/aws/r/iam_user_policy.html
resource "aws_iam_user_policy" "upload-assets-bas-style-kit-prod" {
  name   = "upload-assets-prod"
  user   = "${aws_iam_user.bas-gitlab-deploy-bas-style-kit.name}"
  policy = "${file("51-iam-policy-upload-bas-cdn-prod.json")}"
}

# In-line user policy
# Grants permission for the IAM user assigned to this project to access resources owned or used by this project
#
# This resource implicitly depends on the 'aws_iam_user.bas-gitlab-deploy-bas-style-kit' resource,
#
# AWS source: https://aws.amazon.com/iam/
# Terraform source: https://www.terraform.io/docs/providers/aws/r/iam_user_policy.html
resource "aws_iam_user_policy" "upload-testbed-bas-style-kit-stage" {
    name = "upload-bas-style-kit-testbed-stage"
    user = "${aws_iam_user.bas-gitlab-deploy-bas-style-kit.name}"
    policy = "${file("51-iam-policy-upload-bas-style-kit-testbed-stage.json")}"
}
