var canvas = document.querySelector('canvas'); 
//canvas.width = window.innerWidth; 
//canvas.height = window.innerHeight; 
//canvas.height = 800; 
var ctx = canvas.getContext('2d');


  var fruit = [
    { name: "Apple", quantity: 20, color: "red" },
    { name: "Orange", quantity: 10, color: "orange" },
    { name: "Banana", quantity: 15, color: "yellow" },
    { name: "Kiwi", quantity: 3, color: "green" },
    { name: "Blueberry", quantity: 5, color: "blue" },
    { name: "Grapes", quantity: 8, color: "purple" },
  ];

  var x=0; 
  function draw() {
      for (var i = 0; i < fruit.length; i++) { //loop goes to each element in the array 
        var obj = fruit[i];
        var y=-30 * obj.quantity; //this will position the size of each fruit to its quantity
        var names = obj.name; 
        var quantityNum = obj.quantity; 

        ctx.fillStyle = obj.color; //so each fruit has its respective color according ot the array 
        ctx.fillRect(x, canvas.height, 100, y); 
        
        ctx.font = "20px Arial"; 
        ctx.fillStyle = "black"; 
        ctx.fillText(names, x, 1180); //get the fruit name outputted 

        ctx.font = "20px Arial"; 
        ctx.fillStyle = "black"; 
        ctx.fillText(quantityNum, x, 1160); //get the quanitity outputted
        x += 100; //to get the rectangles side by side 

      }
    }

    draw(); 
