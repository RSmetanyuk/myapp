function main () {

  var person1 = new Person1 ();
  var person2 = new Person2 ();
  var person3 = new Person3 ();
  var person4 = new Person4 ();
  
  for (a = 1; a <= 4; a++) {
    for (b = 1; b <= 4; b++) {
      for (c = 1; c <= 4; c++) {
        for (d = 1; d <= 4; d++) {
          person1.number = a;
          person2.number = b;
          person3.number = c;
          person4.number = d;
          dom.checkCase([person1, person2, person3, person4]);
          dom.counterOfCombinations++;
        };
      };
    };
  };
  dom.writeGeneralInfo(person1, person2, person3, person4);
  dom.setFirstVisibleRow(0);
  dom.onStartup();
};

window.onload = main;

window.onscroll = dom.onScrollHandler;