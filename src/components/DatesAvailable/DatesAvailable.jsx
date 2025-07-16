import React, { useRef, useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "./DatesAvailable.css";
import SquareRoundedIcon from "@mui/icons-material/SquareRounded";
import { Button } from "../Button/Button";
import { useSelector } from "react-redux";

export const DatesAvailable = ({ datesAvailable, duration, onRetry, phoneEnterprise, selectedDay, setSelectedDay, peopleCount, setPeopleCount }) => {

  const [selectedDate, setSelectedDate] = useState(null);
  const [dateRange, setDateRange] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedDay?.date) {
      const startDate = new Date(selectedDay?.date)
      const days = calculateDuration(duration)
      const endDate = new Date(startDate)
      endDate.setDate(startDate.getDate() + days - 1)

      setSelectedDate({ dateStr: selectedDay.date, spots: selectedDay.spots })
      setDateRange([startDate, endDate])
    }

  }, [selectedDay, duration])


  const flatpickrRef = useRef(null);
  const datesMap = {};
  const enabledDates = [];

  datesAvailable.forEach(({ date, spots }) => {
    datesMap[date] = spots;
    if (spots > 0) enabledDates.push(date);
  });

  const formatFullDateEs = (date) => {
    return new Intl.DateTimeFormat("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const calculateDuration = (duration) => {
    if (!duration) return 1;

    // Caso: "3 días / 2 noches"
    if (duration.includes("día")) {
      const match = duration.match(/(\d+)\s*d[ií]a/);
      return match ? parseInt(match[1]) : 1;
    }

    // Caso: "4 h" u otras duraciones en horas
    if (duration.includes("h")) return 1;

    // Por defecto, un día
    return 1;
  };

  const handleRetry = () => {
    if (onRetry) onRetry();
    setIsLoading(true);
    setIsEmpty(false);

    setTimeout(() => {
      setIsLoading(false);
      if (datesAvailable.length === 0) {
        setIsEmpty(true);
      }
    }, 800);
  };

  const handlePeopleQuantity = (action) => {
    if (action === "sum") {
      if (selectedDate && peopleCount < selectedDate.spots) {
        setPeopleCount(prev => prev + 1);
      } else if (peopleCount === selectedDate.spots) {
        return
      }
    } else if (action === "res") {
      setPeopleCount(prev => (prev > 1 ? prev - 1 : 1));
    }
  }



  return (
    <section className="dateAvailableSection">
      <h3 className="titleCalendar">Elegí una fecha de salida</h3>
      <div className="container">

        {isLoading ? (
          <div className="retryLoadDatesContainer">
            <p className="loadingMessageDatesAvailable">Cargando fechas...</p>
          </div>
        ) : datesAvailable.length > 0 ? (
          <div className="containerCalendars">
            <div className="calendarBlock">
              <Flatpickr
                ref={flatpickrRef}
                options={{
                  inline: true,
                  dateFormat: "Y-m-d",
                  enable: enabledDates,
                  minDate: "today",
                  defaultDate: selectedDay?.date || null,
                  onReady: function (_selectedDates, _dateStr, fp) {
                    fp.set(
                      "onDayCreate",
                      function (_dObj, _dStr, _fp, dayElem) {
                        const date = dayElem.dateObj
                          .toISOString()
                          .split("T")[0];
                        const spots = datesMap[date];
                        const today = new Date();
                        const isPast = dayElem.dateObj < new Date(today.setHours(0, 0, 0, 0));

                        if (isPast) {
                          dayElem.classList.add("past-date");
                        } else if (spots !== undefined) {
                          if (spots === 0) {
                            dayElem.classList.add("no-spots");
                          } else if (spots <= 5) {
                            dayElem.classList.add("few-spots");
                          } else {
                            dayElem.classList.add("many-spots");
                          }
                          dayElem.setAttribute("title", `Cupos disponibles: ${spots}`);
                        }

                      }
                    );
                  },
                }}
                onChange={(selectedDates) => {
                  if (selectedDates.length > 0) {
                    const startDate = selectedDates[0];
                    const days = calculateDuration(duration);
                    const endDate = new Date(startDate);
                    endDate.setDate(startDate.getDate() + days - 1);

                    const dateStr = startDate.toISOString().split("T")[0];

                    const selectedDateObj = datesAvailable.find(d => d.date === dateStr);

                    const spots = datesMap[dateStr];
                    setSelectedDate({ dateStr, spots });
                    setSelectedDay(selectedDateObj);
                    setDateRange([startDate, endDate]);
                    (selectedDate)
                  }
                }}
              />
            </div>

            <div className="calendarBlock calendar-disabled">


                <Flatpickr
                  options={{
                    inline: true,
                    dateFormat: "Y-m-d",
                    defaultDate: dateRange,
                    minDate: "today",
                    mode: "range",
                    clickOpens: false,
                    allowInput: false,
                  }}
                />
              
              <div className="calendarOverlay"></div>
            </div>
          </div>
        ) : (
          <div className="retryLoadDatesContainer">
            {onRetry && isEmpty ? (
              <>
                <p>No se encontraron fechas disponibles.</p>
                <p>Itentelo de nuevo más tarde.</p>
                <p>Para más información comuniquese con la empresa.</p>
                <p>{phoneEnterprise}</p>
              </>
            ) : (
              <>
                <p className="errorMessageDatesAvailable">
                  Hubo un problema al cargar las fechas disponibles
                </p>
              </>
            )}
            <Button
              text="Reintentar"
              onClick={handleRetry}
              className="retryLoadDatesAvBtn"
            />
          </div>
        )}
        {datesAvailable.length > 0 && (
          <div className="calendarLegend">
            <span className="legendItem">
              <SquareRoundedIcon
                style={{ fontSize: "2rem" }}
                className="many-spots-item"
              />{" "}
              Disponible
            </span>
            <span className="legendItem few-spots">
              <SquareRoundedIcon
                style={{ fontSize: "2rem" }}
                className="few-spots-item"
              />{" "}
              Quedan pocos cupos
            </span>
            <span className="legendItem no-spots">
              <SquareRoundedIcon
                style={{ fontSize: "2rem" }}
                className="no-spots-item"
              />{" "}
              Sin disponibilidad
            </span>
            <span className="legendItem past-date">
              <SquareRoundedIcon
                style={{ fontSize: "2rem" }}
                className="past-date-item"
              />{" "}
              Fecha pasada
            </span>
          </div>
        )}
      </div>
      <div>

        {selectedDate && (
          <>
            <div className="selectQuantityPeopleContainer">
              <h4>Seleccione la cantidad de personas</h4>
              <button onClick={() => handlePeopleQuantity("res")}>-</button>
              <p>{peopleCount}</p>
              <button onClick={() => handlePeopleQuantity("sum")}>+</button>
            </div>
            <p className="selectedDayInfoTextCalendar">
              Elegiste el <strong>{selectedDate.dateStr}</strong>
            </p>
            <p>
              Cupos disponibles: <strong>{selectedDate.spots}</strong>
            </p>
          </>
        )}
        <>
          <p>
            <strong></strong>
          </p>
          <p>
            <strong>El paquete tiene una duracion de: {duration}</strong>
          </p>
        </>
      </div>
    </section>
  );
};
