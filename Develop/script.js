$(function () {
  // Adds an event listener to each button that will save all the entries at once.
  var saveButtons = $("[aria-label='save']");
  var saveText = JSON.parse(localStorage.getItem("saveText")) || [];

  saveButtons.each(function (index) {
    $(this).on("click", function (event) {
      saveButtons.each(function (ind) {
        var id = $(saveButtons[ind]).parent().attr("id");
        var time = id.replace("hour-", "");
        saveText[parseInt(time, 10) - 9] = $(saveButtons[ind])
          .siblings("textarea")
          .val();
      });

      localStorage.setItem("saveText", JSON.stringify(saveText));
    });
  });

  // Checks the current hour to determine the CSS styling.
  var hourBlocks = $(".time-block");
  for (var i = 0; i < hourBlocks.length; i++) {
    var hour = $(hourBlocks[i]).attr("id").replace("hour-", "");
    if (hour == dayjs().format("HH")) {
      $(hourBlocks[i]).addClass("present");
    } else if (parseInt(hour, 10) < parseInt(dayjs().format("HH"), 10)) {
      $(hourBlocks[i]).addClass("past");
    } else {
      $(hourBlocks[i]).addClass("future");
    }
  }

  // Set values of the text areas of a local save file.
  if (saveText.length != 0) {
    saveButtons.each(function (index) {
      $(saveButtons[index]).siblings("textarea").text(saveText[index]);
    });
  }

  // Displays the current day on the page.
  var currentDay = $("#currentDay");
  currentDay.text(dayjs().format("dddd, MMMM D, YYYY"));
});
