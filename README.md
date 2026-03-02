# TodoMaker — Dockerized Full-Stack Todo Application

> A beginner-friendly, production-ready Todo List application built with **Vue 3**, **Node.js/Express**, and **PostgreSQL** — all running inside **Docker containers**.

---

## What Is This Project?

This is a **full-stack web application** that lets users create, update, and delete todo items. What makes it special is how it's structured:

- The **frontend** (what you see in your browser) is completely separate from the **backend** (the logic that handles data).
- The **database** stores your todos permanently — even if you restart the app.
- Everything runs inside **Docker containers**, which means it works the same on *any* computer.

This architecture is called a **Micro-Frontend** — a modern design pattern where the UI is independently deployable from the server logic.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│ Your Browser │
│ http://localhost:5173 │
└──────────────────────┬──────────────────────────────────┘
 │ HTTP Requests (Vue 3 UI)
 ▼
┌─────────────────────────────────────────────────────────┐
│ todo-frontend (Docker Container) │
│ Vue 3 + Pinia + Element Plus + Vite │
└──────────────────────┬──────────────────────────────────┘
 │ REST API calls → /todos
 ▼
┌─────────────────────────────────────────────────────────┐
│ todo-backend (Docker Container) │
│ Node.js + Express + pg │
│ http://localhost:3000 │
└──────────────────────┬──────────────────────────────────┘
 │ SQL Queries
 ▼
┌─────────────────────────────────────────────────────────┐
│ todo-postgres (Docker Container) │
│ PostgreSQL 16 │
│ Data saved in Docker Volume (pgdata/) │
└─────────────────────────────────────────────────────────┘
```

### How the 3 layers talk to each other:
| Layer | Role | Technology |
|---|---|---|
| **Frontend** | Displays the UI, sends user actions to backend | Vue 3, Vite |
| **Backend** | Handles business logic, talks to database | Node.js, Express |
| **Database** | Stores and retrieves todo data permanently | PostgreSQL 16 |

---

## Key Concepts (for Non-Engineers)

| Term | What it means |
|---|---|
| **Docker** | A tool that packages your app and everything it needs into a "container" — like a shipping box that works anywhere |
| **Docker Compose** | A tool to run *multiple* containers together with one command |
| **Container** | An isolated, lightweight environment where your app runs — not dependent on your PC's settings |
| **Volume** | A way for Docker containers to save data permanently on your hard drive (so todos survive restarts) |
| **REST API** | A set of URLs the frontend calls to create/read/update/delete data on the backend |
| **Micro-Frontend** | An architecture where the UI app is independent and separately deployable from the server |
| **PostgreSQL** | A powerful, open-source relational database (like Excel, but for code) |
| **Pinia** | A state management library for Vue — keeps track of app data (like your todo list) in memory |
| **Vite** | A super-fast build tool that bundles and serves your Vue app |

---

## Features

- Add, update, delete, and mark todos as **done**
- **Persistent storage** — todos survive container restarts via Docker volume
- **API-driven** — frontend and backend communicate over HTTP
- **Fully containerized** — runs identically on any machine with Docker
- **Docker Hub ready** — pull prebuilt images without building locally

---

## Technologies Used

### Frontend
| Tool | Purpose |
|---|---|
| **Vue 3** | JavaScript framework for building the UI |
| **Pinia** | Manages the app's state (todo list data in memory) |
| **Element Plus** | Pre-built UI components (buttons, inputs, etc.) |
| **Vite** | Dev server and build tool — fast hot-reloads while coding |

### Backend
| Tool | Purpose |
|---|---|
| **Node.js** | JavaScript runtime — runs JS code on the server |
| **Express** | Web framework — defines API routes like `GET /todos` |
| **pg** | PostgreSQL client — lets Node.js talk to the database |

### Infrastructure
| Tool | Purpose |
|---|---|
| **PostgreSQL 16** | The database — stores todos in structured tables |
| **Docker** | Containerizes each service |
| **Docker Compose** | Orchestrates all 3 containers together |

---

## Folder Structure

```
todo_docker/
│
├── todo_backend/ # Node.js + Express API server
│ ├── index.js # Entry point — defines all API routes
│ ├── package.json # Lists Node.js dependencies
│ └── Dockerfile # Instructions to build backend container
│
├── todo_microfrontend_vue/ # Vue 3 frontend application
│ ├── src/ # Source code (components, store, views)
│ ├── package.json # Lists frontend dependencies
│ └── Dockerfile # Instructions to build frontend container
│
├── pgdata/ # PostgreSQL data (auto-generated, git-ignored)
├── docker-compose.yml # Defines all 3 services + networking
└── .env # Secret config variables (git-ignored)
```

---

## Docker Compose Services

```
docker-compose.yml defines 3 services:

 ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
 │ todo-postgres │◄───│ todo-backend │◄───│ todo-frontend │
 │ │ │ │ │ │
 │ PostgreSQL 16 │ │ Express API │ │ Vue 3 App │
 │ Port: 5432 │ │ Port: 3000 │ │ Port: 5173 │
 │ Volume: pgdata │ │ Waits for DB │ │ Waits for API │
 └─────────────────┘ └─────────────────┘ └─────────────────┘
```

| Service | Image | Port | Depends On |
|---|---|---|---|
| `todo-postgres` | `postgres:16` | 5432 | — |
| `todo-backend` | Custom / Docker Hub | 3000 | `todo-postgres` |
| `todo-frontend` | Custom / Docker Hub | 5173 | `todo-backend` |

---

## Getting Started

### Prerequisites

Before you start, make sure you have:
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed
- [Git](https://git-scm.com/) installed

> **New to Docker?** Think of it as installing an app that can run other apps in isolated boxes — no version conflicts, no "works on my machine" problems.

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/iamdebopriya/TodoMaker_Docker_Implementation
cd TodoMaker_Docker_Implementation
```

---

### Step 2 — Create Your `.env` File

In the root of the project, create a file named `.env`:

```env
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
POSTGRES_DB=tododb
POSTGRES_PORT=5432
```

> **Never commit this file to Git.** It contains sensitive credentials. It's already listed in `.gitignore`.

---

### Step 3 — Build and Start All Containers

```bash
docker compose up -d --build
```

| Flag | What it does |
|---|---|
| `up` | Starts all services defined in `docker-compose.yml` |
| `-d` | Runs in **detached mode** (runs in the background) |
| `--build` | Forces Docker to rebuild images from your local code |

---

### Step 4 — Verify Containers Are Running

```bash
docker ps
```

You should see 3 running containers: `todo-postgres`, `todo-backend`, `todo-frontend`.

---

### Step 5 — Open the App

| Service | URL |
|---|---|
| **Frontend (UI)** | http://localhost:5173 |
| **Backend API** | http://localhost:3000/todos |

---

## Using Prebuilt Docker Hub Images

If you don't want to build locally, pull the prebuilt images:

```bash
# Pull all images
docker compose pull

# Start containers
docker compose up -d
```

> You still need the `.env` file with your database credentials.

---

## API Reference

The backend exposes a REST API at `http://localhost:3000`:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/todos` | Fetch all todos |
| `POST` | `/todos` | Create a new todo |
| `PUT` | `/todos/:id` | Update a todo (e.g., mark as done) |
| `DELETE` | `/todos/:id` | Delete a todo |

---

## Data Flow (What Happens When You Add a Todo)

```
1. User types a todo and clicks "Add" in the browser
 ↓
2. Vue 3 frontend sends POST /todos to the backend
 ↓
3. Express backend receives the request, runs an INSERT SQL query
 ↓
4. PostgreSQL stores the new todo in the database
 ↓
5. Backend responds with the saved todo (JSON)
 ↓
6. Pinia store updates, Vue re-renders the todo list
```

---

## Important Notes

- **Do NOT commit** the following to GitHub:
 - `pgdata/` — contains your database files
 - `node_modules/` — auto-generated dependency folders
 - `.env` — contains your secret credentials
 - `logs/` — application log files

- **Data persistence:** Your todos are saved in a Docker volume (`pgdata/`). They survive container restarts but are stored only on your local machine.

- **Startup order matters:** Docker Compose starts `postgres` first, then `backend`, then `frontend`. If the backend starts before the DB is ready, it will retry automatically.

---

## License

This project is licensed under the **MIT License** — free to use, modify, and distribute.