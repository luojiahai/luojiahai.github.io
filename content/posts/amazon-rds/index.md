+++
slug = 'amazon-rds'
title = 'Amazon Relational Database Service (Amazon RDS)'
date = 2024-07-09T17:00:00+10:00
draft = false
author = 'luojiahai'
+++

Amazon Relational Database Service (Amazon RDS) is a service that makes it easier to set up, operate, and scale a
relational database in the cloud.

It provides cost-efficient, resizable capacity for an industry-standard relational database and manages common database
administration tasks.

## Features

### Multi-AZ deployments

Amazon RDS Multi-AZ deployments provide enhanced availability and durability for RDS DB instances.

### Failover conditions

Amazon RDS detects and automatically recovers from the most common failure scenarios for Multi-AZ deployments.

Amazon RDS automatically performs a failover in the event of:

- Loss of availability in the primary zone
- Loss of network connectivity to the primary zone
- Compute unit failure on the primary zone
- Storage failure on the primary zone

### Durable: Automated backups

Amazon RDS provides automated backups of the entire instance and transaction logs for MySQL, PostgreSQL, MariaDB, Oracle
Server, or SQL Server.

The features and benefits of the automated backups are:

- Scheduled daily volume backup of the entire instance
- Monitored backup completion status and runtime
- Archived database change logs
- Configurable maximum 35-day backup retention

### Scalable: Read replicas

Read replicas offer scalability as needed.

Amazon RDS will:

- Relieve pressure on your primary database with additional read capacity.
- Create continuously synced read-only copies of the primary database.
- Locate read replicas in a single Availability Zone, across Availability Zones, or across Regions. 
- Promote a read replica to a primary for faster recovery in the event of a disaster.
- Upgrade a read replica to a new engine version.

### Scalable: Scaling instances up and down

In the past, a DBA would need to add physical servers to accommodate any expansion. Amazon RDS users can do this by
selecting a button.

### Secure: Amazon RDS instance

Amazon RDS offers:

- Network isolation with Amazon Virtual Private Cloud (Amazon VPC)
- AWS Identity and Access Management (IAM)-based resource-level permission controls
- Encryption at rest using AWS Key Management Service (AWS KMS)
- Secure Sockets Layer (SSL) protection for data in transit

### Amazon RDS Proxy

Amazon RDS Proxy is a fully managed, highly available database proxy for Amazon RDS. The proxy uses connection pooling
for multiple applications to share connections to the DB instance.

Amazon RDS Proxy:

- Increases scalability, resiliency to a database failure, and security
- Supports pooling and sharing of application connections for increased efficiency
- Deploys across multiple Availability Zones, reducing failover times by up to 66 percent
- Integrates with AWS Secrets Manager and IAM
- Helps users get started quickly in the console
- Provides all the benefits of a database proxy without patching or management overhead
