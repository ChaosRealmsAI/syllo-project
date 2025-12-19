import { PageSchema } from '../page/types'
import { sampleData } from './samples'

export const samplePage: PageSchema = {
  rows: [
    // Row 1: Text block (full width)
    {
      id: 'row-1',
      blocks: [
        {
          id: 'block-text',
          type: 'text',
          span: 12,
          config: sampleData.configs.text as unknown as Record<string, unknown>,
          data: sampleData.data.text as unknown as Record<string, unknown>,
        },
      ],
    },
    // Row 2: Task (half) + Calendar (half)
    {
      id: 'row-2',
      blocks: [
        {
          id: 'block-task',
          type: 'task',
          span: 6,
          config: sampleData.configs.task as unknown as Record<string, unknown>,
          data: sampleData.data.task as unknown as Record<string, unknown>,
        },
        {
          id: 'block-calendar',
          type: 'calendar',
          span: 6,
          config: sampleData.configs.calendar as unknown as Record<string, unknown>,
          data: sampleData.data.calendar as unknown as Record<string, unknown>,
        },
      ],
    },
    // Row 3: Kanban (2/3) + Table (1/3)
    {
      id: 'row-3',
      blocks: [
        {
          id: 'block-kanban',
          type: 'kanban',
          span: 8,
          config: sampleData.configs.kanban as unknown as Record<string, unknown>,
          data: sampleData.data.kanban as unknown as Record<string, unknown>,
        },
        {
          id: 'block-table',
          type: 'table',
          span: 4,
          config: sampleData.configs.table as unknown as Record<string, unknown>,
          data: sampleData.data.table as unknown as Record<string, unknown>,
        },
      ],
    },
  ],
}
