# Customer Relationship Management System. 

CRM is mainly incorporate with all kinds of other software system applications. But, core process elements  are within the scope of a CRM are as below.

1. CRM :  Customer Relationship Management (CRM) is designed to manage and maintain customer relationships, track engagements and sales, and deliver actionable data. It all comes down to improving customer relationships and improving profitability.

2. Prospect : a person regarded as likely to succeed or as a potential customer, client, etc.

3. Opportunity : An opportunity is a prospect who is near the point of becoming a customer. This contact has gone through the customer valuation and qualifying process, and the sales team may be ready to close the deal . At this stage, most deal details are already known and have been discussed.

4. Customer : when a deal is associated with a contact it becomes a prospect, and when a deal is won the contact becomes a customer

5. Lead : A lead is a potential customer in the first stage of the sales pipeline. Lead sources include inbound marketing efforts, a list of names, responses to an ad or other campaign, and referrals. Generating leads is a crucial function of marketing departments.

In general CRM is record all the information of a potential customer with a qualified lead in a product or service the business provides. If elaborate more on Information, this includes:

1. Personal details

2. Contact Information

3. Business Information

    - Business Registration
    - Business Tax Details
    - Business Type

4. Financial Integrations

5. GL Account ( Integrated to Specified Chart of Accounts )

6. Opportunity/Lead Information

## Table of Contents

- [Customer Relationship Management System.](#customer-relationship-management-system)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Database Setup](#database-setup)
    - [Usage](#usage)
      - [Run the System](#run-the-system)
      - [Stop the System](#stop-the-system)
    - [Test](#test)
    - [License](#license)

## Getting Started

### Prerequisites

Ensure you have the following tools installed on your machine:

- Nest.js and npm
- Docker
- postgres DB
- Swagger Documentation
- RabbitMQ

### Installation

1. Clone the repository:

```bash
   $ git clone https://Lakchani@bitbucket.org/btl-sky/crm.git
```

2. Navigate to the project directory:

```bash
   $ cd CRM
   $ cd crm
```

3. Navigate to the each project file and Install dependencies:
- opportunity Service
```bash
   $ cd opportunity
   $ npm i
```
   
 - prospect Service
```bash
   $ cd prospect
   $ npm i
```

 - customer Service
```bash
   $ cd customer
   $ npm i
```

### Database Setup

1. Create .env file in config file.

2. Copy the sample file data formate.

3. Create database in postgres DB

4. Open the .env file and update the database connection details:
```bash
   DB_HOST=localhost # insert db hostname
   DB_PORT=5432
   DB_DATABASE=yourdbname # insert db name
   DB_USERNAME=yourdbusername # insert db username
   DB_PASSWORD=yourdbpassword # u=insert password
```

Replace yourdbname, yourdbusername, and yourdbpassword with your desired values.

### Usage

1. ### Running Locally
```bash
   $ npm run start:dev
```

- Prospect service will be available at http://localhost:3001 and it swagger documentation will be available at http://localhost:3001/api.
- Opportunity service will be available at http://localhost:3002 and it swagger documentation will be available at http://localhost:3002/api.
- Customer service will be available at http://localhost:3003 and it swagger documentation will be available at http://localhost:3003/api.

2. ### Docker Build and Run

#### Run the System
We can easily run the whole with only a single command:
```bash
   docker-compose build
   docker compose up
```

Docker will pull the PostgreSQL and Spring Boot images (if our machine does not have it before).The services can be run on the background with command:
```bash
   docker compose up -d
```

#### Stop the System
Stopping all the running containers is also simple with a single command:
  
```bash
   docker compose down
```
   
If you need to stop and remove all containers, networks, and all images used by any service in docker-compose.yml file, use the command:
  
```bash
   docker compose down --rmi all
```
      
        
### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### License

Nest is [MIT licensed](LICENSE).