import React, { useRef, useState } from 'react';
import './css/app.css';
import { IconArrow } from './img/icon-arrow';

function App() {
  const inputDay = useRef();
  const inputMonth = useRef();
  const inputYear = useRef();
  const [errorDay, setErrorD] = useState("");
  const [errorMoth, setErrorM] = useState("");
  const [errorYear, setErrorY] = useState("");
  const [dayText, setDayText] = useState("--");
  const [monthText, setMonthText] = useState("--");
  const [yearText, setYearText] = useState("--");
  const [errorYearClass, setErrorYearClass] = useState("");
  const [errorMonthClass, setErrorMonthClass] = useState("");
  const [errorDayClass, setErrorDayClass] = useState("");

  function calcularEdad(fechaNacimiento) {
    var hoy = new Date();
    var fechaNac = new Date(fechaNacimiento);
    var edad = hoy.getFullYear() - fechaNac.getFullYear();
    var mes = hoy.getMonth() - fechaNac.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
      mes += 12;
    }

    var dia = hoy.getDate() - fechaNac.getDate();

    if (dia < 0) {
      mes--;
      var ultimoDiaMesAnterior = new Date(hoy.getFullYear(), hoy.getMonth(), 0).getDate();
      dia = ultimoDiaMesAnterior + dia;
    }

    return {
      años: edad,
      meses: mes,
      dias: dia,
      fechaNac: fechaNac,
      currentDate: hoy
    };
  }

  function setAge(age) {
    setErrorD("");
    setErrorM("");
    setErrorY("");
    setErrorDayClass("");
    setErrorMonthClass("");
    setErrorYearClass("");

    const ageObject = calcularEdad(age);
    const day = inputDay.current.value;
    const month = inputMonth.current.value;
    const year = inputYear.current.value;
    let returnBoolean = false;

    if (isNaN(ageObject.fechaNac) || year < 0 || day.length !== 2 || month.length !== 2 || year.length !== 4) {
      setErrorD("Must be a valid Date");
      returnBoolean = true;
      setErrorDayClass("InputError");
      setErrorMonthClass("InputError");
      setErrorYearClass("InputError");
    }
    if (day === "") {
      setErrorDayClass("InputError");
      setErrorD("This field is required");
      returnBoolean = true;
    }
    if (month === "") {
      setErrorMonthClass("InputError");
      setErrorM("This field is required");
      returnBoolean = true;
    }
    if (year === "") {
      setErrorYearClass("InputError");
      setErrorY("This field is required");
      returnBoolean = true;
    }
    if (returnBoolean) {
      return;
    }

    setYearText(ageObject.años);
    setMonthText(ageObject.meses);
    setDayText(ageObject.dias);
  }

  return (
    <div id="ageCalculatorContainer">
      <header>
        <div id="dayInput" className={errorDayClass}>
          <p>DAY</p>
          <input ref={inputDay} type="number" placeholder='DD' />
          <p className='errorText'>{errorDay}</p>
        </div>
        <div id="monthInput" className={errorMonthClass}>
          <p>MONTH</p>
          <input ref={inputMonth} type="number" placeholder='MM' />
          <p className='errorText'>{errorMoth}</p>
        </div>
        <div id="yearInput" className={errorYearClass}>
          <p>YEAR</p>
          <input ref={inputYear} type="number" placeholder='YYYY' />
          <p className='errorText'>{errorYear}</p>
        </div>
      </header>

      <div id="arrowInput" onClick={() => { setAge(`${inputYear.current.value}-${inputMonth.current.value}-${inputDay.current.value}`) }}>
        <hr />
        <div>
          <IconArrow />
        </div>
      </div>

      <div id="infoContainer">
        <h2><span>{yearText}</span> years</h2>
        <h2><span>{monthText}</span> months</h2>
        <h2><span>{dayText}</span> days</h2>
      </div>
    </div>
  );
}

export default App;
