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
    dom.arrayOfMainTableRows[dom.counterOfCombinations] = "";
    dom.arrayOfMainTableRows[dom.counterOfCombinations] += "<tr><td>" + (dom.counterOfCombinations + 1) + "</td>";
    
    for (var i = 0; i <= 3; i++) {
      dom.arrayOfMainTableRows[dom.counterOfCombinations] += "<td>" + persons[i].number + "</td>";
    };

    for (var i = 0; i <= 3; i++) {
      var Coloured = '';
      if(persons[i].checkAnswer(
        persons[(i + 1) % 4].number, 
        persons[(i + 2) % 4].number, 
        persons[(i + 3) % 4].number)) {
        Coloured = ' class="success"'
      };

      dom.arrayOfMainTableRows[dom.counterOfCombinations] += "<td" + Coloured + ">" + persons[i].getAnswer(
        persons[(i + 1) % 4].number, 
        persons[(i + 2) % 4].number, 
        persons[(i + 3) % 4].number) + "</td>";
    };

    dom.arrayOfMainTableRows[dom.counterOfCombinations] += "</tr>";
    dom.winCount(persons);
  },
    
  writeGeneralInfo: function(person1, person2, person3, person4) {
    document.getElementById("winsTableBody").innerHTML =
      "<tr><td>A</td><td>" + person1.winsCounter + "</td></tr>" +
      "<tr><td>B</td><td>" + person2.winsCounter + "</td></tr>" +
      "<tr><td>C</td><td>" + person3.winsCounter + "</td></tr>" +
      "<tr><td>D</td><td>" + person4.winsCounter + "</td></tr>";
    document.getElementById("winsTable2").innerHTML =
      "<tbody><tr><th>Persons</th><td>A</td><td>B</td><td>C</td><td>D</td></tr>" +
      "<th>Wins count</th><td>" + person1.winsCounter + 
                    "</td><td>" + person2.winsCounter + 
                    "</td><td>" + person3.winsCounter + 
                    "</td><td>" + person4.winsCounter + "</td></tr></tbody>";

    document.getElementById("totalNumberOfWins").innerHTML = dom.counterOfWins;
    
    person1.winsCounter = 0;
    person2.winsCounter = 0;
    person3.winsCounter = 0;
    person4.winsCounter = 0;
    dom.counterOfWins = 0;
    dom.counterOfCombinations = 0;
  },

  pageNumber: function (n) { // "n" - number first row on page
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
      document.getElementById("startRow").value = n +1;
      document.getElementById("errorMessage").style.visibility  = "hidden";


      if (n === 0) { // dasabled "Previous" button
        document.getElementById("buttonPrevious").className = "disabled";
        document.getElementById("buttonFirst").className = "disabled";
      } else {
        document.getElementById("buttonPrevious").className = "unDisabled";
        document.getElementById("buttonFirst").className = "unDisabled";
      };

      if (n >= dom.arrayOfMainTableRows.length - dom.maxRowsPerPage) { // dasabled "Next" button
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

  onClickDisabledInput () {
    document.getElementById("errorMessage").innerHTML  = 'Please, press Start button';
    document.getElementById("errorMessage").style.visibility  = "visible";  
  },

  changeNumberCombinationsInPage: function(x) {
    x = document.getElementById("numberCombinationsInPage").value
    dom.maxRowsPerPage = + x;
    document.getElementsByClassName("btn-xs").innerHTML  = x;
    if (+ x === 256) {
      //document.getElementById("returnToTopBottomBuckground").style.display = "inline";
      //document.getElementById("returnToBottom").style.display = "inline";
      document.getElementById("startRow").disabled = true;   
      dom.pageNumber(0);  
    } else {
      //document.getElementById("returnToTopBottomBuckground").style.display = "none";
      document.getElementById("startRow").disabled = false;
      dom.pageNumber(dom.firstVisibleRow);  
    };
  },

  setFirstVisibleRow: function () {
    var enteredRowNumber = + document.getElementById("startRow").value - 1;
    if(enteredRowNumber >= 0 && enteredRowNumber < dom.arrayOfMainTableRows.length) {
      document.getElementById("errorMessage").style.visibility  = "hidden";
      dom.firstVisibleRow = enteredRowNumber;
      dom.pageNumber(enteredRowNumber);   
    } else {
      document.getElementById("startRow").value = ""
      document.getElementById("errorMessage").style.visibility  = "visible";
      dom.makeErrorMessage(enteredRowNumber); 
    }; 
  },

  move: function (pageScrollStep, speedup) {
    clearTimeout(dom.timer);
    dom.pageScrollStep = Math.abs(pageScrollStep);
    dom.speedup = speedup;
    dom.pageScrollLog = "Move pageScrollSteps, px: ";
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
      document.getElementById("returnToTopBottomBuckground").style.display = "inline";
      document.getElementById("returnToBottom").style.display = "inline";  
    } else {
      document.getElementById("returnToTopBottomBuckground").style.display = "none";
    };
  },

  onScrollHandler: function () {
    if (document.body.offsetHeight > document.documentElement.clientHeight) {
      document.getElementById("returnToTopBottomBuckground").style.display = "inline";
      document.getElementById("returnToBottom").style.display = "inline";
    } else {
      document.getElementById("returnToBottom").style.display = "none"; 
    };


    if (window.pageYOffset >= 1) {
      document.getElementById("returnToTop").style.display = "inline";     
    } else {
      document.getElementById("returnToTop").style.display = "none";
    };

    if (window.pageYOffset > document.body.offsetHeight - document.documentElement.clientHeight - 1) {
      document.getElementById("returnToBottom").style.display = "none"; 
    };
  },

  onStartup: function () {
    document.getElementById("Reset").style.display = "inline";
    document.getElementById("Start").style.display = "none";
    document.getElementById("totalRows").innerHTML = dom.arrayOfMainTableRows.length;
    document.getElementById("numberCombinationsInPage").disabled = false;
    document.getElementById("numberCombinationsInPage").value = 5;
    document.getElementById("numberCombinationsInPageOverlay").style.display = "none";
    document.getElementById("startRow").disabled = false;
    document.getElementById("startRowOverlay").style.display = "none";
    document.getElementById("errorMessage").style.visibility  = "hidden";
    document.getElementById("pagination").style.display = "inline-block";    
  },

  reset: function () {
    document.getElementById("Reset").style.display = "none";
    document.getElementById("Start").style.display = "inline";
    document.getElementById("mainTableBody").innerHTML = "";
    document.getElementById("winsTableBody").innerHTML = 
      "<tbody><tr><td>A</td><td>0</td></tr>" +
              "<tr><td>B</td><td>0</td></tr>" +
              "<tr><td>C</td><td>0</td></tr>" +
              "<tr><td>D</td><td>0</td></tr></tbody>";
    document.getElementById("winsTable2").innerHTML =
      "<tbody><tr><th>Persons</th><td>A</td><td>B</td><td>C</td><td>D</td></tr>" +
      "<th>Wins count</th><td>0</td><td>0</td><td>0</td><td>0</td></tr></tbody>"; 
    document.getElementById("totalNumberOfWins").innerHTML = 0;
    document.getElementById("totalRows").innerHTML = 0;
    document.getElementById("numberCombinationsInPage").value = "";
    document.getElementById("numberCombinationsInPage").disabled = true;
    document.getElementById("numberCombinationsInPageOverlay").style.display = "inline-block";
    dom.maxRowsPerPage = 5;
    document.getElementById("startRow").value = "";
    document.getElementById("startRow").disabled = true;
    document.getElementById("startRowOverlay").style.display = "inline-block";
    dom.firstVisibleRow = 0;
    document.getElementById("pagination").style.display = "none";
    document.getElementById("returnToTopBottomBuckground").style.display = "none";
    document.getElementById("errorMessage").style.visibility  = "hidden";
  }

};