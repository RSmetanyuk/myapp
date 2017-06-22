var dom = {
  numberOfStrategy: 0,
  counterWinsInStrategy: 0,
  combinationCounter: 0,
  combinationTxt: [],
  rowInPage: 5,
    
  winCheck: function(persons) {
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
    var page = Math.floor (dom.combinationCounter / dom.rowInPage);

    if (dom.combinationCounter % dom.rowInPage === 0) {
      dom.combinationTxt[page] = "";
      document.getElementById("pagination").innerHTML += 
      "<button type='button' class='btn btn-default' onclick='dom.changeCombinationPageNumber(" + 
      page + ")'>" + (page + 1) + "</button>";
    };

    dom.combinationTxt[page] += "<tr><td>" + (dom.combinationCounter + 1) + "</td>";
    
    for (var i = 0; i <= 2; i++) {
      dom.combinationTxt[page] += "<td>" + persons[i].number + "</td>";
    };

    dom.combinationTxt[page] += "<td>" + persons[3].number + "</td>";

    for (var i = 0; i <= 3; i++) {
      var Coloured = '';
      if(persons[i].checkAnswer(
        persons[(i + 1) % 4].number, 
        persons[(i + 2) % 4].number, 
        persons[(i + 3) % 4].number)) {
        Coloured = ' class="success"'
      };

      dom.combinationTxt[page] += "<td" + Coloured + ">" + persons[i].getAnswer(
        persons[(i + 1) % 4].number, 
        persons[(i + 2) % 4].number, 
        persons[(i + 3) % 4].number) + "</td>";
    };

    dom.combinationTxt[page] += "</tr>";
    dom.winCheck(persons);
    
    dom.changeCombinationPageNumber(0);
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

  changeCombinationPageNumber: function (n) {
    document.getElementById("tableBody").innerHTML = dom.combinationTxt[n];
   },

  changeNumberCombinationsInPage: function() {   
    x = document.forms[0].combinationsInPageList.value
    dom.rowInPage = x;
    main();
  }


};