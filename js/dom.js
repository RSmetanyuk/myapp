var dom = {
  numberOfStrategy: 0,
  counterWinsInStrategy: 0,
  combinationCounter: 0,
  combinationTxt: "",
    
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
    dom.combinationTxt += "<tr><td style='border-right: 3px solid'>" +
    dom.combinationCounter + "</td>";    
    
    for (var i = 0; i <= 2; i++) {
      dom.combinationTxt += "<td>" + persons[i].number + "</td>";
    };

    dom.combinationTxt += "<td style='border-right: 3px solid'>" + persons[3].number + "</td>";

    for (var i = 0; i <= 3; i++) {
      var Coloured = '';
      if(persons[i].checkAnswer(
        persons[(i + 1) % 4].number, 
        persons[(i + 2) % 4].number, 
        persons[(i + 3) % 4].number)) {
        Coloured = ' class="success"'
      };

      dom.combinationTxt += "<td" + Coloured + ">" + persons[i].getAnswer(
        persons[(i + 1) % 4].number, 
        persons[(i + 2) % 4].number, 
        persons[(i + 3) % 4].number) + "</td>";
    };

    dom.combinationTxt += "</tr>";
    dom.winCheck(persons);
    document.getElementById("tableBody").innerHTML = dom.combinationTxt;  
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
    dom.combinationTxt = ""; 
  },
};