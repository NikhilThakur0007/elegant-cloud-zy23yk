import React, { useState } from "react";
import PropTypes from "prop-types";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { addDays, subDays, isBefore, isAfter } from "date-fns";

const Calendar = ({ onChange }) => {
  const today = new Date(); // Get today's date
  const minSelectableDate = subDays(today, 30); // 30 days before today
  const maxSelectableDate = addDays(today, 30); // 30 days after today

  const [state, setState] = useState([
    {
      startDate: today, // Start with today's date
      endDate: today, // End with today's date
      key: "selection"
    }
  ]);

  const handleOnChange = (ranges) => {
    const { selection } = ranges;
    let { startDate, endDate } = selection;

    // Ensure startDate is within the allowed range
    if (isBefore(startDate, minSelectableDate)) {
      startDate = minSelectableDate;
    } else if (isAfter(startDate, maxSelectableDate)) {
      startDate = maxSelectableDate;
    }

    // Ensure endDate is within 30 days of startDate
    const newMaxEndDate = addDays(startDate, 30);
    if (isAfter(endDate, newMaxEndDate)) {
      endDate = newMaxEndDate;
    }

    const updatedSelection = { startDate, endDate, key: "selection" };

    setState([updatedSelection]);
    onChange(updatedSelection);
  };

  return (
    <>
      <p>sss</p>
      <DateRangePicker
        onChange={handleOnChange}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={state}
        direction="horizontal"
        minDate={minSelectableDate} // Disable dates before 30 days from today
        maxDate={maxSelectableDate} // Disable dates after 30 days from today
      />
    </>
  );
};

Calendar.propTypes = {
  onChange: PropTypes.func
};

export default Calendar;
