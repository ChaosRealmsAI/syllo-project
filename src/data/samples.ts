import type {
  TextConfig, TextData,
  TaskConfig, TaskData,
  KanbanConfig, KanbanData,
  TableConfig, TableData,
  CalendarConfig, CalendarData,
} from '../blocks/types'

export const sampleData = {
  configs: {
    text: {
      showHeading: true,
      showQuote: true,
    } as TextConfig,

    task: {
      showPriority: true,
      showDueDate: true,
      showTags: true,
    } as TaskConfig,

    kanban: {
      showCardTags: true,
      showCardId: true,
    } as KanbanConfig,

    table: {
      showStatus: true,
      striped: false,
    } as TableConfig,

    calendar: {
      showEvents: true,
      startOnMonday: true,
    } as CalendarConfig,
  },

  data: {
    text: {
      heading: 'Project Alpha',
      content: 'An exploration into modular design systems. This document outlines the core principles needed to build the next generation of our interface.',
      quote: 'Simplicity is the ultimate sophistication.',
    } as TextData,

    task: {
      items: [
        { id: '1', title: 'Complete product design doc', done: true },
        { id: '2', title: 'API Interface Development', done: false, priority: 'P0', dueDate: 'Tomorrow' },
        { id: '3', title: 'User Testing Recruitment', done: false, priority: 'P1', tags: ['Marketing'] },
        { id: '4', title: 'Prepare Weekly PPT', done: false },
      ],
    } as TaskData,

    kanban: {
      columns: [
        {
          id: 'todo',
          title: 'Todo',
          cards: [
            { id: '101', title: 'Research competitors', tag: 'Research', tagColor: '#fbbf24' },
            { id: '102', title: 'Draft wireframes', tag: 'Design', tagColor: '#a78bfa' },
            { id: '103', title: 'Buy domain' },
          ],
        },
        {
          id: 'progress',
          title: 'In Progress',
          cards: [
            { id: '201', title: 'Frontend Setup', tag: 'Dev', tagColor: '#34d399' },
            { id: '202', title: 'Auth flow' },
          ],
        },
        {
          id: 'done',
          title: 'Done',
          cards: [
            { id: '301', title: 'Kickoff Meeting' },
          ],
        },
      ],
    } as KanbanData,

    table: {
      headers: ['Name', 'Status', 'Priority', 'Owner'],
      rows: [
        { id: '1', name: 'Homepage Redesign', status: 'Active', statusColor: '#34d399', priority: 'Medium', owner: '@sarah' },
        { id: '2', name: 'Q4 Roadmap', status: 'Review', statusColor: '#fbbf24', priority: 'High', owner: '@mike' },
        { id: '3', name: 'Dark Mode Fix', status: 'Blocked', statusColor: '#f87171', priority: 'Critical', owner: '@alex' },
        { id: '4', name: 'Analytics', status: 'Draft', statusColor: '#9ca3af', priority: 'Low', owner: '@david' },
        { id: '5', name: 'Mobile Nav', status: 'Active', statusColor: '#34d399', priority: 'Medium', owner: '@sarah' },
      ],
    } as TableData,

    calendar: {
      year: 2025,
      month: 11, // December (0-indexed)
      today: 19,
      events: [
        { date: 3 },
        { date: 12, color: '#34d399' },
        { date: 15 },
        { date: 23 },
        { date: 25, color: '#f87171' },
      ],
    } as CalendarData,
  },
}
