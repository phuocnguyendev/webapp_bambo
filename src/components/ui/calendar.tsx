import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import React from "react";
import DatePicker, { type DatePickerProps } from "react-datepicker";
import styled from "styled-components";

import "react-datepicker/dist/react-datepicker.css";
import "./calendar.scss";

const CalenderGroup = styled.div`
  .react-datepicker-wrapper {
    .react-datepicker__input-container {
      .react-datepicker__close-icon {
        right: 2.5rem;

        &::after {
          background-color: var(--muted-foreground);
          padding: 0px 0px 1px 1px;
        }
      }
    }
  }
`;

const Calendar = React.forwardRef<
  React.ElementRef<typeof DatePicker>,
  DatePickerProps
>(({ className, ...props }, ref) => {
  return (
    <CalenderGroup className="w-full relative">
      <DatePicker
        ref={ref}
        {...props}
        className={cn("form-control", className)}
        wrapperClassName="w-full"
        autoComplete="off"
        portalId="root-portal"
      />
      {/* add indicatior separator */}
      <span className="absolute right-9 top-1/2 transform -translate-y-1/2 h-5 w-px bg-input" />
      <CalendarIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-input opacity-80" />
    </CalenderGroup>
  );
});

Calendar.displayName = "Calendar";

export { Calendar };
