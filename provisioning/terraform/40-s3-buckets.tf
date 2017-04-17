#
# Defines S3 buckets for object storage and static website hosting
#
# This file relies on Terraform providers being previously configured - see '00-providers.tf'

#  Bucket with static website support
#
# AWS source: https://aws.amazon.com/s3/
# Terraform source: https://www.terraform.io/docs/providers/aws/r/s3_bucket.html
resource "aws_s3_bucket" "bas-style-kit-testbed" {
    bucket = "bas-style-kit-testbed"

    # Canned ACL - All objects can be read by anyone, but only the owner can change them
    #
    # Source: https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#canned-acl
    acl = "public-read"

    # Bucket policy - All objects can be read by anyone, but only the owner can change them
    #
    # Source: http://docs.aws.amazon.com/AmazonS3/latest/dev/example-bucket-policies.html#example-bucket-policies-use-case-2
    policy = "${file("41-bas-style-kit-testbed-bucket-policy.json")}"

    # Enables static website hosting for a bucket
    website {
        index_document = "index.html"
        error_document = "error.html"
    }

    tags {
        Name = "bas-style-kit-testbed"
        X-Project = "BAS Style Kit"
        X-Managed-By = "Terraform"
    }
}
