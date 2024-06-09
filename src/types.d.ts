type CreateFolderProps = { folder: string | string[] }
type CreateFileProps =
  | {
      fileName: `${string}.${string}` | string
      relativePath: string
      content?: string
      extension?: string
    }
  | {
      fileName: string
      relativePath: string
      content?: string
      extension: string
    }[]
export type { CreateFileProps, CreateFolderProps }
