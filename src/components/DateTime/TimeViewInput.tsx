import { forwardRef, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import MaskInputTime from './MaskInputTime';
import RdtPicker from './RdtPicker';

const TimeViewInput = forwardRef<React.ElementRef<typeof RdtPicker>, any>(
  (props: any, ref) => {
    const { position, value, maxDigitsHours, disabled, onChange } = props;
    const timeConstraints = {
      hours: {
        min: 0,
        max: 99,
        step: 1,
      },
      minutes: {
        min: 0,
        max: 59,
        step: 1,
      },
    };

    const [openCalendar, setOpenCalendar] = useState(false);

    // Initial values for hours and minutes: HH:mm
    const [inputValues, setInputValues] = useState({
      hours: 0,
      minutes: 0,
    });

    const [focusedEvents, setFocusedEvents] = useState({
      calendar: false,
    });

    // Generate a random string for the input reference

    const inputRef = useRef(
      `input-time_${Math.random().toString(36).substring(7)}__mask`,
    );

    useEffect(() => {
      if (value) {
        const [hours, minutes] = value.split(':');
        setInputValues({
          hours: parseInt(hours, 10),
          minutes: parseInt(minutes, 10),
        });
      }
    }, [value]);

    useEffect(() => {
      const handleClickOutside = (event: any) => {
        const outsideInput =
          openCalendar &&
          !event.target.closest('.rdtPicker') &&
          !event.target.closest(`.${inputRef.current}`);

        if (outsideInput) {
          setOpenCalendar(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [openCalendar, inputRef]);

    const handleFocusInput = () => {
      setOpenCalendar(true);
    };

    const handleBlurInput = () => {
      if (!focusedEvents.calendar) {
        setOpenCalendar(false);
      }
    };

    const handelChange = (nextTime: any) => {
      setInputValues(nextTime);

      const nextValue = `${renderValue(nextTime.hours)}:${renderValue(
        nextTime.minutes,
      )}`;

      onChange({
        target: {
          value: nextValue,
        },
      });
    };

    const increase = (type: keyof typeof inputValues) => {
      // check min max value with type and update inputValues
      let value = inputValues[type] + timeConstraints[type].step;

      if (value > timeConstraints[type].max) {
        value = timeConstraints[type].min;
      }

      handelChange({
        ...inputValues,
        [type]: value,
      });
    };

    const decrease = (type: keyof typeof inputValues) => {
      // check min max value with type and update inputValues
      let value = inputValues[type] - timeConstraints[type].step;

      if (value < timeConstraints[type].min) {
        value = timeConstraints[type].max;
      }

      handelChange({
        ...inputValues,
        [type]: value,
      });
    };

    const handleIncease = (
      e: React.MouseEvent<HTMLElement>,
      type: keyof typeof inputValues,
    ) => {
      e.preventDefault();
      increase(type);
    };

    const handleDecrease = (
      e: React.MouseEvent<HTMLElement>,
      type: keyof typeof inputValues,
    ) => {
      e.preventDefault();
      decrease(type);
    };

    const renderValue = (value: number) => {
      if (value < 10) {
        return `0${value}`;
      }

      return value;
    };

    return (
      <RdtPicker ref={ref} position={position}>
        <MaskInputTime
          value={value}
          disabled={disabled}
          onChange={onChange}
          refClassName={inputRef?.current}
          maxDigitsHours={maxDigitsHours}
          className={cn('rdtInput', { 'bg-muted border-0': disabled })}
          handleFocus={handleFocusInput}
          handleBlur={handleBlurInput}
        />

        <div className={cn('rdt', openCalendar && 'rdtOpen')}>
          <div
            className="rdtPicker"
            onMouseEnter={() => {
              setFocusedEvents({
                ...focusedEvents,
                calendar: true,
              });
            }}
            onMouseLeave={() => {
              setFocusedEvents({
                ...focusedEvents,
                calendar: false,
              });
            }}
          >
            <div className="rdtTime">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <div className="rdtCounters">
                        <div className="rdtCounter">
                          <button
                            className="rdtBtn"
                            onClick={(e: React.MouseEvent<HTMLElement>) => {
                              handleIncease(e, 'hours');
                            }}
                          >
                            ▲
                          </button>
                          <div className="rdtCount">
                            {renderValue(inputValues.hours)}
                          </div>
                          <button
                            className="rdtBtn"
                            onClick={(e: React.MouseEvent<HTMLElement>) => {
                              handleDecrease(e, 'hours');
                            }}
                          >
                            ▼
                          </button>
                        </div>
                        <div className="rdtCounterSeparator">:</div>
                        <div className="rdtCounter">
                          <button
                            className="rdtBtn"
                            onClick={(e: React.MouseEvent<HTMLElement>) => {
                              handleIncease(e, 'minutes');
                            }}
                          >
                            ▲
                          </button>

                          {/* Display format for minutes */}
                          <div className="rdtCount">
                            {renderValue(inputValues.minutes)}
                          </div>
                          <button
                            className="rdtBtn"
                            onClick={(e: React.MouseEvent<HTMLElement>) => {
                              handleDecrease(e, 'minutes');
                            }}
                          >
                            ▼
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </RdtPicker>
    );
  },
);

TimeViewInput.displayName = 'TimeViewInput';

export default TimeViewInput;
