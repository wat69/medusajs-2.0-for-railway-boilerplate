import * as React from 'react'

import { cn } from "@lib/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground placeholder:text-[#8C8C8C] selection:bg-primary selection:text-primary-foreground',
        'flex h-9 w-full min-w-0 rounded-md border border-[#010f1c] bg-[#FDFDFD] px-3 py-1 text-base shadow-xs transition-all outline-none',
        'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
        'hover:border-[#010f1c]',
        'focus-visible:border-[#010f1c] focus-visible:ring-[#010f1c]/50 focus-visible:ring-[0.5px]',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        'md:text-sm',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
