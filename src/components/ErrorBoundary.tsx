import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Block render error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded text-red-500">
          <div className="font-medium mb-1">Block Render Error</div>
          <div className="text-sm opacity-80">
            {this.state.error?.message || 'Unknown error'}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
