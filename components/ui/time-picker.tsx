"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface TimePickerProps {
  value?: string;
  onChange?: (time: string) => void;
  className?: string;
}

export function TimePicker({ value, onChange, className }: TimePickerProps) {
  const [selectedHour, setSelectedHour] = React.useState<number>(
    value ? parseInt(value.split(":")[0]) : 9,
  );
  const [selectedMinute, setSelectedMinute] = React.useState<number>(
    value ? parseInt(value.split(":")[1]) : 0,
  );

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  const handleTimeSelect = (hour: number, minute: number) => {
    setSelectedHour(hour);
    setSelectedMinute(minute);
    const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
    onChange?.(timeString);
  };

  const displayTime = value
    ? `${value.split(":")[0].padStart(2, "0")}:${value.split(":")[1].padStart(2, "0")}`
    : null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className,
          )}
        >
          <Clock className="mr-2 h-4 w-4" />
          {displayTime ? displayTime : <span>Pick a time</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex">
          {/* Hours */}
          <div className="border-r">
            <div className="px-3 py-2 text-sm font-semibold border-b bg-muted w-20 text-center">
              Hour
            </div>
            <div className="h-[200px] w-20 overflow-y-auto">
              {hours.map((hour) => (
                <button
                  key={hour}
                  onClick={() => handleTimeSelect(hour, selectedMinute)}
                  className={cn(
                    "w-full px-4 py-2 text-sm hover:bg-accent text-center",
                    selectedHour === hour &&
                      "bg-primary text-primary-foreground hover:bg-primary",
                  )}
                >
                  {hour.toString().padStart(2, "0")}
                </button>
              ))}
            </div>
          </div>

          {/* Minutes */}
          <div>
            <div className="px-3 py-2 text-sm font-semibold border-b bg-muted w-20 text-center">
              Minute
            </div>
            <div className="h-[200px] w-20 overflow-y-auto">
              {minutes.map((minute) => (
                <button
                  key={minute}
                  onClick={() => handleTimeSelect(selectedHour, minute)}
                  className={cn(
                    "w-full px-4 py-2 text-sm hover:bg-accent text-center",
                    selectedMinute === minute &&
                      "bg-primary text-primary-foreground hover:bg-primary",
                  )}
                >
                  {minute.toString().padStart(2, "0")}
                </button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
