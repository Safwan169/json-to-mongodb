# ecoweb-atlas-import

Import **all your JSON files into MongoDB at one time.**

Works with MongoDB Atlas, local MongoDB, or anything you open in MongoDB Compass.

## Why I made this

In Compass or Atlas you can import only **1 JSON file at a time**.
If you have many files, you must do it again and again. That takes a lot of time.

This script imports **every JSON file in a folder with one command.**

## How it works

- It reads every `.json` file in your folder.
- Each file becomes a collection with the same name.
  Example: `users.json` → `users` collection.
- `_id` and dates stay correct (they are not turned into plain text).
- Empty files still create an empty collection.
- All data goes into the `ecoweb` database.
- At the end it makes `users.email` unique.

## How to use

**1. Install**

```bash
npm install
```

**2. Make a `.env` file**

Copy `.env.example` to `.env` and fill in your details:

```
MONGODB_URI=your MongoDB connection string
JSON_DIR=the folder where your JSON files are
```

- Atlas connection string: go to **Connect → Drivers** and copy it.
- Local MongoDB: use `mongodb://localhost:27017`

**3. Run**

```bash
npm run import
```

You will see something like this:

```
users: 120 docs
products: 342 docs
Done
```

Now open Atlas or Compass and you will see all your collections.

## Good to know

- Each JSON file must be a list of documents: `[ {...}, {...} ]`.
  Files exported from Compass already look like this.
- Run it on an **empty database**. If you run it twice, you get "duplicate key" errors.
  Delete the old collections first if you want to import again.
- Want a different database name? Change `'ecoweb'` in `import.js`.
- Your data has no `users` collection? Remove the `createIndex` line in `import.js`.
- **Never share your `.env` file.** It has your password. It is already in `.gitignore`, so git will skip it.
