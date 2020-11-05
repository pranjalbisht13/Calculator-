// Socket setup for front end
var socket = io.connect('/');
var username = prompt('Please enter User name ?')
if (!username){
  username= 'Unknown'
}
// fetching input from keyboard by id screen
let screen = document.getElementById('screen');
let buttons = document.querySelectorAll('button');
let screenValue = "";
let clear ="";


var counter =0;
const inputEl = document.querySelector('input');
inputEl.addEventListener('input', (event) => {
  event.target.value = '';
});
// For clearing the log
localStorage.clear();
var calcList  = new Array();


// function created for adding 10 result in descending order by using stack concept
function add(x){
getdata();
  if (calcList.length==10){
    calcList.pop()
  }
  if (!calcList){
    calcList.push(x);
  }
  else{
    calcList.unshift(x);
  }
  localStorage.setItem("localData", JSON.stringify(calcList));

}
function getdata(){

  var str = localStorage.getItem("localData");
  if (str != null){
  calcList = JSON.parse(str);
}
}
function showdata() {
getdata();
  var calculation = document.getElementById('display');

  for (i=0; i<calcList.length;i++)
  {
    var r = calculation.insertRow();
    var col = r.insertCell();
    col.innerHTML = calcList[i];
  }
}

// loop for using buttons from calculator
for(item of buttons){
  item.addEventListener('click', (e)=>{
      buttonText = e.target.innerText;
      console.log(buttonText);
      if(buttonText== 'X'){
          buttonText ='*';
          screenValue += buttonText;
          screen.value = screenValue ;

      }
     
      else if(buttonText== 'CL'){

          screenValue = screenValue.substring(0, screenValue.length - 1);
          screen.value = screenValue;


      }
      else if(buttonText== '='){
        var output = screenValue + buttonText;
          screenValue = eval(screenValue);
          screen.value = screenValue;
          output=output+screenValue;

          socket.emit('calculate',{
            name: username,
            message:output,
          });
      }
      else if(buttonText== '.'){
          screenValue += buttonText;
          screen.value = screenValue ;
      }
      else if(buttonText=='AC'){

          screenValue = "";
          screen.value = screenValue;
      }
      else {

          screenValue += buttonText;
          screen.value = screenValue ;
      }
  })};

    socket.on('calculate',function(data){

      var calculation = document.getElementById('display');
      var rowCount = calculation.rows.length;
      if (rowCount>=10){
        calculation.deleteRow(rowCount-1);
      }
var newRow = calculation.insertRow(0);
var col = newRow.insertCell(0);

// For Priting result from htmlfile
var tabstring = '<p2><strong>'+ data.name + ': <strong>'+"&emsp;"+ data.message +'<p2>';
col.innerHTML = tabstring;
add(tabstring);

    });

