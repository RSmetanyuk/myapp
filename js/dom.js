var dom = {
  counterOfCombinations: 0,
  counterOfWins: 0,
  arrayOfMainTableRows: [],
  maxRowsPerPage: 5,
  firstVisibleRow: 0,
  lastVisibleRow: 0,
  pageScrollLog: "",
  pageScrollStep: 0,
  pageScrollSpeedup: 0,
  pageScrollTopPozitionOnStart: 0,
  pageScrollTimer: 0,
    
  winCount: function(persons) {
    var winners = "";
       
    for (var i = 0; i <= 3; i++) {
        if (persons[i].checkAnswer(
              persons[(i + 1) % 4].number,
              persons[(i + 2) % 4].number,
              persons[(i + 3) % 4].number)) {
          winners += (i + 1);
          persons[i].winsCounter++;
        };
    }; 

    winners && dom.counterOfWins++;
  },

  checkCase: function (persons) {
    var row = document.getElementById("mainTableRowTemplate").cloneNode(true);
    row.cells[0].textContent = dom.counterOfCombinations + 1;

    for (var i = 0; i <= 3; i++) {
      row.cells[1 + i].textContent = persons[i].number
    };

    for (var i = 0; i <= 3; i++) {
      if(persons[i].checkAnswer(
        persons[(i + 1) % 4].number,
        persons[(i + 2) % 4].number,
        persons[(i + 3) % 4].number)) {
        row.cells[i + 5].className = "success"
      };
      row.cells[i + 5].textContent = persons[i].getAnswer(
        persons[(i + 1) % 4].number, 
        persons[(i + 2) % 4].number, 
        persons[(i + 3) % 4].number)
    };

    row.removeAttribute("id");
    dom.arrayOfMainTableRows.push(row.outerHTML);

    dom.winCount(persons)
  },

  writeGeneralInfo: function(person1, person2, person3, person4) {
    dom.fillWinsTable (person1, person2, person3, person4);
    document.getElementById("totalNumberOfWins").innerHTML = dom.counterOfWins;
    person1.winsCounter = 0;
    person2.winsCounter = 0;
    person3.winsCounter = 0;
    person4.winsCounter = 0;
    dom.counterOfWins = 0;
    dom.counterOfCombinations = 0;
  },

  fillWinsTable: function(person1, person2, person3, person4) {
    var winsTable = document.getElementById("winsTableBody");
    var winsTable2 = document.getElementById("winsTable2");
    for (var i = 0; i <= 3; i++) {
      var data = 0;
      if (arguments.length == 4) {data = arguments[i].winsCounter};
      winsTable.rows[i].cells[1].innerHTML = data;
      winsTable2.rows[1].cells[i + 1].innerHTML = data;
    };
  },

  setFirstVisibleRow: function (n) { // "n" - number to be set
    var x = "";

    if (n < 0) { // to fix "previous press"
      n = 0
      for (var i = 0; i < dom.firstVisibleRow; i++) {
        x += dom.arrayOfMainTableRows[n + i];
        dom.lastVisibleRow = n + i;
        };
      } else {
        for (var i = 0; i < dom.maxRowsPerPage && i + n < dom.arrayOfMainTableRows.length; i++) {
          x += dom.arrayOfMainTableRows[n + i];
          dom.lastVisibleRow = n + i;
        };
      };
      document.getElementById("mainTableBody").innerHTML = x;
      dom.firstVisibleRow = n;
      document.getElementById("firstVisibleRow").value = n +1;
      document.getElementById("errorMessage").style.visibility  = "hidden";

      if (n === 0) {    // dasabled "Previous" button
        document.getElementById("buttonPrevious").className = "disabled";
        document.getElementById("buttonFirst").className = "disabled";
      } else {
        document.getElementById("buttonPrevious").className = "unDisabled";
        document.getElementById("buttonFirst").className = "unDisabled";
      };

      if (n >= dom.arrayOfMainTableRows.length - dom.maxRowsPerPage) {    // dasabled "Next" button
        document.getElementById("buttonNext").className = "disabled";
        document.getElementById("buttonLast").className = "disabled";
      } else {
        document.getElementById("buttonNext").className = "unDisabled";
        document.getElementById("buttonLast").className = "unDisabled";
      };

      dom.onBodyResize ();
  },

  makeErrorMessage (input) {
    if (input < 0) {
      document.getElementById("errorMessage").innerHTML  = 'You can start from "1" only';
    } else if (input >= dom.arrayOfMainTableRows.length) {
      document.getElementById("errorMessage").innerHTML  = 'There are only 256 rows';
    } else {
      document.getElementById("errorMessage").innerHTML  = 'You can only enter a number';
    };
  },

  overlayOnClick () {  // disabled input on click
    document.getElementById("errorMessage").innerHTML  = 'Please, press Start button';
    document.getElementById("errorMessage").style.visibility  = "visible";  
  },

  maxRowsPerPageOnChange: function(x) {
    x = document.getElementById("maxRowsPerPage").value
    dom.maxRowsPerPage = + x;
    document.getElementsByClassName("btn-xs").innerHTML  = x;
    if (+ x === 256) {
      document.getElementById("firstVisibleRow").disabled = true;
      dom.setFirstVisibleRow(0);  
    } else {
      document.getElementById("firstVisibleRow").disabled = false;
      dom.setFirstVisibleRow(dom.firstVisibleRow);  
    };
  },

  onTypeFirstVisibleRowHandler: function () {
    var typedFirstVisibleRow = + document.getElementById("firstVisibleRow").value - 1;
    if(typedFirstVisibleRow >= 0 && typedFirstVisibleRow < dom.arrayOfMainTableRows.length) {
      document.getElementById("errorMessage").style.visibility  = "hidden";
      dom.firstVisibleRow = typedFirstVisibleRow;
      dom.setFirstVisibleRow(typedFirstVisibleRow);   
    } else {
      document.getElementById("firstVisibleRow").value = ""
      document.getElementById("errorMessage").style.visibility  = "visible";
      dom.makeErrorMessage(typedFirstVisibleRow); 
    }; 
  },

  pageScroll: function (pageScrollStep, speedup) {
    clearTimeout(dom.timer);
    dom.pageScrollStep = Math.abs(pageScrollStep);
    dom.speedup = speedup;
    dom.pageScrollLog = "Page scroll steps, px: ";
    dom.topPozition = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    if (pageScrollStep < 0) {
      dom.toTop();
    } else if (pageScrollStep > 0) {
      dom.toBottom();
    }
  },

  toTop: function () {
    var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    if(top > dom.topPozition / 2 + dom.pageScrollStep * dom.speedup) {
      dom.pageScrollStep *= dom.speedup;
      window.scrollBy(0, - dom.pageScrollStep);
      dom.pageScrollLog += dom.pageScrollStep.toFixed(1) + " / ";
      dom.timer = setTimeout('dom.toTop()',20);
    } else if (top > dom.topPozition / 2) {
      window.scrollBy(0, - (dom.topPozition - (dom.topPozition - top) * 2));
      dom.pageScrollLog += "<<< " + (dom.topPozition - (dom.topPozition - top) * 2).toFixed(1) + " >>> / ";
      dom.timer = setTimeout('dom.toTop()',20);
    } else if (top > 0) {
      window.scrollBy(0, - dom.pageScrollStep);
      dom.pageScrollLog += dom.pageScrollStep.toFixed(1) + " / ";
      dom.timer = setTimeout('dom.toTop()',20);
      dom.pageScrollStep /= dom.speedup;
    } else {
      clearTimeout(dom.timer);
      //alert (dom.pageScrollLog);
    };
    return false;
  },

  toBottom: function () {
    var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    var distance = document.body.offsetHeight - document.documentElement.clientHeight - dom.topPozition;
    if(top < dom.topPozition + distance / 2 - dom.pageScrollStep * dom.speedup) {
      dom.pageScrollStep *= dom.speedup;
      window.scrollBy(0, dom.pageScrollStep);
      dom.pageScrollLog += dom.pageScrollStep.toFixed(1) + " / ";
      dom.timer = setTimeout('dom.toBottom()',20);
    } else if (top < dom.topPozition + distance / 2) {
      window.scrollBy(0, distance - (top - dom.topPozition) * 2);
      dom.pageScrollLog += "<<< " + (distance - (top - dom.topPozition) * 2).toFixed(1) + " >>> / ";
      dom.timer = setTimeout('dom.toBottom()',20);
    } else if (top < dom.topPozition + distance) {
      window.scrollBy(0, dom.pageScrollStep);
      dom.pageScrollLog += dom.pageScrollStep.toFixed(1) + " / ";
      dom.timer = setTimeout('dom.toBottom()',20);
      dom.pageScrollStep /= dom.speedup;
    } else {
      clearTimeout(dom.timer);
      //alert (dom.pageScrollLog);
    };
    return false;
  },

  onBodyResize: function () {
    if (document.body.offsetHeight - document.documentElement.clientHeight > 0) {
      document.getElementById("scrollButtonsBuckground").style.display = "inline";
      document.getElementById("toBottomButton").style.display = "inline";  
    } else {
      document.getElementById("scrollButtonsBuckground").style.display = "none";
    };
  },

  onScrollHandler: function () {
    if (document.body.offsetHeight > document.documentElement.clientHeight) {
      document.getElementById("scrollButtonsBuckground").style.display = "inline";
      document.getElementById("toBottomButton").style.display = "inline";
    } else {
      document.getElementById("toBottomButton").style.display = "none"; 
    };

    if (window.pageYOffset >= 1) {
      document.getElementById("toTopButton").style.display = "inline";
    } else {
      document.getElementById("toTopButton").style.display = "none";
    };

    if (window.pageYOffset > document.body.offsetHeight - document.documentElement.clientHeight - 1) {
      document.getElementById("toBottomButton").style.display = "none"; 
    };
  },

  onStartup: function () {
    document.getElementById("Reset").style.display = "inline";
    document.getElementById("Start").style.display = "none";
    document.getElementById("totalRows").innerHTML = dom.arrayOfMainTableRows.length;
    document.getElementById("maxRowsPerPage").disabled = false;
    document.getElementById("maxRowsPerPage").value = 5;
    document.getElementById("numberCombinationsInPageOverlay").style.display = "none";
    document.getElementById("firstVisibleRow").disabled = false;
    document.getElementById("firstVisibleRowOverlay").style.display = "none";
    document.getElementById("errorMessage").style.visibility  = "hidden";
    document.getElementById("pagination").style.display = "inline-block";
  },

  reset: function () {
    dom.arrayOfMainTableRows = [];
    document.getElementById("Reset").style.display = "none";
    document.getElementById("Start").style.display = "inline";
    document.getElementById("mainTableBody").innerHTML = "";
    dom.fillWinsTable ();
    document.getElementById("totalNumberOfWins").innerHTML = 0;
    document.getElementById("totalRows").innerHTML = 0;
    document.getElementById("maxRowsPerPage").value = "";
    document.getElementById("maxRowsPerPage").disabled = true;
    document.getElementById("numberCombinationsInPageOverlay").style.display = "inline-block";
    dom.maxRowsPerPage = 5;
    document.getElementById("firstVisibleRow").value = "";
    document.getElementById("firstVisibleRow").disabled = true;
    document.getElementById("firstVisibleRowOverlay").style.display = "inline-block";
    dom.firstVisibleRow = 0;
    document.getElementById("pagination").style.display = "none";
    document.getElementById("scrollButtonsBuckground").style.display = "none";
    document.getElementById("errorMessage").style.visibility  = "hidden";
  }

};