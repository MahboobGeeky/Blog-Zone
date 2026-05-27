# Blog Zone

A modern blog app built with React + Vite, Appwrite, and Tailwind CSS.
Users can authenticate, create rich-text posts with featured images, browse posts, and manage their own content.

## Features

- Email/password authentication with Appwrite
- Protected routes for creating and editing posts
- Rich text editor (TinyMCE) for post content
- Featured image upload via Appwrite Storage
- Author-only edit/delete controls on post detail page
- Responsive card-based UI with active-route navbar highlighting
- Post byline support (`By: username`) when creator name is available

## Tech Stack

- React 19 + Vite 8
- React Router DOM 7
- Redux Toolkit + React Redux
- React Hook Form
- Tailwind CSS 4
- TinyMCE (`@tinymce/tinymce-react`)
- Appwrite (Auth, TablesDB, Storage)

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Create your env file:

```bash
cp .env.sample .env
```

3. Add your Appwrite values to `.env`:

- `VITE_APPWRITE_URL`
- `VITE_APPWRITE_PROJECT_ID`
- `VITE_APPWRITE_DATABASE_ID`
- `VITE_APPWRITE_COLLECTION_ID`
- `VITE_APPWRITE_BUCKET_ID`

4. Start dev server:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
```

## Appwrite Requirements

Create a posts table with at least these fields:

- `title` (string)
- `content` (string)
- `featuredImage` (string)
- `status` (string: `active` / `inactive`)
- `userId` (string)

Create a storage bucket for images and enable proper read/update/delete permissions.

## Scripts

- `npm run dev` - start development server
- `npm run build` - create production build
- `npm run preview` - preview production build
- `npm run lint` - run eslint

## Main Routes

- `/` - Home (active posts)
- `/login` - Login (guest)
- `/signup` - Signup (guest)
- `/all-posts` - All posts (authenticated)
- `/add-post` - Create post (authenticated)
- `/edit-post/:slug` - Edit post (authenticated)
- `/post/:slug` - Post details

## Notes

- Environment values are read in `src/conf/conf.js`.
- Appwrite integration lives in `src/appwrite/auth.js` and `src/appwrite/config.js`.
- Authentication state is managed in `src/store/authSlice.js`.
- Byline shows a real name when present in post/user data; otherwise it falls back to `Unknown`.

## License

This project is for educational and learning use.
