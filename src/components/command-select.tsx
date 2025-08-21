import { ReactNode, useState } from 'react'
import { Button } from './ui/button'
import { ChevronsUpDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from './ui/command'

interface Props {
  options: Array<{
    id: string
    value: string
    children: ReactNode
  }>
  onSelect: (value: string) => void
  onSearch?: (value: string) => void
  value: string
  placeHolder?: string
  isSearchable?: boolean
  classname?: string
}

const CommandSelect = ({
  options,
  onSelect,
  onSearch,
  placeHolder = 'Select an option',
  value,
  classname,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isSearchable,
}: Props) => {
  const [open, setOpen] = useState(false)

  const selectedOption = options.find((option) => option.value === value)

  const handleClose = (value: boolean) => {
    onSearch?.('')
    setOpen(value)
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        type="button"
        className={cn(
          'h-9 justify-between font-normal px-2',
          !selectedOption && 'text-muted-foreground',
          classname
        )}
      >
        <div>{selectedOption?.children ?? placeHolder}</div>
        <ChevronsUpDownIcon />
      </Button>
      <CommandResponsiveDialog
        shouldFilter={!onSearch}
        open={open}
        onOpenChange={handleClose}
      >
        <CommandInput placeholder="Search.." onValueChange={onSearch} />
        <CommandList>
          <CommandEmpty>
            <span className="text-sm text-muted-foreground">
              No options found!
            </span>
          </CommandEmpty>
          {options.map((option) => (
            <CommandItem
              key={option.id}
              onSelect={() => {
                onSelect(option.value)
                setOpen(false)
              }}
            >
              {option.children}
            </CommandItem>
          ))}
        </CommandList>
      </CommandResponsiveDialog>
    </>
  )
}

export default CommandSelect
