+++
slug = 'aws-sigv4'
title = 'AWS Signature Version 4'
date = 2024-07-04T19:00:00+10:00
draft = false
author = 'luojiahai'
+++

Signature Version 4 is the AWS signing protocol.

Unless you are using the AWS SDKs or CLI, you must write code to calculate signatures that provide authentication information in your requests.

## Overview

The following diagram illustrates the general process of computing a signature.

![](images/signing-overview.png)

- The **string to sign** depends on the request type. For an HTTP POST request, the `POST` policy in the request is the
string you sign.
- For **signing key**, the diagram shows series of calculations, where result of each step you feed into the next step.
- When an AWS service receives an authenticated request, it recreates the **signature** using the authentication
information contained in the request.

### When to sign requests

When you write custom code that sends API requests to AWS, you must include code that signs the requests. You might
write custom code because:

- You are working with a programming language for which there is no AWS SDK.
- You need complete control over how requests are sent to AWS.

### Why requests are signed

- **Verify the identity of the requester**: Authenticated requests require a signature that you create by using your
access keys (access key ID, secret access key).
- **Protect data in transit**: To prevent tampering with a request while it's in transit, some of the request elements
are used to calculate a hash (digest) of the request, and the resulting hash value is included as part of the request.
- **Protect against potential replay attacks**: In most cases, a request must reach AWS within five minutes of the time
stamp in the request. Otherwise, AWS denies the request.

## Authentication methods

### HTTP authorization header

The `HTTP Authorization` header is the most common method of authenticating a request. All REST API operations (except
for browser-based uploads using `POST` requests) require this header.

The following is an example of the Authorization header value.

```
Authorization: AWS4-HMAC-SHA256
Credential=AKIAIOSFODNN7EXAMPLE/20130524/us-east-1/s3/aws4_request, 
SignedHeaders=host;range;x-amz-date, 
Signature=<signature-value>
```

- **Authorization**: The algorithm that was used to calculate the signature.
- **Credential**: This string has the following form: `<your-access-key-id>/<date>/<aws-region>/<aws-service>/aws4_request`.
- **SignedHeaders**: A semicolon-separated list of request headers that you used to compute `Signature`.
- **Signature**: The 256-bit signature expressed as 64 lowercase hexadecimal characters.

### Query string parameters

You can use a query string to express a request entirely in a URL. Because the request signature is part of the URL,
this type of URL is often referred to as a presigned URL.

The following is an example presigned URL.

```
https://s3.amazonaws.com/examplebucket/test.txt ?
X-Amz-Algorithm=AWS4-HMAC-SHA256 &
X-Amz-Credential=<your-access-key-id>/20130721/us-east-1/s3/aws4_request &
X-Amz-Date=20130721T201207Z &
X-Amz-Expires=86400 &
X-Amz-SignedHeaders=host &
X-Amz-Signature=<signature-value>
```

## Create a signed AWS API request

The following diagram illustrates the process, including the various components of the string that you create for
signing.

![](images/sigV4-using-auth-header.png)

### Temporary security credentials

Instead of using long-term credentials to sign a request, you can use temporary security credentials provided by AWS
Security Token Service (AWS STS).

When you use temporary security credentials, you must add `X-Amz-Security-Token` to the Authorization header or the
query string to hold the session token. Some services require that you add `X-Amz-Security-Token` to the canonical
request. Other services require only that you add `X-Amz-Security-Token` at the end, after you calculate the signature.
Check the documentation for each AWS service for details.

### Summary of signing steps

**Step 1: Create a canonical request**

Arrange the contents of your request (host, action, headers, etc.) into a standard canonical format. The canonical
request is one of the inputs used to create a string to sign. For details, see Elements of an AWS API request signature.

**Step 2: Create a hash of the canonical request**

Derive a signing key by performing a succession of keyed hash operations (HMAC operations) on the request date, Region,
and service, with your AWS secret access key as the key for the initial hashing operation.

**Step 3: Create a String to Sign**

Create a string to sign with the canonical request and extra information such as the algorithm, request date, credential
scope, and the digest (hash) of the canonical request.

**Step 4: Calculate the signature**

After you derive the signing key, you then calculate the signature by performing a keyed hash operation on the string to
sign. Use the derived signing key as the hash key for this operation.

**Step 5: Add the signature to the request**

After you calculate the signature, add it to an HTTP header or to the query string of the request.

---
