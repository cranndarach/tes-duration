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
  let startEra = $("#start-era-input").value;
  let startYear = $("#start-year-input").value;
  let endEra = $("#end-era-input").value;
  let endYear = $("#end-year-input").value;
  if (!(withinRange(startEra, startYear, eraDurs) && withinRange(endEra, endYear, eraDurs))) {
    return "Bad range";
  }
  if (!sequential(startEra, startYear, endEra, endYear)) {
    return "Dates not sequential";
  }
  return calculateDuration(startEra, startYear, endEra, endYear, eraDurs).toLocaleString() + " years";
}

function calculateDuration(startEra, startYear, endEra, endYear, eras) {
  if (sameEra(startEra, endEra)) {
    return endYear - startYear;
  }
  if (endEra - startEra === 1) {
    return (eras[startEra] - startYear) + endYear;
  }
  return _.reduce(eras, (accum, eraDur, era) => {
    if (era === startEra) {
      // If it's the start era, add what's left of the era.
      return accum + (eraDur - startYear);
    } else if (era === endEra) {
      // If it's the end era, add the year.
      return accum + endYear;
    } else if ((era > startEra) && (era < endEra)) {
      // If it's an intermediate era, add its duration.
      return accum + eraDur;
    } else {
      // If it's not a relevant era, pass on the current accumulator.
      return accum;
    }
  }, 0);
}

function setDuration() {
  // Run duration(), then put result in element.
  $("#result").text(duration);
}

// Have a nice visual break.
$(document).ready(() => {
  $(".form-control").change(setDuration);
});
