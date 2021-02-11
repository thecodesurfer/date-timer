let timerID;

const divDate       = document.getElementById("date");

const counterDays   = document.getElementById("counter-days");
const counterHours  = document.getElementById("counter-hours");
const counterMins   = document.getElementById("counter-mins");
const counterSecs   = document.getElementById("counter-secs");

const btnClear      = document.getElementById("counter-clear");

function initializeCounter()
{
    const url = new URL(location.href);

    const targetDate =  url.searchParams.get('targetdate');

    if(targetDate)
    {
        const date = new Date(targetDate);

        divDate.innerHTML = moment(date).format('MMMM Do YYYY h:mm:ss a');

        timerID = setInterval(function() {

            const now = moment();
            const tmpDate = moment(date);
        
            const diffDays  = tmpDate.diff(now, 'days');
            const diffHours = tmpDate.subtract(diffDays, 'days').diff(now, 'hours');
            const diffMins  = tmpDate.subtract(diffHours, 'hours').diff(now, 'minutes');
            const diffSecs  = tmpDate.subtract(diffMins, 'minutes').diff(now, 'seconds');
        
            counterDays.innerHTML   = diffDays.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
            counterHours.innerHTML  = diffHours.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
            counterMins.innerHTML   = diffMins.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
            counterSecs.innerHTML   = diffSecs.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
        
        }, 1000);
    }
    else {
        clearInterval(timerID);

        const input = prompt('Target date (YYYY-MM-DD hh:mm:ss):');

        if(input) {
            // window.localStorage.setItem('targetDate', input);
            url.searchParams.set('targetdate', new Date(input).toISOString())
        }

        initializeCounter();
    }
}

initializeCounter();

btnClear.addEventListener('click', function() {
    initializeCounter();
})
