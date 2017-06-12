 /*
 We have four people who give answers the following way:
 1) if person sees three same numbers, she selects the same number + 
    her serial number (but person1 chooses + 3);
 2) If a person sees three different numbers, she selects the missing number +
    her serial number (but person1 selects  + 3, if the sum of the difference
    of neighboring numbers she sees is even)
 3) if person sees two same numbers and third number, 
    she selects that third number + her number (but person1 selects  + 3, if 
    the sum of the difference of neighboring numbers she sees is even).  
 */ 

function Person1 (number) {
  this.number = number;
  this.winsCounter = 0;
 
  this.getAnswer =  function (number2, number3, number4) {
    if (number2 === number3  && number3 === number4) {
      return (number2 + 3) % 4 || 4;
    } else if (number2 !== number3 && number3 !== number4 &&
               number4 !== number2) {
      if ((Math.abs(number2 - number3) + Math.abs(number3 - number4)) % 2 === 0) {
        return ((10 - number2 - number3 - number4) + 3) % 4 || 4;
      } else {
        return ((10 - number2 - number3 - number4) + 1) % 4 || 4;
      };
   } else {
     if ((Math.abs(number2 - number3) + Math.abs(number3 - number4)) % 2 === 0) {
        if (number2 === number3) return (number4 + 3) % 4 || 4;
        if (number3 === number4) return (number2 + 3) % 4 || 4;
        if (number4 === number2) return (number3 + 3) % 4 || 4;
     } else {
        if (number2 === number3) return (number4 + 1) % 4 || 4;
        if (number3 === number4) return (number2 + 1) % 4 || 4;
        if (number4 === number2) return (number3 + 1) % 4 || 4;
      }   
    }
  };
  
  this.checkAnswer = function (number2, number3, number4) {
    return this.number === this.getAnswer(number2, number3, number4);
  };
};

function Person2 (number) {
  this.number = number;
  this.winsCounter = 0;

  this.getAnswer =  function (number1, number3, number4) {
    if (number1 === number3 &&
        number3 === number4) {
      return (number1 + 2) % 4 || 4;
    } else if (number1 !== number3 &&
               number3 !== number4 &&
               number4 !== number1) {
      return ((10 - number1 - number3 - number4) + 2) % 4 || 4;
    } else {    
      if (number1 === number3) return (number4 + 2) % 4 || 4;
      if (number3 === number4) return (number1 + 2) % 4 || 4;
      if (number4 === number1) return (number3 + 2) % 4 || 4;      
    }
  };
  
  this.checkAnswer = function (number1, number3, number4) {
    return this.number === this.getAnswer(number1, number3, number4);
  };
};

function Person3 (number) {
  this.number = number;
  this.winsCounter = 0;

  this.getAnswer =  function (number1, number2, number4) {
    if (number1 === number2 &&
        number2 === number4) {
      return (number1 + 3) % 4 || 4;
    } else if (number1 !== number2 &&
               number2 !== number4 &&
               number4 !== number1) {
      return ((10 - number1 - number2 - number4) + 3) % 4 || 4;
    } else {      
      if (number1 === number2) return (number4 + 3) % 4 || 4;
      if (number2 === number4) return (number1 + 3) % 4 || 4;
      if (number4 === number1) return (number2 + 3) % 4 || 4;
    }
  };
  
  this.checkAnswer = function (number1, number2, number4) {
    return this.number === this.getAnswer(number1, number2, number4);
  };
};

function Person4 (number) {
  this.number = number;
  this.winsCounter = 0;

  this.getAnswer =  function (number1, number2, number3) {
    if (number1 === number2 &&
        number2 === number3) {
      return (number1 + 4)%4 || 4;
    } else if (number1 !== number2 &&
               number2 !== number3 &&
               number3 !== number1) {
      return ((10 - number1 - number2 - number3) + 4) % 4 || 4;
    } else {      
      if (number1 === number2) return (number3 + 4)%4 || 4;
      if (number2 === number3) return (number1 + 4)%4 || 4;
      if (number3 === number1) return (number2 + 4)%4 || 4;      
    }
  };
  
  this.checkAnswer = function (number1, number2, number3) {
    return this.number === this.getAnswer(number1, number2, number3);
  };
};

var dom = {
  numberOfStrategy: 0,
  ñounterWinsInStrategy: 0,
  txt: "",
  
  winCheck: function(persons) {
    var winners = "";        
    var winnersWord = " winners:";
   
    for (var i = 0; i <= 3; i++) {
        if (persons[i].checkAnswer(
              persons[(i + 1) % 4].number, 
              persons[(i + 2) % 4].number, 
              persons[(i + 3) % 4].number)) {
      		winners += " " + (i + 1);
      		persons[i].winsCounter++;
        };
    }; 
    
    winners && dom.ñounterWinsInStrategy++;
           
    return winners && winnersWord + winners;
  },
  
  writeInitialInfo: function () {
    dom.numberOfStrategy++;
    document.getElementById("initialInfo").innerHTML = 
      "Number of strategy: " + 
      dom.numberOfStrategy;
  },
  
  checkCase: function (persons) {
    for (var i = 0; i <= 3; i++) {
      dom.txt += persons[i].number + "(" +
                     persons[i].getAnswer(
        persons[(i + 1) % 4].number, 
        persons[(i + 2) % 4].number, 
        persons[(i + 3) % 4].number) + ") ";
    };
    
    dom.txt += dom.winCheck(persons) + "<br>";
    document.getElementById("checkCase").innerHTML = dom.txt;  
  },
    
  writeGeneralInfo: function(person1, person2, person3, person4) {
  	var infoToWrite =  
      "person1 wins " + person1.winsCounter + " times <br>" +
      "person2 wins " + person2.winsCounter + " times <br>" + 
      "person3 wins " + person3.winsCounter + " times <br>" +
      "person4 wins " + person4.winsCounter + " times <br>" +
      "Total number of wins is " + dom.ñounterWinsInStrategy;
    
    document.getElementById("generalInfo").innerHTML = infoToWrite;
    person1.winsCounter = 0;
    person2.winsCounter = 0;
    person3.winsCounter = 0;
    person4.winsCounter = 0;
    dom.ñounterWinsInStrategy = 0;
  },
};

function main () {
  document.getElementById("myImage").style.display = "none";

  dom.writeInitialInfo();
  
  var person1 = new Person1 (0);
  var person2 = new Person2 (0);
  var person3 = new Person3 (0);
  var person4 = new Person4 (0);
  
  for (a = 1; a <= 4; a++) {
    for (b = 1; b <= 4; b++) {
      for (c = 1; c <= 4; c++) {
        for (d = 1; d <= 4; d++) {
          person1.number = a;
          person2.number = b;
          person3.number = c;
          person4.number = d;
          dom.checkCase([person1, person2, person3, person4]);
        };
      };
    };
  };
  
  dom.writeGeneralInfo(person1, person2, person3, person4);
};

function cleardata () {
  document.getElementById("myImage").style.display = "inline";
  document.getElementById("initialInfo").innerHTML = "";
  document.getElementById("checkCase").innerHTML = "";
  document.getElementById("generalInfo").innerHTML = "";
};