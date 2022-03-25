var containerEl = $('.container');
var timeEl = $('#currentDay');
var time = moment();
var ls = window.localStorage;

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
        newBtn.click(saveBtnHandler);
        newBtn.addClass('saveBtn');
        newBtn.html('<i class="fa-solid fa-floppy-disk"></i>');
        newBlock.addClass('time-block');
        newRow.append(newHour);
        newRow.append(newBlock);
        newRow.append(newBtn);
        containerEl.append(newRow);
        checkTOD(hour24, newBlock);
    }
    checkTodos();
}

var checkTOD = function (hour, blockEl) {
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
    var timeBlock = $(clicked).parent().children().eq(1);
    var index = timeBlock.parent().index();
    var text = timeBlock.val();
    ls.setItem(index, text);
}

var checkTodos = function () {
    var len = containerEl.children().length;
    for (i = 0; i < len; i++) {
        var text = ls.getItem(i.toString());
        if (text) {
            containerEl.children().eq(i).val(text);
        }
    }
}

init();