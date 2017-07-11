var dom = {
  numberOfStrategy: 0,
  counterWinsInStrategy: 0,
  combinationCounter: 0,
  combinationTxt: [],
  rowInPage: 5,
  activePage: 0,
  firstVisibleRow: 0,
  moveSteps: "",
  stasrtMove: 2,
  topPozition: 0,
    
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
    if(n > 0 || n < dom.combinationTxt.length) {
      document.getElementById("message").style.visibility  = "hidden";
      if((n + dom.rowInPage) > dom.combinationTxt.length) { // to fix bug of  last next button click
        n = dom.combinationTxt.length - dom.rowInPage;
      };

      if(n < 0) { // to fix bug of last previous button click
        n = 0;
      };

      var x = "";
      for (var i = 0; i < dom.rowInPage; i++) {
        x += dom.combinationTxt[i+n];
      };

      document.getElementById("tableBody").innerHTML = x;
      dom.firstVisibleRow = n;
      document.forms[1].startRow.value = n +1;
    } else {
      document.getElementById("message").style.visibility  = "visible";
    };

    if (n === 0) { // dasabled "Previous" button
      document.getElementById("buttonPrevious").className = "disabled";
    } else {
      document.getElementById("buttonPrevious").className = "unDisabled";
    };

    if (n === dom.combinationTxt.length - dom.rowInPage) { // dasabled "Next" button
      document.getElementById("buttonNext").className = "disabled";
    } else {
      document.getElementById("buttonNext").className = "unDisabled";
    };
  },

  changeNumberCombinationsInPage: function() {
    x = document.forms[0].combinationsInPageList.value
    dom.rowInPage = + x;
    dom.pageNumber(dom.firstVisibleRow);
  },

  setFirstVisibleRow: function () {
    var x = + document.forms[1].startRow.value - 1;
    dom.firstVisibleRow = x;
    dom.pageNumber(x);    
  },


  //toTop: function () {
  //  window.scrollTo(0, 0);
  //},


  //toBottom: function () {
  //  window.scrollTo(0, document.body.offsetHeight - document.documentElement.clientHeight);
  //},

  move: function (topBottom) {
    dom.stasrtMove = 2;
    dom.moveSteps = "Move steps, px: ";
    dom.topPozition = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    if (topBottom < 0) {
      dom.toTop();
    } else if (topBottom > 0) {
      dom.toBottom();
    }
  },

  toTop: function () {
    var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    var t;
    if(top > dom.topPozition/2) {
      window.scrollBy(0, - dom.stasrtMove);
      dom.stasrtMove *= 1.14;
      dom.moveSteps += dom.stasrtMove.toFixed(1) + " / ";
      t = setTimeout('dom.toTop()',20);
     } else if (top > 0) {
      var j = (top+20)/-7.8;
      window.scrollBy(0, j);
      dom.moveSteps += j.toFixed(1) + " / ";
      t = setTimeout('dom.toTop()',20);
     } else {
      clearTimeout(t);
      alert (dom.moveSteps);
     };
     return false;
  },

  toBottom: function () {
    var top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
    var distance = document.body.offsetHeight - document.documentElement.clientHeight - dom.topPozition;
    var t;
    if(top < dom.topPozition + distance / 2 - dom.stasrtMove * 1.14) {
      dom.stasrtMove *= 1.14;
      window.scrollBy(0, dom.stasrtMove);
      dom.moveSteps += dom.stasrtMove.toFixed(1) + " / ";
      t = setTimeout('dom.toBottom()',20);
    } else if (top < dom.topPozition + distance / 2) {
      window.scrollBy(0, distance - (top - dom.topPozition) * 2);
      dom.moveSteps += "<<< " + (distance - (top - dom.topPozition) * 2).toFixed(1) + " >>> / ";
      t = setTimeout('dom.toBottom()',20);
    } else if (top < dom.topPozition + distance) {
      window.scrollBy(0, dom.stasrtMove);
      dom.moveSteps += dom.stasrtMove.toFixed(1) + " / ";
      t = setTimeout('dom.toBottom()',20);
      dom.stasrtMove /= 1.14;
    } else {
      clearTimeout(t);
      alert (dom.moveSteps);
    };
    return false;
  },
  
};