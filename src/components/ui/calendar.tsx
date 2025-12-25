
'use client';

import * as React from 'react';
import {ChevronLeft, ChevronRight, PawPrint} from 'lucide-react';
import {DayPicker, DropdownProps} from 'react-day-picker';
import {format, addMonths} from 'date-fns';

import {cn} from '@/lib/utils';
import {buttonVariants} from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import {ScrollArea} from './scroll-area';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = false,
  ...props
}: CalendarProps) {
  const currentYear = new Date().getFullYear();
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-4 bg-card rounded-2xl border border-primary/20 shadow-lg font-headline', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-lg font-bold text-primary',
        caption_dropdowns: 'flex gap-2',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({variant: 'outline'}),
          'h-8 w-8 bg-transparent p-0 opacity-70 hover:opacity-100 rounded-full hover:bg-accent/50'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex justify-center',
        head_cell:
          'text-muted-foreground rounded-md w-10 font-normal text-sm text-center',
        row: 'flex w-full mt-2',
        cell: 'h-10 w-10 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent/20 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day: cn(
          buttonVariants({variant: 'ghost'}),
          'h-10 w-10 p-0 font-normal aria-selected:opacity-100 rounded-full'
        ),
        day_selected:
          'bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
        day_today: 'bg-primary/20 text-primary-foreground',
        day_outside: 'text-muted-foreground opacity-50',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent/20 aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
        vhidden: "hidden",
        root: "w-full",
      }}
      components={{
        IconLeft: ({...props}) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({...props}) => <ChevronRight className="h-4 w-4" />,
        DayContent: (props) => {
          return (
            <div className="relative">
              {props.date.getDate()}
              {props.activeModifiers.selected && (
                <PawPrint className="absolute h-3 w-3 -bottom-1 -right-1 text-primary" />
              )}
            </div>
          );
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export {Calendar};
