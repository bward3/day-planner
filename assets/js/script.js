
var containerEl = $('.container');
var timeEl = $('#currentDay');
var time = moment();

var init = function () {
    timeEl.text(time.format('dddd, MMMM Do, YYYY'));


    for (i = 9; i < 17; i++) {
        var hour24 = i;
        var hour = (i % 13);
        var tod = 'AM'
        if (i >= 13) { hour = hour + 1; tod = 'PM' }
        var newRow = $('<div>');
        var newHour = $('<div>');
        newRow.addClass('row');
        newHour.text(hour + ' ' + tod);
        newHour.addClass('hour');
        var newBlock = $('<textarea>');
        var newBtn = $('<button>');
        newBtn.addClass('saveBtn');
        newBlock.addClass('time-block');
        newRow.append(newHour);
        newRow.append(newBlock);
        newRow.append(newBtn);
        containerEl.append(newRow);
        checkTOD(hour24, newBlock);
    }
}

var checkTOD = function (hour, blockEl) {
    console.log('hr24:',hour,'moment.hour():',time.hour());

    if (hour < time.hour()) {
        blockEl.addClass('past');
    } else if (hour === time.hour()) {
        blockEl.addClass('present');
    } else {
        blockEl.addClass('future');
    }
}

var saveBtnHandler = function (event) {
    var clicked = event.target;
}

init();