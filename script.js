
const date = new Date();
const day = date.getDate();
const month = date.getMonth()+1;
const year = date.getFullYear();

let inputDay = document.getElementById('input-day');
let inputMonth = document.getElementById('input-month');
let inputYear = document.getElementById('input-year');

let valueDay = document.getElementById('input-day').value;
let valueMonth = document.getElementById('input-month').value;
let valueYear = document.getElementById('input-year').value;

let resultDay = document.getElementById('result-day');
let resultMonth = document.getElementById('result-month');
let resultYear = document.getElementById('result-year');

let labelDay = document.getElementById('day');
let labelMonth = document.getElementById('month');
let labelYear = document.getElementById('year');

let wrongDay = document.getElementById('wrong-day');
let wrongMonth = document.getElementById('wrong-month');
let wrongYear = document.getElementById('wrong-year');

const months = {
    '': 31,
    1: 31,
    '01': 31,
    2: 28,
    '02': 28,
    3: 31,
    '03': 31,
    4: 30,
    '04': 30, 
    5: 31,
    '05': 31,
    6: 30,
    '06': 30, 
    7: 31,
    '07': 31,
    8: 31,
    '08': 31,
    9: 30,
    '09': 30, 
    10: 31,
    '10': 31,
    11: 30,
    '11': 30, 
    12: 31,
    '12': 31
}


if(year%4==0){
    months[2] = 29;
}

const form = document.getElementById("birthday");
form.addEventListener('input', calculateDate);


function calculateDate(event){

    let inputTarget = event.target.id;
    let value = event.target.value;
    let allInputsFilled = true;

    // alterando as variaveis de valor dos inputs
    switch (inputTarget) {
        case 'input-day':
            valueDay = value;
            if(valueDay > months[valueMonth] || valueDay > 31){

                error(wrongDay, labelDay, inputDay)
                allInputsFilled = false;
            } else {
                wrongDay.style.display = 'none';
                labelDay.style.color = null;
                inputDay.style.border = null;
            }
            if(valueMonth > 12 || valueYear > year){
                allInputsFilled = false
            }
        break;
        case 'input-month':
            valueMonth = value;
            if(valueMonth > 12 || valueDay > months[valueMonth] ){
                error(wrongMonth, labelMonth, inputMonth)
                allInputsFilled = false;
            } else {
                wrongMonth.style.display = 'none';
                labelMonth.style.color = null;
                inputMonth.style.border = null;
            }
            if(valueDay > 31 || valueYear > year){
                allInputsFilled = false
            }
        break;    
        case 'input-year':
            valueYear = value;
            if(valueYear > year){
                error(wrongYear, labelYear, inputYear)
                allInputsFilled = false;
            }else {
                wrongYear.style.display = 'none';
                labelYear.style.color = null;
                inputYear.style.border = null;
            }
            if(valueDay > 31 || valueMonth > 12){
                allInputsFilled = false
            }
        break;    
    }


    if(valueDay && valueMonth && valueYear && allInputsFilled){
        wrongDay.style.display = 'none';
        labelDay.style.color = null;
        inputDay.style.border = null;

        wrongMonth.style.display = 'none';
        labelMonth.style.color = null;
        inputMonth.style.border = null;

        wrongYear.style.display = 'none';
        labelYear.style.color = null;
        inputYear.style.border = null;

        switch (allInputsFilled) {

            // Dia e Mês menor
            case valueDay < day && valueMonth < month :
                resultDay.innerHTML = day - valueDay;
                resultMonth.innerHTML = month - valueMonth;
                resultYear.innerHTML = year - valueYear;
                break;

            // Dia menor e Mês maior
            case valueDay < day && valueMonth > month:
                resultDay.innerHTML = day - valueDay;
                resultMonth.innerHTML = 12 - (valueMonth - month);
                if (valueYear == year){
                    resultYear.innerHTML = year - valueYear;
                } else{
                    resultYear.innerHTML = (year - valueYear) - 1;
                }
                break;

            // Dia maior e Mês menor
            case valueDay > day && valueMonth < month:
                resultDay.innerHTML = months[month] - (valueDay - day);
                resultMonth.innerHTML = (month - valueMonth) - 1;
                resultYear.innerHTML = year - valueYear;
                break;

            // Dia maior e Mês igual ao mês atual
            case valueDay > day && valueMonth == month:
                resultDay.innerHTML = months[month] - (valueDay - day);
                resultMonth.innerHTML = 11;
                resultYear.innerHTML = (year - valueYear) - 1;
                break;

            // Dia e Mês maior
            case valueDay > day && valueMonth > month:
                resultDay.innerHTML = months[month] - (valueDay - day);
                resultMonth.innerHTML = 12 - (valueMonth - month) -1;
                if (valueYear == year){
                    resultYear.innerHTML = year - valueYear;
                } else{
                    resultYear.innerHTML = (year - valueYear) - 1;
                }
                break;
            

            case valueDay == day:
                resultDay.innerHTML = 0;
                if(valueMonth < month){
                    resultMonth.innerHTML = month - valueMonth;
                    resultYear.innerHTML = year - valueYear;
                } else if (valueMonth > month) {
                    resultMonth.innerHTML = 12 - (valueMonth - month);
                    resultYear.innerHTML = (year - valueYear) - 1;
                } else {
                    resultMonth.innerHTML = 0;
                    resultYear.innerHTML = year - valueYear;
                }
                break;
            
            case valueMonth == month:
                resultMonth.innerHTML = 0;
                if (valueDay < day) {
                    resultDay.innerHTML = day - valueDay;
                    resultYear.innerHTML = year - valueYear;
                } else if(valueDay > day){
                    resultDay.innerHTML = months[month] - (valueDay - day);
                    resultYear.innerHTML = year - valueYear;
                } else {
                    resultDay.innerHTML = 0;
                    resultYear.innerHTML = year - valueYear;
                }
            
        }

        if(resultDay.innerHTML == 1 || resultDay.innerHTML == 0){
            resultDay.nextElementSibling.innerHTML = 'dia';
        }else {
            resultDay.nextElementSibling.innerHTML = 'dias';
        }
        if(resultMonth.innerHTML == 1 || resultMonth.innerHTML == 0){
            resultMonth.nextElementSibling.innerHTML = 'mês'
        }else {
            resultMonth.nextElementSibling.innerHTML = 'meses'
        }
        if(resultYear.innerHTML == 1 || resultYear.innerHTML == 0){
            resultYear.nextElementSibling.innerHTML = 'ano'
        } else {
            resultYear.nextElementSibling.innerHTML = 'anos'
        }

    } else {
        resultDay.nextElementSibling.innerHTML = 'dias';
        resultMonth.nextElementSibling.innerHTML = 'meses'
        resultYear.nextElementSibling.innerHTML = 'anos'
        resultDay.innerHTML = '- -';
        resultMonth.innerHTML = '- -';
        resultYear.innerHTML = '- -';
    }

  
}


function resetInput(inputData, inputResult) {
    const input = document.getElementById(inputData);
    const result = document.getElementById(inputResult);
    if (input.value == '') {
        result.innerHTML = '- -'
    }
}


function error(messageWrong, labelWrong, inputWrong){
    messageWrong.style.display = 'block'
    labelWrong.style.color = 'hsl(0, 100%, 67%)'
    inputWrong.style.border = '1px solid hsl(0, 100%, 67%)'

}

