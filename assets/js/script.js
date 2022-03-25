//initialize variables for dynamically updating elements
//get current date

var containerEl = $('.container');
var timeEl = $('#currentDay');
var time = moment();
var ls = window.localStorage;

var init = function () {
    //add date to header
    timeEl.text(time.format('dddd, MMMM Do, YYYY'));

    //for all 8 hrs in work day, make a time slot
    for (i = 9; i < 17; i++) {
        var hour24 = i;
        var hour = (i % 13);
        var tod = 'AM'
        //change to afternoon
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
        //add icon to save buttons
        newBtn.html('<i class="fa-solid fa-floppy-disk"></i>');
        newBlock.addClass('time-block');
        newBlock.attr('tabindex', i-8);
        newRow.append(newHour);
        newRow.append(newBlock);
        newRow.append(newBtn);
        containerEl.append(newRow);
        checkTOD(hour24, newBlock);
    }
    //check localstorage to see if any past entries are saved
    checkTodos();
    var clearBtn = $('<button>');
    clearBtn.text('Clear All');
    clearBtn.click(clearBtnHandler);
    clearBtn.addClass('clearBtn');
    $('.clearDiv').append(clearBtn);
}

//gets current time and sets block elements' styling accordingly
var checkTOD = function (hour, blockEl) {
    if (hour < time.hour()) {
        blockEl.addClass('past');
    } else if (hour === time.hour()) {
        blockEl.addClass('present');
    } else {
        blockEl.addClass('future');
    }
}

//on click of save button, save content within time-block element to localStorage
var saveBtnHandler = function (event) {
    var clicked = event.target;
    var timeBlock = $(clicked).parent().children().eq(1);
    var index = timeBlock.parent().index();
    var text = timeBlock.val();
    ls.setItem(index, text);
}

//check localStorage for past entries
//set text to past entry if it exists
var checkTodos = function () {
    var len = containerEl.children().length;
    for (i = 0; i < len; i++) {
        var text = ls.getItem(i.toString());
        if (text) {
            console.log('text',text);   
            containerEl.children().eq(i).children().eq(1).val(text);
        }
    }
}

//clears localStorage and empties all containers
var clearBtnHandler = function (event) {
    ls.clear();
    $('.time-block').val('');
}

init();