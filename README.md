# Todo Micro-Frontend with Docker

A full-stack Todo List application built using **Vue 3** for the frontend, **Node.js/Express** for the backend, and **PostgreSQL** for the database. This project is fully containerized using **Docker** and can be run locally or via Docker Hub images.

---

## Features

* Add, delete, update, and mark todos as done.
* Persistent storage with PostgreSQL.
* Micro-frontend architecture for easy scalability.
* Fully containerized: frontend, backend, and database run in separate containers.
* API-based communication between frontend and backend.
* Supports Docker volume for data persistence.

---

## Technologies

* **Frontend:** Vue 3, Pinia, Element Plus, Vite
* **Backend:** Node.js, Express, pg (PostgreSQL client)
* **Database:** PostgreSQL 16
* **Containerization:** Docker, Docker Compose

---

## Prerequisites

* Docker & Docker Compose installed
* Optional: Docker Hub account to pull images

---

## Getting Started Locally

1. Clone the repository:

```bash
git clone <your-github-repo-url>
cd todo_docker
```

2. Create a `.env` file with the following variables:

```env
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_DB
```

3. Build and start the containers:

```bash
docker compose up -d --build
```

4. Check running containers:

```bash
docker ps
```

5. Access the frontend in your browser:

```
http://localhost:5173
```

6. Access the backend API:

```
http://localhost:3000/todos
```

---

## Using Docker Hub Images

1. Pull all prebuilt images:

```bash
docker compose pull
```

2. Start containers:

```bash
docker compose up -d
```

3. Environment variables are still required via `.env`.

---

## Folder Structure

```
todo_docker/
│
├─ todo_backend/                 # Node.js backend
│   ├─ index.js                  # Express server
│   ├─ package.json
│   └─ ...
│
├─ todo_microfrontend_vue/       # Vue 3 frontend
│   ├─ src/
│   ├─ package.json
│   └─ ...
│
├─ pgdata/                       # Postgres data (ignored in Git)
├─ docker-compose.yml
└─ .env
```

---

## Docker Compose Services

* **todo-postgres:** PostgreSQL database with volume for persistence.
* **todo-backend:** Node.js backend API connecting to PostgreSQL.
* **todo-frontend:** Vue 3 frontend consuming backend API.

---

## Notes

* Do **not commit** `pgdata/`, `logs/`, `node_modules/`, or `.env` to GitHub.
* Data persists across container restarts via Docker volume.

---

## License

MIT License
