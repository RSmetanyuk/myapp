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