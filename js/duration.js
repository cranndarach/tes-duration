var eraDurs = {
  1: 2920,
  2: 896,
  3: 433,
  4: Infinity
};

function withinRange(era, year, eras) {
  if ((era < 1) || (era > 4)) {
    return false;
  } else if ((year < 1) || (year > eras[era])) {
    return false;
  } else {
    return true;
  }
}

function sequential(startEra, startYear, endEra, endYear) {
  if ((startEra <= endEra) && (startYear <= endYear)) {
    return true;
  } else {
    return false;
  }
}

function sameEra(startEra, endEra) {
  if (startEra === endEra) {
    return true;
  } else {
    return false;
  }
}

function duration() {
  let startEra = $("#start-era-input").value();
  let startYear = $("#start-year-input").value();
  let endEra = $("#end-era-input").value();
  let endYear = $("#end-year-input").value();
  if (!(withinRange(startEra, startYear, eraDurs) && withinRange(endEra, endYear, eraDurs))) {
    return "Bad range.";
  }
  if (!sequential(startEra, startYear, endEra, endYear)) {
    return "Dates not sequential.";
  }
}

function setDuration() {
  // Run duration(), then put result in element.
  $("#result").text(duration);
}

$(document).ready(() => {
  $(".form-control").change(setDuration);
});
