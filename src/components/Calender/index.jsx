import { useState } from "react";

import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay
} from "date-fns";

import './index.css'

const Calendar = ({tasksList, setTasksList, setActivePage}) => {

  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);

  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];

  let days = [];
  let day = startDate;

  while (day <= endDate) {

    for (let i = 0; i < 7; i++) {

      days.push(
        <div
          key={day}
          className={`calendar-cell ${
            !isSameMonth(day, monthStart)
              ? "disabled"
              : isSameDay(day, new Date())
              ? "today"
              : ""
          }`}
        >
          <p className="date-number">
        {format(day, "d")}
    </p>

    <div className="task-container">

        {tasksList
            .filter(task =>
                isSameDay(new Date(task.date), day)
            )
            .map(task => (

                <div
                    key={task.id}
                    className="calendar-task"
                >
                    {task.title}
                </div>

            ))
        }

    </div>
        </div>
      );

      day = addDays(day, 1);
    }

    rows.push(
      <div className="calendar-row" key={day}>
        {days}
      </div>
    );

    days = [];
  }

  return (
    <div className="calendar-container">

      <div className="calendar-header">

        <button onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
          Prev
        </button>

        <h2>{format(currentDate, "MMMM yyyy")}</h2>

        <button onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
          Next
        </button>

      </div>

      <div className="calendar-days">

        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(day => (
          <div key={day} className="calendar-day-name">
            {day}
          </div>
        ))}

      </div>

      <div>{rows}</div>

    </div>
  );
};

export default Calendar;