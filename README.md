# bcfiles

A bundle creator files

## Installation

```sh
npm install bcfiles
```
```sh
pnpm install bcfiles
```
## API

### `createFolder(props: CreateFolderProps): Promise<void>`

Creates one or more folders in the file system.

- `props`: Properties for the folder creation. It can be a single object or an array of objects. ```<- "props[]" or "props"```
  - `folder`: Name of the folder or an array of folder names to create. `string`

_Returns a promise that resolves when the folders have been created._

### `createFile(props: CreateFileProps): Promise<void>`

Creates one or more files in the file system.

- `props`:  Properties for the file creation. It can be a single object or an array of objects ```<- "props[]" or "props"```
  - `fileName`: Name of the file to create. `string`
  - `relativePath`: Relative path from the current directory where the file will be created. `string`
  - `content` (optional): File content. `string | undefined`
  - `extension`: File extension. `string`

_Returns a promise that resolves when the files have been created._

## Examples:

####  Create a folder
```js
  createFolder({ folder: "src" })
```
#### Create a file 
```js
  createFile({
            fileName: "app",
            relativePath: "src/",
            extension: "ts,
            content: "import express from 'express';"
        })
```

#### Create multiple folders and files
```js
const extension = "ts"

createFolder([
    { folder: "src/routes" },
    { folder: "src/controllers" },
    { folder: "src/middlewares" },
    { folder: "src/libs" },
    { folder: "src/schemas" }
]).then(() => {
    createFile([
        {
            fileName: "auth.routes",
            relativePath: "src/controllers",
            extension: extension,
            content: "// Auth routes"
        },
        {
            fileName: "auth.middleware",
            relativePath: "src/middlewares",
            extension: extension,
            content: "// Auth middleware"
        },
        {
            fileName: "db.connection",
            relativePath: "src/libs",
            extension: extension,
            content: "// DB connection"
        },
        {
            fileName: "user.schema",
            relativePath: "src/schemas",
            extension: extension,
            content: "// User schema"
        }
    ])
})

```
License
This project is licensed under the MIT License - see the [License](LICENSE) file for details.
