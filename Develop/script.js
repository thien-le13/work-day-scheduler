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
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // This displays the current day on the page.
  var currentDay = $("#currentDay");
  currentDay.text(dayjs().format("dddd, MMMM D, YYYY"));
});
