// Base Block Props Interface
export interface BlockProps<C, D> {
  config: C
  data: D
  onDataChange?: (data: D) => void
  onConfigChange?: (config: C) => void
}

// Text Block
export interface TextConfig {
  showHeading: boolean
  showQuote: boolean
}

export interface TextData {
  heading: string
  content: string
  quote?: string
}

// Task Block
export interface TaskConfig {
  showPriority: boolean
  showDueDate: boolean
  showTags: boolean
}

export interface TaskItem {
  id: string
  title: string
  done: boolean
  priority?: 'P0' | 'P1' | 'P2'
  dueDate?: string
  tags?: string[]
}

export interface TaskData {
  items: TaskItem[]
}

// Kanban Block
export interface KanbanConfig {
  showCardTags: boolean
  showCardId: boolean
}

export interface KanbanCard {
  id: string
  title: string
  tag?: string
  tagColor?: string
}

export interface KanbanColumn {
  id: string
  title: string
  cards: KanbanCard[]
}

export interface KanbanData {
  columns: KanbanColumn[]
}

// Table Block
export interface TableConfig {
  showStatus: boolean
  striped: boolean
}

export interface TableRow {
  id: string
  name: string
  status: string
  statusColor: string
  priority: string
  owner: string
}

export interface TableData {
  headers: string[]
  rows: TableRow[]
}

// Calendar Block
export interface CalendarConfig {
  showEvents: boolean
  startOnMonday: boolean
}

export interface CalendarEvent {
  date: number
  color?: string
}

export interface CalendarData {
  year: number
  month: number
  events: CalendarEvent[]
  today: number
}
