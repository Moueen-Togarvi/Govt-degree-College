# Govt Degree College App

SvelteKit frontend for the Govt Degree College website, with Neon/Postgres-backed API routes for dynamic content such as announcements, events, and results.

## Local setup

Install dependencies and start the app:

```sh
npm install
npm run dev
```

## Database setup

1. Create an env file inside `app/`:

```sh
cp .env.example .env
```

2. Add your Neon or Postgres connection string to `DATABASE_URL`.
   Also set an admin password for the content manager.

Example:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST/DBNAME?sslmode=require
ADMIN_PASSWORD=change-this-admin-password
```

3. Initialize the database schema and sample seed data:

```sh
npm run db:setup
```

If you only want tables without sample data:

```sh
npm run db:setup:schema-only
```

## Available scripts

```sh
npm run dev
npm run build
npm run preview
npm run check
npm run db:setup
npm run db:setup:schema-only
```

## API routes

- `GET /api/init-db` or `POST /api/init-db`: creates tables and seeds sample data
- `GET /api/announcements`: list announcements
- `POST /api/announcements`: create announcement
- `DELETE /api/announcements?id=1`: delete announcement
- `GET /api/events`: list upcoming events
- `GET /api/results?q=bs`: list or search exam results
- `GET /api/quick-links`: list homepage quick links

## Admin panel

- Visit `/admin/login`
- Login with the password from `ADMIN_PASSWORD`
- Admin dashboard supports create, edit, delete, and image/PDF upload for:
  announcements, events, exam results, quick links, and media files
