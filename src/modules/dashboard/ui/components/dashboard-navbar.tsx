'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'

import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from 'lucide-react'

import DashboardCommand from './Dashboard-command'

const DashboardNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar()

  const [commandOpen, setCommandOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => {
      document.removeEventListener('keydown', down)
    }
  }, [])

  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />

      <nav className="px-4 py-3 bg-background flex gap-x-2 items-center border-b">
        <Button className="size-9" variant="outline" onClick={toggleSidebar}>
          {state === 'expanded' || isMobile ? (
            <PanelLeftIcon className="size-4" />
          ) : (
            <PanelLeftCloseIcon className="size-4" />
          )}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-9 w-[240px] justify-start text-muted-foreground hover:text-muted-foreground rounded-2xl font-normal"
          onClick={() => setCommandOpen((open) => !open)}
        >
          <SearchIcon /> Search
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">&#8984;</span>K
          </kbd>
        </Button>
      </nav>
    </>
  )
}

export default DashboardNavbar
