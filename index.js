let _timerID;
let _targetDate = null;

const searchParams = new URLSearchParams(window.location.search);

const btnStartTimer = document.getElementById('btnStartTimer');
const btnClearTimer = document.getElementById('btnClearTimer');

const divWrapperCounterForm     = document.getElementById('wrapper-counter-form');
const divWrapperCounter         = document.getElementById('wrapper-counter');
const divCounterTargetDate      = document.getElementById('counter-targetdate');
const divCounterDays            = document.getElementById('counter-days');
const divCounterHours           = document.getElementById('counter-hours');
const divCounterMinutes         = document.getElementById('counter-minutes');
const divCounterSeconds         = document.getElementById('counter-seconds');

btnStartTimer.addEventListener('click', function() {

    const day       = document.getElementById('input-day').value;
    const month     = document.getElementById('input-month').value;
    const year      = document.getElementById('input-year').value;

    const targetDate = new Date(year, month - 1, day);

    if(isValidDate(targetDate)) {
        _targetDate = targetDate;
        _timerID = startTimer(targetDate)
        
        divWrapperCounterForm.classList.add('hide');
        divWrapperCounter.classList.remove('hide');
        divCounterTargetDate.innerHTML = moment(targetDate).format('MMMM Do YYYY');

        searchParams.set('targetdate', moment(targetDate).format('YYYY-MM-DD'))

        if(history.pushState) {
            const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + "?" +searchParams.toString();
            window.history.pushState({ path: newurl}, '', newurl);
        }
    }
})

btnClearTimer.addEventListener('click', function() {
    clearTimer(_timerID);

    divWrapperCounter.classList.add('hide');
    divWrapperCounterForm.classList.remove('hide');

    searchParams.delete('targetdate');

    if(history.pushState) {
        const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + searchParams.toString();
        window.history.pushState({ path: newurl}, '', newurl);
    }
})

function startTimer(date) {
    return setInterval(() => {
        
        const now = moment();
        const targetDate = moment(date);

        if(moment(now).isAfter(targetDate))
        {
            clearTimer(_timerID);
        }
        else
        {
            const diffDays      = targetDate.diff(now, 'days');
            const diffHours     = targetDate.subtract(diffDays, 'days').diff(now, 'hours');
            const diffMinutes   = targetDate.subtract(diffHours, 'hours').diff(now, 'minutes');
            const diffSeconds   = targetDate.subtract(diffMinutes, 'minutes').diff(now, 'seconds');

            divCounterDays.innerHTML        = diffDays.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
            divCounterHours.innerHTML       = diffHours.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
            divCounterMinutes.innerHTML     = diffMinutes.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
            divCounterSeconds.innerHTML     = diffSeconds.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
        }

    }, 1000);
}

function clearTimer(timerID) {
    _targetDate = null;
    clearInterval(timerID);

    divCounterDays.innerHTML        = "000";
    divCounterHours.innerHTML       = "00";
    divCounterMinutes.innerHTML     = "00";
    divCounterSeconds.innerHTML     = "00";
}

function initializeTimer() {
    const targetdateParam = searchParams.get('targetdate');

    if (targetdateParam)
    {
        const targetDate = new Date(targetdateParam);
        
        if(isValidDate(targetDate)) {
            divWrapperCounterForm.classList.add('hide');
            divWrapperCounter.classList.remove('hide');

            targetDate.setHours(00, 00, 00);

            divCounterTargetDate.innerHTML = moment(targetDate).format('MMMM Do YYYY');

            _timerID = startTimer(targetDate)
        }
    }
}

function isValidDate(date) {
    if(Object.prototype.toString.call(date) === '[object Date]'){
        if (!isNaN(date.getTime())) {
            return true;
        }
    }

    return false;
}

initializeTimer();