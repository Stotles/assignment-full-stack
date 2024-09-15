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


## Improvements if had more time to work on the project

* Improve the table UI design by truncating description to agreed word count and add a link like **Read more** at the end if description content exceeds agreed word count.On click of **Read more** link we can display the full description in pop up window which is currently shown when clicked on title and we can remove this behaviour from title hyperlink

* Improve layout of client aplication to standard folder structures by creating following folders to store relevant files
  - **assets** -  To store images
  - **styles** -  To store global styles
  - **components** - To store reusubale components like Button, Drop down, Accordion
  - **features** -  To store applications feature specific react implementation
  - **pages** - To store page layout
  - **services** - To store implementaion of classes to integrate with back end services
  - **utils** - To store common utility functions
