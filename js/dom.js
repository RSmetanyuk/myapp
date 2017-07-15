var dom = {
  numberOfStrategy: 0,
  counterWinsInStrategy: 0,
  combinationCounter: 0,
  combinationTxt: [],
  rowInPage: 5,
  firstVisibleRow: 0,
  lastVisibleRow: 0,
  stepsLog: "",
  step: 0,
  speedup: 0,
  topPozition: 0,
  timer: 0,
    
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
    
    winners && dom.counterWinsInStrategy++;
  },
  
  writeInitialInfo: function () {
    dom.numberOfStrategy++;
    document.getElementById("initialInfo").innerHTML = 
      "Number of strategy: " + 
      dom.numberOfStrategy;
  },

  checkCase: function (persons) {
    dom.combinationTxt[dom.combinationCounter] = "";
    dom.combinationTxt[dom.combinationCounter] += "<tr><td>" + (dom.combinationCounter + 1) + "</td>";
    
    for (var i = 0; i <= 3; i++) {
      dom.combinationTxt[dom.combinationCounter] += "<td>" + persons[i].number + "</td>";
    };

    for (var i = 0; i <= 3; i++) {
      var Coloured = '';
      if(persons[i].checkAnswer(
        persons[(i + 1) % 4].number, 
        persons[(i + 2) % 4].number, 
        persons[(i + 3) % 4].number)) {
        Coloured = ' class="success"'
      };

      dom.combinationTxt[dom.combinationCounter] += "<td" + Coloured + ">" + persons[i].getAnswer(
        persons[(i + 1) % 4].number, 
        persons[(i + 2) % 4].number, 
        persons[(i + 3) % 4].number) + "</td>";
    };

    dom.combinationTxt[dom.combinationCounter] += "</tr>";
    dom.winCount(persons);
  },
    
  writeGeneralInfo: function(person1, person2, person3, person4) {
    document.getElementById("table2Body").innerHTML =
      "<tr><td>A</td><td>" + person1.winsCounter + "</td></tr>" +
      "<tr><td>B</td><td>" + person2.winsCounter + "</td></tr>" +
      "<tr><td>C</td><td>" + person3.winsCounter + "</td></tr>" +
      "<tr><td>D</td><td>" + person4.winsCounter + "</td></tr>";

    document.getElementById("generalInfo").innerHTML = 
    "Total number of wins is " + dom.counterWinsInStrategy;
    
    person1.winsCounter = 0;
    person2.winsCounter = 0;
    person3.winsCounter = 0;
    person4.winsCounter = 0;
    dom.counterWinsInStrategy = 0;
    dom.combinationCounter = 0;
    dom.numberOfStrategy = 0;
  },

  pageNumber: function (n) { // "n" - number first row on page
      var x = "";

      if (n < 0) { // to fix "previous press"
        n = 0
        for (var i = 0; i < dom.firstVisibleRow; i++) {
          x += dom.combinationTxt[n + i];
          dom.lastVisibleRow = n + i;
        };
      } else {
        for (var i = 0; i < dom.rowInPage && i + n < dom.combinationTxt.length; i++) {
          x += dom.combinationTxt[n + i];
          dom.lastVisibleRow = n + i;
        };
      };

      document.getElementById("tableBody").innerHTML = x;
      dom.firstVisibleRow = n;
      document.forms[1].startRow.value = n +1;
      document.getElementById("errorMessage").style.visibility  = "hidden";


      if (n === 0) { // dasabled "Previous" button
        document.getElementById("buttonPrevious").className = "disabled";
        document.getElementById("buttonFirst").className = "disabled";
      } else {
        document.getElementById("buttonPrevious").className = "unDisabled";
        document.getElementById("buttonFirst").className = "unDisabled";
      };

      if (n >= dom.combinationTxt.length - dom.rowInPage) { // dasabled "Next" button
        document.getElementById("buttonNext").className = "disabled";
        document.getElementById("buttonLast").className = "disabled";
      } else {
        document.getElementById("buttonNext").className = "unDisabled";
        document.getElementById("buttonLast").className = "unDisabled";        
      };

 
  },

  makeErrorMessage (input) {
    if (input < 0) {
      document.getElementById("errorMessage").innerHTML  = 'You can start from "1" only';
    } else if (input >= dom.combinationTxt.length) {
      document.getElementById("errorMessage").innerHTML  = 'There are only 256 rows';
    } else {
      document.getElementById("errorMessage").innerHTML  = 'You can only enter a number';
    };
  },

  onClickDisabledInput () {
    document.getElementById("errorMessage").innerHTML  = 'Please, press Start button';
    document.getElementById("errorMessage").style.visibility  = "visible";  
  },

  changeNumberCombinationsInPage: function() {
    x = document.forms[0].combinationsInPageList.value
    dom.rowInPage = + x;
    if (+ x === 256) {
      document.getElementById("returnToTopBottomBuckground").style.display = "inline";
      document.getElementById("returnToBottom").style.display = "inline";
      document.getElementById("startRow").disabled = true;   
      dom.pageNumber(0);  
    } else {
      document.getElementById("returnToTopBottomBuckground").style.display = "none";
      document.getElementById("startRow").disabled = false;
      dom.pageNumber(dom.firstVisibleRow);  
    };
  },

  setFirstVisibleRow: function () {
    var enteredRowNumber = + document.forms[1].startRow.value - 1;
    if(enteredRowNumber >= 0 && enteredRowNumber < dom.combinationTxt.length) {
      document.getElementById("errorMessage").style.visibility  = "hidden";
      dom.firstVisibleRow = enteredRowNumber;
      dom.pageNumber(enteredRowNumber);   
    } else {
      document.forms[1].startRow.value = ""
      document.getElementById("errorMessage").style.visibility  = "visible";
      dom.makeErrorMessage(enteredRowNumber); 
    }; 
  },

  move: function (step, speedup) {
    clearTimeout(dom.timer);
    dom.step = Math.abs(step);
    dom.speedup = speedup;
    dom.stepsLog = "Move steps, px: ";
    dom.topPozition = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    if (step < 0) {
      dom.toTop();
    } else if (step > 0) {
      dom.toBottom();
    }
  },

  toTop: function () {
    var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    if(top > dom.topPozition / 2 + dom.step * dom.speedup) {
      dom.step *= dom.speedup;
      window.scrollBy(0, - dom.step);
      dom.stepsLog += dom.step.toFixed(1) + " / ";
      dom.timer = setTimeout('dom.toTop()',20);
    } else if (top > dom.topPozition / 2) {
      window.scrollBy(0, - (dom.topPozition - (dom.topPozition - top) * 2));
      dom.stepsLog += "<<< " + (dom.topPozition - (dom.topPozition - top) * 2).toFixed(1) + " >>> / ";
      dom.timer = setTimeout('dom.toTop()',20);
    } else if (top > 0) {
      window.scrollBy(0, - dom.step);
      dom.stepsLog += dom.step.toFixed(1) + " / ";
      dom.timer = setTimeout('dom.toTop()',20);
      dom.step /= dom.speedup;
    } else {
      clearTimeout(dom.timer);
      //alert (dom.stepsLog);
    };
    return false;
  },

  toBottom: function () {
    var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    var distance = document.body.offsetHeight - document.documentElement.clientHeight - dom.topPozition;
    if(top < dom.topPozition + distance / 2 - dom.step * dom.speedup) {
      dom.step *= dom.speedup;
      window.scrollBy(0, dom.step);
      dom.stepsLog += dom.step.toFixed(1) + " / ";
      dom.timer = setTimeout('dom.toBottom()',20);
    } else if (top < dom.topPozition + distance / 2) {
      window.scrollBy(0, distance - (top - dom.topPozition) * 2);
      dom.stepsLog += "<<< " + (distance - (top - dom.topPozition) * 2).toFixed(1) + " >>> / ";
      dom.timer = setTimeout('dom.toBottom()',20);
    } else if (top < dom.topPozition + distance) {
      window.scrollBy(0, dom.step);
      dom.stepsLog += dom.step.toFixed(1) + " / ";
      dom.timer = setTimeout('dom.toBottom()',20);
      dom.step /= dom.speedup;
    } else {
      clearTimeout(dom.timer);
      //alert (dom.stepsLog);
    };
    return false;
  },
  
};