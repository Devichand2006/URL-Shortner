# URL Shortener

A web-based URL Shortener built using Python, Flask, and MySQL that converts long URLs into compact, shareable links.

## Features

- Converts long URLs into short, shareable links.
- Generates unique short codes for URLs.
- Redirects users to the original URL using the shortened link.
- Stores URL mappings in a MySQL database.
- Provides backend APIs for URL creation, retrieval, and redirection.
- Includes a web interface built with HTML, CSS, and JavaScript.

## Tech Stack

- **Python** – Backend programming
- **Flask** – Web framework and API development
- **MySQL** – Database for storing URL mappings
- **HTML** – Web page structure
- **CSS** – Styling
- **JavaScript** – Frontend interactivity

## How It Works

1. The user enters a long URL.
2. The Flask backend generates a unique short code.
3. The original URL and short code are stored in MySQL.
4. The application generates a shortened URL.
5. When the shortened URL is accessed, the user is redirected to the original URL.

## Project Structure

```text
URL-Shortener/
├── app.py
├── templates/
│   └── index.html
├── static/
│   ├── style.css
│   └── script.js
├── requirements.txt
├── .gitignore
└── README.md
```

*Note: Update the structure to match your actual project files.*

## Prerequisites

- Python 3.x
- MySQL Server
- pip

## Installation and Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd URL-Shortener
```

### 2. Create a Virtual Environment

```bash
python -m venv venv
```

Activate the environment:

**Windows**

```bash
venv\Scripts\activate
```

**Linux/macOS**

```bash
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure the Database

- Start your MySQL server.
- Create a database for the application.
- Create the required table for storing original URLs and short codes.
- Configure the database connection in your Flask application.

### 5. Run the Application

```bash
python app.py
```

Open the local URL displayed in your terminal, usually:

```text
http://127.0.0.1:5000/
```

## API Functionality

| Functionality | Description |
|---|---|
| URL Creation | Generates a short link from a long URL. |
| URL Retrieval | Retrieves the original URL using a short code. |
| URL Redirection | Redirects users to the original URL. |

## Future Enhancements

- Add URL validation and improved error handling.
- Implement click tracking and URL analytics.
- Support custom short codes.
- Add user authentication.
- Deploy the application online.

## Author

**Your Name**

