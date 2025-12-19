import { useState } from 'react'
import { useTheme, themes, Theme } from './themes'
import { blocks, BlockType } from './blocks'
import { sampleData } from './data/samples'
import { samplePage } from './data/samplePage'
import { ErrorBoundary } from './components/ErrorBoundary'
import { PageRenderer } from './page'

type ViewMode = 'block' | 'page'

export default function App() {
  const { theme, setTheme } = useTheme()
  const [view, setView] = useState<ViewMode>('block')
  const [currentBlock, setCurrentBlock] = useState<BlockType>('text')
  const [configs, setConfigs] = useState(sampleData.configs)
  const [data, setData] = useState(sampleData.data)

  const BlockComponent = blocks[currentBlock]
  const currentConfig = configs[currentBlock]
  const currentData = data[currentBlock]

  const handleDataChange = (newData: unknown) => {
    setData(prev => ({ ...prev, [currentBlock]: newData }))
  }

  const handleConfigChange = (newConfig: unknown) => {
    setConfigs(prev => ({ ...prev, [currentBlock]: newConfig }))
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="h-14 border-b border-border bg-card glass-card flex items-center justify-between px-4">
        <h1 className="text-lg font-semibold text-text-main">Syllo Lab</h1>
        <div className="flex items-center gap-4">
          {/* View Tab */}
          <div className="flex bg-element rounded p-0.5">
            <button
              onClick={() => setView('block')}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                view === 'block'
                  ? 'bg-card text-text-main shadow-sm'
                  : 'text-text-muted hover:text-text-main'
              }`}
            >
              Block
            </button>
            <button
              onClick={() => setView('page')}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                view === 'page'
                  ? 'bg-card text-text-main shadow-sm'
                  : 'text-text-muted hover:text-text-main'
              }`}
            >
              Page
            </button>
          </div>
          {/* Theme Select */}
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as Theme)}
            className="px-3 py-1.5 bg-element text-text-main border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {themes.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {view === 'block' ? (
          <>
            {/* Sidebar - Block Navigation */}
            <aside className="w-48 border-r border-border bg-card glass-card p-4">
              <div className="text-xs font-medium text-text-muted uppercase tracking-wide mb-3">
                Blocks
              </div>
              <nav className="space-y-1">
                {(Object.keys(blocks) as BlockType[]).map((blockType) => (
                  <button
                    key={blockType}
                    onClick={() => setCurrentBlock(blockType)}
                    className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                      currentBlock === blockType
                        ? 'bg-accent text-text-on-accent'
                        : 'text-text-main hover:bg-element'
                    }`}
                  >
                    {blockType.charAt(0).toUpperCase() + blockType.slice(1)}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Main Content - Block Preview */}
            <main className="flex-1 p-6 overflow-auto">
              <div className="max-w-4xl mx-auto">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-text-main">
                    {currentBlock.charAt(0).toUpperCase() + currentBlock.slice(1)} Block
                  </h2>
                  <p className="text-sm text-text-muted mt-1">
                    Preview and edit the {currentBlock} block
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg shadow-card p-6 glass-card">
                  <ErrorBoundary key={currentBlock}>
                    <BlockComponent
                      config={currentConfig}
                      data={currentData}
                      onDataChange={handleDataChange}
                      onConfigChange={handleConfigChange}
                    />
                  </ErrorBoundary>
                </div>
              </div>
            </main>

            {/* Right Panel - Config & JSON */}
            <aside className="w-80 border-l border-border bg-card glass-card flex flex-col">
              {/* Config Panel */}
              <div className="flex-1 p-4 border-b border-border overflow-auto">
                <div className="text-xs font-medium text-text-muted uppercase tracking-wide mb-3">
                  Config
                </div>
                <div className="space-y-3">
                  {Object.entries(currentConfig as unknown as Record<string, unknown>).map(([key, value]) => (
                    <label key={key} className="flex items-center justify-between">
                      <span className="text-sm text-text-main">{key}</span>
                      {typeof value === 'boolean' ? (
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => handleConfigChange({
                            ...currentConfig as object,
                            [key]: e.target.checked
                          })}
                          className="w-4 h-4 accent-accent"
                        />
                      ) : (
                        <input
                          type="text"
                          value={String(value)}
                          onChange={(e) => handleConfigChange({
                            ...currentConfig as object,
                            [key]: e.target.value
                          })}
                          className="w-32 px-2 py-1 text-sm bg-element border border-border rounded"
                        />
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* JSON Viewer */}
              <div className="flex-1 p-4 overflow-auto">
                <div className="text-xs font-medium text-text-muted uppercase tracking-wide mb-3">
                  JSON
                </div>
                <pre className="text-xs bg-element p-3 rounded overflow-auto max-h-64 text-text-main font-mono">
                  {JSON.stringify({ config: currentConfig, data: currentData }, null, 2)}
                </pre>
              </div>
            </aside>
          </>
        ) : (
          /* Page Preview - Full Width */
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-text-main">Page Preview</h2>
                <p className="text-sm text-text-muted mt-1">
                  Multi-block layout with 12-column grid
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg shadow-card p-6 glass-card">
                <PageRenderer schema={samplePage} />
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  )
}
