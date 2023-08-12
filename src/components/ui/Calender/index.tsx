'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../../../../y/button';
import { Calendar } from '../../../../y/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../../../y/popover';

interface Props {
    date: Date;
    placeholderText: string;
    setDate: (Date: any) => void;
}

export function CustomCalendar({ date, placeholderText, setDate }: Props) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className={cn('w-[280px] justify-start text-left font-normal', !date && 'text-muted-foreground')}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>{placeholderText}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
        </Popover>
    );
}

