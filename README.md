# ChatApp-with-Flask-SQLite-HTML-CSS-JS

## **Table of Contents**

- [Introduction](#introduction)
- [What is Flask?](#what-is-flask)
- [Project Overview](#project-overview)
- [Installation](#installation)
- [Usage Code](#usage)

## **Introduction**

This Flask-based chat application is being developed with SQLite database integration, utilizing HTML, CSS, and JS. It's a work in progress and aims to be an evolving web chat application.

## **What is Flask?**

Flask is a Python-based web application development framework. Known for its minimalist and flexible nature, it's used for creating web applications and APIs. While providing core functionality, it accommodates various needs through an extensive extension system. It offers basic features like routing, handling HTTP requests, template support, and is often preferred for quickly prototyping or developing mid-sized projects.

## **Project Overview**

The folders in the project are as follows:

- **instance**: Holds the database.
- **static**: Contains CSS and JavaScript codes along with various icons and images.
- **templates**: Stores HTML code necessary for deploying the Flask application.

> ### **app.py**

The file contains route codes provided by the Flask framework. When the site is deployed, the route directions within the app.py file operate based on actions on the site, directing the flow of the site accordingly.

> ### **config.py**

The config.py file contains necessary configurations for both the database and email verification processes. SMTP is utilized as the mail service in these settings.

> ### **models.py**

The models.py file contains the codes for databases associated with the application. There are three different database codes within the file, namely User, Room, and Participants. The application utilizes three databases, and these are used via SQLite.

## **Installation**

To get started with this project, follow these steps:

1.  Clone this repository to your local machine using Git:

         git clone https://github.com/ahmetdzdrr/ChatApp-with-Flask-SQLite-HTML-CSS-JS.git

2.  Install the required Python libraries by running:

          pip install -r requirements.txt

## **Usage Code**

To run the project, follow these steps:

Open your terminal or command prompt.

Navigate to the directory where the project files are located.

Enter the following command:

```bash
python app.py
```
