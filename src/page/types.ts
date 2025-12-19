import { BlockType } from '../blocks'

export interface BlockInstance {
  id: string
  type: BlockType
  span: number  // 1-12
  config: Record<string, unknown>
  data: Record<string, unknown>
}

export interface RowInstance {
  id: string
  blocks: BlockInstance[]
}

export interface PageSchema {
  rows: RowInstance[]
}
