# CLAUDE.md — My Coffee Journal

## Overview

A coffee journaling app. Flask (Python 3.9) backend + React 18 / Vite frontend. SQLite in dev, PostgreSQL in production. Session-based auth with CSRF protection.

## Project Structure

```
app/                        # Flask backend
  __init__.py               # App init, CORS, CSRF, blueprint registration
  config.py                 # Flask config (reads from env vars)
  models/
    db.py                   # SQLAlchemy instance
    user.py                 # User model
    coffee.py               # Coffee, FlavorNote, CoffeeFlavorNote models
    brew.py                 # Brew model
    recipe.py               # Recipe model
  routes/
    __init__.py             # Registers blueprints under /api
    users.py                # Auth: register, login, logout
    coffees.py              # CRUD /api/coffees/
    brews.py                # CRUD /api/brews/
    recipes.py              # CRUD /api/recipes/
  utils/
    auth.py                 # @login_required decorator
    request.py              # camelToSnake, formatRequest helpers

react-vite/                 # React frontend
  src/
    App.jsx                 # Router (React Router v6)
    components/             # Shared UI: Auth, Navigation, DeleteModalWrap, Range, ProgressBar, If
    context/
      Store.jsx             # StoreProvider — coffees[], brews{}, recipe state
      Modal.jsx             # ModalProvider — portal-based modal system
    features/
      coffees/              # CoffeeList, CoffeeListItem, CoffeeForm, ColorPicker
      brews/                # BrewList, BrewListItem, BrewForm, BrewDetails, RecipeForm, StarRating
    utils/
      formatRequest.js      # camelCase -> snake_case for outgoing requests
      formatResponse.js     # snake_case -> camelCase for incoming responses
      dateFunctions.js      # Date formatting

migrations/                 # Alembic migration scripts
dist/                       # Vite build output (served by Flask in prod)
instance/dev.db             # SQLite dev database
```

## Running Locally

```bash
# Backend (port 8000)
pipenv run flask run

# Frontend (port 5173, proxies /api to backend)
cd react-vite && npm run dev

# Build frontend for production
cd react-vite && npm run build   # outputs to ../dist
```

## Environment

`.flaskenv`: FLASK_APP=app, FLASK_DEBUG=True, FLASK_RUN_PORT=8000
`.env`: SECRET_KEY, DATABASE_URL=sqlite:///dev.db, SCHEMA=my-coffee-journal

## API Routes

All routes under `/api`. Protected routes use `@login_required` (checks `session['user_id']`).

| Method | Route               | Description          |
|--------|---------------------|----------------------|
| POST   | /api/users/register | Register user        |
| POST   | /api/users/login    | Login                |
| GET    | /api/users/logout   | Logout               |
| GET    | /api/coffees/       | List user coffees    |
| POST   | /api/coffees/       | Create coffee        |
| PUT    | /api/coffees/:id    | Update coffee        |
| DELETE | /api/coffees/:id    | Delete coffee        |
| GET    | /api/brews/         | List user brews      |
| POST   | /api/brews/         | Create brew          |
| PUT    | /api/brews/:id      | Update brew          |
| DELETE | /api/brews/:id      | Delete brew          |
| GET    | /api/recipes/       | List user recipes    |
| POST   | /api/recipes/       | Create recipe        |

## Database Models

- **User**: id, username (unique), password (SHA256 hashed). Has many coffees, brews, recipes (cascade delete).
- **Coffee**: id, user_id, country, region, farm, varietal, process, roaster, roast_profile, color. Has many brews, many-to-many FlavorNotes via CoffeeFlavorNote.
- **Brew**: id, user_id, coffee_id, grinder, grind_size, dose, brewer, water_amt, water_temp, celsius, ratio (computed), recipe, notes, rating, date.
- **Recipe**: id, user_id, name, grinder, grind_size, dose, brewer, water_amt, water_temp, celsius, ratio (computed), details.

Migrations: `flask db upgrade` / `flask db downgrade`

## Frontend Architecture

- **State management**: React Context API (not Redux, despite redux being in deps).
  - `useStore()` — coffees array, brews object (normalized with `inOrder` array), recipe reducer, fetch methods.
  - `useModal()` — portal-based modal with `setModalContent()` / `closeModal()`.
- **Routing**: React Router v6. `/` = auth, `/coffees` = coffee list, `/brews` = brew list.
- **Session check**: Layout reads `validSession` cookie, redirects to `/` if expired.
- **API calls**: All include `credentials: 'include'`. Keys converted camelCase <-> snake_case automatically via utils.
- **Error format**: `{ errors: { field: "message" } }` — displayed inline in forms.

## Styling

- CSS variables for theming in `src/index.css`.
- Dark/light mode via `prefers-color-scheme` media query.
- Color scale: `--primary-100` through `--primary-900` (base #7D423C).
- Elevation levels: `--dp-00` through `--dp-24`.
- Font: Familjen Grotesk.

## Vite Config

- Dev server: `127.0.0.1:5173`, proxy `/api` to `http://127.0.0.1:8000`.
- Import aliases: `@` = src, `@components`, `@context`, `@brews`, `@coffees`, `@utils`, `@assets`.
- Build output: `../dist`.

## Conventions

- **Python**: snake_case for functions/variables/columns. PascalCase for models. Blueprints per resource. Models have `to_dict()` for serialization. Error responses use `{ "errors": {...} }` with appropriate status codes.
- **React**: Functional components with hooks only. Feature folders under `src/features/`. Shared components in `src/components/`. Local state for forms, context for app-wide data.
- **CSS**: kebab-case class names. CSS variables for colors/theming. Component-scoped CSS files alongside components.

## Deployment

Dockerfile builds with Python 3.12 Alpine, installs psycopg2, runs `flask db upgrade`, serves via `gunicorn -w 1 app:app` on port 8000. Flask serves the built frontend from `/dist`.
