import fs from "fs"
import path from "path"
import type { CreateFileProps, CreateFolderProps } from "./types.d"

async function createFolder({ folder }: CreateFolderProps): Promise<void> {
  if (folder instanceof Array) {
    for (const f of folder) {
      await createFolder({ folder: f })
    }
    return
  }
  const folderPath = path.join(process.cwd(), folder)
  if (fs.existsSync(folderPath)) {
    console.log(`La carpeta ya existe: ${folderPath}`)
    return
  }

  try {
    fs.mkdir(folderPath, { recursive: true }, (err) => {
      if (err) {
        console.error(`Error al crear la carpeta: ${folderPath}`, err)
      } else {
        console.log(`Carpeta creada: ${folderPath}`)
      }
    })
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== "EEXIST") {
      console.error(`Error al crear la carpeta: ${folderPath}`, err)
    } else {
      console.log(`La carpeta ya existe: ${folderPath}`)
    }
  }
}

async function createFile(props: CreateFileProps): Promise<void> {
  if (props instanceof Array) {
    for (const p of props) {
      await createFile(p)
    }
    return
  }

  const { fileName, relativePath, content, extension } = props

  if (fileName === "") {
    console.error("No se ha proporcionado un nombre de archivo")
    return
  }
  const filePathRelative = path.join(process.cwd(), relativePath)
  if (!fs.existsSync(filePathRelative)) {
    console.error(`La ruta no existe: ${filePathRelative}`)
    return
  } else if (!fs.lstatSync(filePathRelative).isDirectory()) {
    console.error(`La ruta no es una carpeta: ${filePathRelative}`)
    return
  }
  const fileFullName = extension ? `${fileName}.${extension}` : fileName
  const fullFilePath = path.join(filePathRelative, fileFullName)
  fs.writeFile(fullFilePath, content ?? "", (err) => {
    if (err) {
      console.error(`Error al crear el archivo: ${fullFilePath}`, err)
    } else {
      console.log(`Archivo creado: ${fullFilePath}`)
    }
  })
}

export { createFolder, createFile }
