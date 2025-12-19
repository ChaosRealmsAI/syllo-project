import { TextBlock } from './TextBlock'
import { TaskBlock } from './TaskBlock'
import { KanbanBlock } from './KanbanBlock'
import { TableBlock } from './TableBlock'
import { CalendarBlock } from './CalendarBlock'

export type BlockType = 'text' | 'task' | 'kanban' | 'table' | 'calendar'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const blocks: Record<BlockType, React.ComponentType<any>> = {
  text: TextBlock,
  task: TaskBlock,
  kanban: KanbanBlock,
  table: TableBlock,
  calendar: CalendarBlock,
}

export * from './types'
export { TextBlock, TaskBlock, KanbanBlock, TableBlock, CalendarBlock }
