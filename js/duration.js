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
  if (startEra < endEra) {
    console.log("eras sequential");
    return true;
  } else if ((startEra === endEra) && (startYear <= endYear)) {
    console.log("years sequential");
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
  let startEra = parseInt($("#start-era-input").val());
  let startYear = parseInt($("#start-year-input").val());
  let endEra = parseInt($("#end-era-input").val());
  let endYear = parseInt($("#end-year-input").val());
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
    console.log("same era");
    return endYear - startYear;
  }
  if (endEra - startEra === 1) {
    console.log("consecutive eras");
    return (eras[startEra] - startYear) + endYear;
  }
  console.log("non-consecutive eras");
  return _.reduce(eras, (accum, eraDur, era) => {
    console.log(era);
    let eraInt = parseInt(era);
    if (eraInt === startEra) {
      console.log("...is the start era");
      // If it's the start era, add what's left of the era.
      return accum + (eraDur - startYear);
    } else if (eraInt === endEra) {
      console.log("...is the end era");
      // If it's the end era, add the year.
      return accum + endYear;
    } else if ((eraInt > startEra) && (eraInt < endEra)) {
      console.log("...is an intermediate era");
      // If it's an intermediate era, add its duration.
      return accum + eraDur;
    } else {
      console.log("...is an irrelevant era");
      // If it's not a relevant era, pass on the current accumulator.
      return accum;
    }
  }, 0);
}

function setDuration() {
  // Run duration(), then put result in element.
  $("#result").text(duration);
  console.log("");
}

// Have a nice visual break.
$(document).ready(() => {
  setDuration();
  $(".form-control").change(setDuration);
});
