var dom = {
  numberOfStrategy: 0,
  counterWinsInStrategy: 0,
  combinationCounter: 0,
  combinationTxt: "",
  
  winCheck: function(persons) {
    var winners = "";        
    var winnersWord = " winnered person:";
   
    for (var i = 0; i <= 3; i++) {
        if (persons[i].checkAnswer(
              persons[(i + 1) % 4].number, 
              persons[(i + 2) % 4].number, 
              persons[(i + 3) % 4].number)) {
      		winners += " " + (i + 1);
      		persons[i].winsCounter++;
        };
    }; 
    
    winners && dom.counterWinsInStrategy++;
           
    return winners && winnersWord + winners;
  },
  
  writeInitialInfo: function () {
    dom.numberOfStrategy++;
    document.getElementById("initialInfo").innerHTML = 
      "Number of strategy: " + 
      dom.numberOfStrategy;
  },
  
  addZero: function () {
    if (dom.combinationCounter < 10) {
      return "00" + dom.combinationCounter;
    } else if (dom.combinationCounter < 100) {
      return "0" + dom.combinationCounter;
    } else {
      return dom.combinationCounter;
    }
   },

  checkCase: function (persons) {
    dom.combinationTxt += "#" + dom.addZero() + " ---- ";
    
    for (var i = 0; i <= 3; i++) {
      dom.combinationTxt += "Person " + (i+1) + " number: " + persons[i].number + " (answer: " +
                     persons[i].getAnswer(
        persons[(i + 1) % 4].number, 
        persons[(i + 2) % 4].number, 
        persons[(i + 3) % 4].number) + ") ---- ";
    };
    
    dom.combinationTxt += dom.winCheck(persons) + "<br>";
    document.getElementById("checkCase").innerHTML = dom.combinationTxt;  
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
  },
};