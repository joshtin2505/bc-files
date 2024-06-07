import fs from "fs"
import path from "path"

// Función para crear una carpeta de manera asíncrona
async function createFolder(folderPath: string): Promise<void> {
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

// Función para crear un archivo con contenido por defecto de manera asíncrona
async function createFile(
  fileName: string | null,
  filePath: string,
  content: string
): Promise<void> {
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error(`Error al crear el archivo: ${filePath}`, err)
    } else {
      console.log(`Archivo creado: ${filePath}`)
    }
  })
}

// Función principal para crear carpetas y archivos
async function createFoldersWithFiles(
  folders: { name: string; extension: string; content: string }[]
): Promise<void> {
  for (const folder of folders) {
    const folderPath = path.join(process.cwd(), folder.name)
    await createFolder(folderPath)

    const filePath = path.join(folderPath, `default.${folder.extension}`)
    await createFile("", filePath, folder.content)
  }
}

// Ejemplo de uso
const folders = [
  {
    name: "carpeta1",
    extension: "txt",
    content: "Contenido por defecto para carpeta1",
  },
  {
    name: "carpeta2",
    extension: "md",
    content: "Contenido por defecto para carpeta2",
  },
  {
    name: "carpeta3",
    extension: "html",
    content: "<h1>Contenido por defecto para carpeta3</h1>",
  },
]

createFoldersWithFiles(folders)
