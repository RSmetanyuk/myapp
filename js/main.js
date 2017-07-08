function main () {
  document.getElementById("Reset").style.display = "inline";
  document.getElementById("Start").style.display = "none";
  dom.combinationTxt = [];

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
          dom.combinationCounter++;          
        };
      };
    };
  };
  dom.pageNumber(0);
  dom.writeGeneralInfo(person1, person2, person3, person4);
  document.getElementById("combinationsInPageList").disabled = false;
  document.getElementById("startRow").disabled = false;
  document.getElementById("hide").style.display = "inline";
};

function resetData () {
  document.getElementById("Reset").style.display = "none";
  document.getElementById("Start").style.display = "inline";
  document.getElementById("tableBody").innerHTML = "";
  document.getElementById("table2Body").innerHTML = "";
  document.getElementById("initialInfo").innerHTML = "";
  document.getElementById("generalInfo").innerHTML = "";
  document.getElementById("combinationsInPageList").disabled = true;
  document.getElementById("startRow").disabled = true;
  document.getElementById("hide").style.display = "none";
};

window.onscroll = function() {
    if (document.body.offsetHeight > document.documentElement.clientHeight) {
      document.getElementById("returnToBottom").style.display = "inline"; 
    } else {
      document.getElementById("returnToBottom").style.display = "none"; 
    };


    if (window.pageYOffset >= 150) {
      document.getElementById("returnToTop").style.display = "inline";     
    } else {
      document.getElementById("returnToTop").style.display = "none";
    };

    if (window.pageYOffset > document.body.offsetHeight - document.documentElement.clientHeight - 20) {
      document.getElementById("returnToBottom").style.display = "none"; 
    };
};

window.onload = function() {
  main();
};


var moveSteps = "";
var stasrtMove = 2;
var topPozition = 0;

function up() {
  stasrtMove = 2;
  moveSteps = "";
  topPozition = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
  upMove();
}


function upMove() {
  var top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
  var t;
  if(top > topPozition/2) {
    window.scrollBy(0, stasrtMove/-1);
    stasrtMove *= 1.14;
    moveSteps += stasrtMove + " / ";
    t = setTimeout('upMove()',20);
   } else if (top > 0) {
    var j = (top+20)/-7.8;
    window.scrollBy(0, j);
    moveSteps += j + " / ";
    t = setTimeout('upMove()',20);
   } else {
    clearTimeout(t);
    //alert (moveSteps);
    };
   return false;
};