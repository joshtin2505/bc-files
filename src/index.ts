import fs from "fs"
import path from "path"
import type { CreateFileProps, CreateFolderProps } from "./types.d"

/**
 * Creates one or more folders in the file system.
 *
 * @param {CreateFolderProps} props - Properties for the folder creation.
 * @param {string | string[]} props.folder - Name of the folder or an array of folder names to create.
 * @returns {Promise<void>} A promise that resolves when the folders have been created.
 */
async function createFolder({ folder }: CreateFolderProps): Promise<void> {
  if (folder instanceof Array) {
    for (const f of folder) {
      await createFolder({ folder: f })
    }
    return
  }
  const folderPath = path.join(process.cwd(), folder)
  if (fs.existsSync(folderPath)) {
    console.log(`The folder already exists:  ${folderPath}`)
    return
  }

  try {
    fs.mkdir(folderPath, { recursive: true }, (err) => {
      if (err) {
        console.error(`Error creating the folder: ${folderPath}`, err)
      } else {
        console.log(`Folder created:: ${folderPath}`)
      }
    })
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== "EEXIST") {
      console.error(`Error creating the folder: ${folderPath}`, err)
    } else {
      console.log(`he folder already exists: ${folderPath}`)
    }
  }
}

/**
 * Creates one or more files in the file system.
 *
 * @param {CreateFileProps} props - Properties for the file creation.
 * @param {string} props.fileName - Name of the file to create.
 * @param {string} props.relativePath - Relative path from the current directory where the file will be created.
 * @param {string} [props.content] - File content (optional).
 * @param {string} [props.extension] - File extension (optional).
 * @returns {Promise<void>} A promise that resolves when the files have been created.
 */
async function createFile(props: CreateFileProps): Promise<void> {
  if (props instanceof Array) {
    for (const p of props) {
      await createFile(p)
    }
    return
  }

  const { fileName, relativePath, content, extension } = props

  if (fileName === "") {
    console.error("No file name provided")
    return
  }
  const filePathRelative = path.join(process.cwd(), relativePath)
  if (!fs.existsSync(filePathRelative)) {
    console.error(`The path does not exist: ${filePathRelative}`)
    return
  } else if (!fs.lstatSync(filePathRelative).isDirectory()) {
    console.error(`The path is not a folder: ${filePathRelative}`)
    return
  }
  const fileFullName = extension ? `${fileName}.${extension}` : fileName
  const fullFilePath = path.join(filePathRelative, fileFullName)
  fs.writeFile(fullFilePath, content ?? "", (err) => {
    if (err) {
      console.error(`Error creating the file: ${fullFilePath}`, err)
    } else {
      console.log(`File created: ${fullFilePath}`)
    }
  })
}

export { createFolder, createFile }
