# JOBCommunity

JOBCommunity is a platform that allows users to create professional profiles and share ideas with others.

Try out the [Demo](https://jobcommunity.herokuapp.com/).

You can test using the following account:

**Email**: leonbeckenbauer@teleworm.us

**Password**: 123123


![](https://repository-images.githubusercontent.com/265103375/1e20f380-9954-11ea-9b94-7600c03c019a)

It provides the following features:

- Security
  - Login
  - Forgotten password
  - Change/Update password
- Profiles
  - View user profile
  - Contact user via email or whatsapp
  - Add experience
  - Add education
  - Social network
  - Delete profile
- Community
  - Create new posts
  - Add comments
  - Like post
  - Delete posts
  - Delete comments

It uses RESTful architecture and React, Node.js and MongoDB technologies. In addition, it can also run on Docker.

The API is developed with the following libraries:

- Node.js
- Express.js framework
- Protected endpoints with JWT
- Validation data
- Send Mail
- Gravatar

The APP (web frontent) is developed with the following libraries:

- React
- Redux and Redux Thunk
- Bootstrap and Reactstrap
- Sass
- Routes with react-router-dom

The Docker container is composed of 2 services, web server and database, both are easily executed and configured via docker-compose.

# Requirements

JOBCommunity has a few system requirements. All of these requirements are provided by [Docker Compose](https://docs.docker.com/compose/install/).

However, if not using Docker Compose, make sure [Node.js](https://docs.docker.com/compose/install/) version 10.18 and [mongoDB](https://docs.mongodb.com/manual/installation/) database version 3.6 or later are installed.

# Setting up the environment

The following parameters need to be configured before installation: database, project name and description, email configuration, meta tags and messages by profile contact.

All parameters can be found on the `.env` file in the root directory. Details about the parameters can be found in the section below:

## Parameter

REACT_APP_URL

> URL Domain from JOBCommunity website \
> Default value: http://localhost:3000/

REACT_APP_TITLE_WEBSITE

> **Default value**: JOBCommunity - A social network for developers \
> Browser title of the website

REACT_APP_NAME

> **Default value**: JOBCommunity \
> Title shown on Home page

REACT_APP_DESCRIPTION

> **Default value**: Job Community is a freelancing platform that connects professionals and businesses. \
> Description shown on Home page

REACT_APP_MESSAGE_SUBJECT

> **Default value**: Contact via JOBommunity \
> Default title text used on Send me a Message option

REACT_APP_MESSAGE_BODY

> **Default value**: Hi [NAME], I found your contact on http://localhost:3000/profile/[HANDLE], would you be interested in chatting? Thanks \
> Default body text used on Send me a Message option. [NAME] and [HANDLE] are automatically replaced by name and slug of the user.

JWT_SECRET

> **Default value**: mysecrettoken \
> Token about JWT security

EMAIL_HOST

> **Default value**: smtp.mailtrap.io \
> SMTP of your Email

EMAIL_PORT

> **Default value**: 2525 \
> Port of your Email

EMAIL_USER

> **Default value**: 092741c67512f5 \
> Your Email

EMAIL_PASS

> **Default value**: XXXXXX \
> Password of your Email

MONGO_URI

> **Default value**: mongodb://db:27017/web \
> Connection string

If you wish to use the Email sent in the development environment, you can create an account on https://mailtrap.io/ and update the configurations provided by default.

Mailtrap is a development SMTP service for testing, view and share emails sent from development and staging environments.

# How to install

## Download using Git

Clone the project from github. Change **myproject** to your project name.

```
git clone https://github.com/mateusgamba/jobcommunity.git ./myproject
```

## Download using manual download ZIP

1. Download
2. Uncompress to your desired directory

## Install

There are 2 ways to install JOBCommunity, via Docker-Compose or Node.js + mongoDB. Please, check out the two options below:

### Installing via Docker-Composer

Docker-compose must be installed. Access JOBCommunity directory and run the following command in your terminal:

```
docker-compose up -d
```

and access http://localhost:3000

### Installing via Node.js and mongoDB

[Node.js](https://docs.docker.com/compose/install/) and [mongoDB](https://docs.mongodb.com/manual/installation/) must be installed and setup locally. Do not forget to create a database in mongoDB.

Access JOBCommunity directory and run the following in your terminal:

```
cd jobcommmunity
npm install
npm --prefix client install
npm run dev
```

and access http://localhost:3000

# Configuration

See below how to configure the following parameters: Favicon, Logo, Images, Email and Content (About, Privacy Policy, Terms and Conditions).

## Favicon

The favicon can be updated by replacing the icon in the `client/public` folder.

## Logo header, background home and profile background images

It is possible to change logo header, background home and profile background images by replacing the `client/src/img` folder.

## Email

JOBCommunity has the ability to send forgotten password email and the contact form. The email templates are developed in HTML and can be updated in the following path:

Contact form: \
`views/email/contact.handlebars`

Forgotten Password: \
`views/email/forgetPassword.handlebars`

The email configuration must be updated with the correct data, and for this access the `.env` file and change the host, port, user and password values.

If you wish to use the E-mail sent in the development environment, you can create an account on https://mailtrap.io/ and update the configurations provided by default.

Mailtrap is a development SMTP service for testing, view and share emails sent from development and staging environments.

## About, Terms and Conditions and Privacy Policy pages

The pages must be updated directly in the source code.

**About** = client/src/components/content/About.js\
**Terms and Conditions** = client/src/components/content/TermsConditions.js\
**Privacy Policy** = client/src/components/content/PrivacyPolicy.js

# Publishing

In this part of publication the name for publication will be **myproject** instead of JOBCommunity. But you can feel free to use whatever you like.

## Database

You can create your own mongoDB cloud database free through the [mongoDB Atlas](https://account.mongodb.com/account/register) platform. Please, check out in [Atlas docs](https://docs.atlas.mongodb.com/getting-started/).

In summary follow the instructions below:

- [Create an Atlas Account.](https://docs.atlas.mongodb.com/tutorial/create-atlas-account/)
- [Deploy a Free Tier Cluster.](https://docs.atlas.mongodb.com/tutorial/deploy-free-tier-cluster/)
- [Add Your Connection IP Address to Your IP Access List.](https://docs.atlas.mongodb.com/security/add-ip-address-to-list/)
- [Create a Database User for Your Cluster.](https://docs.atlas.mongodb.com/tutorial/create-mongodb-user-for-cluster/)
- [Connect to Your Cluster.](https://docs.atlas.mongodb.com/tutorial/connect-to-your-cluster/#connect-to-your-atlas-cluster) _(until step 4)_

You must use the Connection String provided in step 4 from `Connect to Your Cluster` instruction.

Connection string sample:
```
mongodb+srv://<dbuser>:<dbpassword>@jobcommunity.tts4a.mongodb.net/jobcommunity?retryWrites=true&w=majority
```

## Web

You will need to create a [Heroku](https://www.heroku.com/) account and install the [heroku-cli](https://devcenter.heroku.com/articles/heroku-cli).

After installing heroku-cli, run the following commands in terminal:

```
heroku login
```

Enter your Email and Password.

The second step is to create your free App:

```
heroku create myproject
```

After creating heruko App, it should return the following instruction:

`https://myproject.herokuapp.com/ | https://git.heroku.com/myproject.git`

The environment variables need to be added to the App, you can use the following commands:

> Please, check the variables before adding them. For more information access the documentation.

```
heroku config:set MONGO_URI="mongodb+srv://[add database user]:[add database password]@jobcommunity.tts4a.mongodb.net/jobcommunity?retryWrites=true&w=majority"
heroku config:set JWT_SECRET="mysecrettoken"
heroku config:set EMAIL_HOST="smtp.yourdomain.io"
heroku config:set EMAIL_PORT="465"
heroku config:set EMAIL_USER="name@yourdomain.io"
heroku config:set EMAIL_PASS="[add your password here]"
heroku config:set REACT_APP_URL="https://myproject.herokuapp.com/"
heroku config:set REACT_APP_TITLE_WEBSITE="MyProject - A social network for developers"
heroku config:set REACT_APP_NAME="MyProject"
heroku config:set REACT_APP_DESCRIPTION="MyProject is a freelancing platform that connects professionals and businesses."
heroku config:set REACT_APP_MESSAGE_SUBJECT="Contact via MyProject"
heroku config:set REACT_APP_MESSAGE_BODY="Hi [NAME], I found your contact on https://myproject.herokuapp.com/profile/[HANDLE], would you be interested in chatting\? Thanks"
```

To deploy run the following command:

```
git push heroku master
```

To open your project execute:

```
heroku open
```

All done. If you need anything else, please email me and I will do my best to help.

# Author

You can contact me directly on my Email (mateusgamba@gmail.com) or via Linkedin (https://www.linkedin.com/in/mateusgamba/).

Kind regards.