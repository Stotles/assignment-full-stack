# Stotles work sample assignment

## Getting started

This sample codebase consists of a separate client & server code.

It's set up in a simple way to make it as easy as possible to start making changes,
the only requirement is having recent versions of `node` & `npm` installed.

This is not a production ready configuration (nor production ready code),
it's only set up for easy development, including live reload.

To run the client bundler:

```
cd client
npm install
npm run dev
```

The processed code will be available at http://localhost:3001

To start the server:

```
cd server
npm install
npm run dev
```

The server will be available at http://localhost:3000 - the page is automatically configured
to use the assets served by vite on port 3001.

You should see something similar to this page:

![Search page](./screenshot.png)

### Disabling/Enabling TypeScript

If you prefer to completely disable TypeScript for a file, add `// @ts-nocheck` on the first line.
If on the other hand you'd like to enable strict type checking, modify `tsconfig.json` according to your needs.

Note that you can import plain JavaScript files that won't be fully typechecked.

### Browsing the database

You should start by looking at the migration in `./migrations` folder.
If you prefer to browse the DB using SQL, you can use the sqlite command line (just run `sqlite3 ./db.sqlite3`)
or any other SQL client that supports sqlite.

If for any reason the database becomes unusable, you can rebuild it using `./reset_db.sh` script`.

## The task

All the instructions are available [here](https://www.notion.so/stotles/Full-stack-software-engineer-work-sample-assignment-ae7c64e08f2a42a097d16cee4bc661fc).

# Implementations comments
Because this is a test with limited time, I was focus on acheiving the tash requirements, and only did minimal refactoring to facilitate my development.
the database queries can probably be improved in performance, and certainly can be writen to make use of sequelite to implement the where clause (I havent used it before, so I just used my SQL knowledge).
the buyers filter works for the current number of buyers, but it will need to be filtered and/or paginated once the number of buyers increases
the page layout could be improved (example the 2 filters could be inline on a desktop)
the currency of the project should be split into 2 fields (currency and frequency), this would allow the currency to be normalised, and to present the values with the symbol instead of the currency code.
each buyer should also have a currency default, and or a global currency default. (or just not allowing empty currencies).

