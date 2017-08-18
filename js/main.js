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
  dom.writeGeneralInfo(person1, person2, person3, person4);
  document.getElementById("totalRows").innerHTML = dom.combinationTxt.length;
  document.getElementById("numberCombinationsInPage").disabled = false;
  document.getElementById("numberCombinationsInPage").value = 5;
  document.getElementById("numberCombinationsInPageOverlay").style.display = "none";
  document.getElementById("startRow").disabled = false;
  document.getElementById("startRowOverlay").style.display = "none";
  document.getElementById("errorMessage").style.visibility  = "hidden";
  document.getElementById("pagination").style.display = "inline-block";
  dom.pageNumber(0);

  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
};

function resetData () {
  document.getElementById("Reset").style.display = "none";
  document.getElementById("Start").style.display = "inline";
  document.getElementById("tableBody").innerHTML = "";
  document.getElementById("table2Body").innerHTML = "";
  document.getElementById("table2v2").innerHTML =
      "<tbody><tr><th>Persons</th><td>A</td><td>B</td><td>C</td><td>D</td></tr>" +
                 "<th>Wins count</th><td></td><td></td><td></td><td></td></tr></tbody>";
  document.getElementById("initialInfo").innerHTML = "";
  document.getElementById("generalInfo").innerHTML = "";
  document.getElementById("totalRows").innerHTML = 0;
  document.getElementById("numberCombinationsInPage").value = "";
  document.getElementById("numberCombinationsInPage").disabled = true;
  document.getElementById("numberCombinationsInPageOverlay").style.display = "inline-block";
  dom.rowInPage = 5;
  document.getElementById("startRow").value = "";
  document.getElementById("startRow").disabled = true;
  document.getElementById("startRowOverlay").style.display = "inline-block";
  dom.firstVisibleRow = 0;
  document.getElementById("pagination").style.display = "none";
  document.getElementById("returnToTopBottomBuckground").style.display = "none";
  document.getElementById("errorMessage").style.visibility  = "hidden";
};

window.onscroll = function() {
    if (document.body.offsetHeight > document.documentElement.clientHeight) {
      document.getElementById("returnToTopBottomBuckground").style.display = "inline";
      document.getElementById("returnToBottom").style.display = "inline";
    } else {
      document.getElementById("returnToBottom").style.display = "none"; 
    };


    if (window.pageYOffset >= 1) {
      document.getElementById("returnToTop").style.display = "inline";     
    } else {
      document.getElementById("returnToTop").style.display = "none";
    };

    if (window.pageYOffset > document.body.offsetHeight - document.documentElement.clientHeight - 1) {
      document.getElementById("returnToBottom").style.display = "none"; 
    };
};

window.onload = function() {
  main();
};