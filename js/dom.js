var dom = {
  numberOfStrategy: 0,
  counterWinsInStrategy: 0,
  combinationCounter: 0,
  combinationTxt: [],
  rowInPage: 5,
  activePage: 0,
  firstVisibleRow: 0,
    
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
    //var page = Math.floor (dom.combinationCounter / dom.rowInPage);

   // if (dom.combinationCounter % dom.rowInPage === 0) {
    dom.combinationTxt[dom.combinationCounter] = "";      
    //};

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
    
    //dom.pageNumber(0);
  },
    
  writeGeneralInfo: function(person1, person2, person3, person4) {
  	var infoToWrite =  
      "person1 wins " + person1.winsCounter + " times <br>" +
      "person2 wins " + person2.winsCounter + " times <br>" + 
      "person3 wins " + person3.winsCounter + " times <br>" +
      "person4 wins " + person4.winsCounter + " times <br>" +
      "Total number of wins is " + dom.counterWinsInStrategy;
    
    document.getElementById("generalInfo").innerHTML = infoToWrite;
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
      alert ("You can only enter a number")
    }
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
};