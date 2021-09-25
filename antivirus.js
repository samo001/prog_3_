let LivingCreature = require('./LivingCreature')
module.exports = class Kerparr extends LivingCreature{
    constructor(x, y, index) {
		super(x, y, index);
		this.energy = 8
}


  




 

  move() {
      //որոնում է դատարկ տարածքներ
      var fundCords = this.getDirections(0);

      var cord = random(fundCords);

      if (cord) {
          var x = cord[0];
          var y = cord[1];

          //կատարում է տեղափոխություն հիմնական matrix-ում 
          let r = matrix[y][x];
          matrix[y][x] = 5;
          matrix[this.y][this.x] = 0;

          //թարմացնում է սեփական կորդինատները
          this.x = x;
          this.y = y;

      }
  }
  eat() {
      //հետազոտում է շրջակայքը, որոնում է սնունդ
      var fundCords2 = this.getDirections(4);



      var cord = random(fundCords2);

      //եթե կա հարմար սնունդ
      if (cord) {
          var x = cord[0];
          var y = cord[1];

          //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը
          //իր հին տեղը դնում է դատարկ վանդակ
          matrix[y][x] = 5;
          matrix[this.y][this.x] = 0;

          //փոխում է սեփական կորդինատները օբյեկտի մեջ
          this.x = x;
          this.y = y;

          //բազմացման գործակիցը մեծացնում է
          this.multiply++;

          //մեծացնում է էներգիան
          this.energy++;

          //!!! ԿԱՐԵՎՈՐ !!! սննդի զանգվածից ջնջում է կերված սնունդը
          //խոտակերի համար դա խոտն է, խոտերի զանգվածի մեջ xotArr
          for (var i in kerparArr) {
              if (x == kerparArr[i].x && y == kerparArr[i].y) {
                  kerparArr.splice(i, 1);
              }
          }


          //եթե պատրաստ է բազմացմանը, բազմանում է 
          if (this.multiply == 1) {
              this.mul()
              this.multiply = 0;
          }

      }
      else {
          //եթե չկա հարմար սնունդ 
          this.move();
          this.energy--;
          if (this.energy < 1) { //մահանում է, եթե էներգիան 3֊ից ցածր է
              this.die();
          }
      }
  }
  mul() {
      //փնտրում է դատարկ տարածք
      var fundCords2 = this.getDirections(0);
      var cord = random(fundCords2);

      //եթե կա բազմանում է+
      if (cord) {
          var x = cord[0];
          var y = cord[1];

          this.multiply++;

          //ստեղծում է նոր օբյեկտ (այստեղ խոտակեր) 
          //և տեղադրում է այն խոտակերների զանգվածի մեջ
          var norkerparr = new Kerparr(x, y, this.index);
          kerparrArr.push(norkerparr);

          //հիմնական matrix-ում կատարում է գրառում նոր խոտի մասին
          matrix[y][x] = 5;
          this.multiply = 0; //????????
      }
  }
  die() {
      //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
      matrix[this.y][this.x] = 0;

      //!!! ԿԱՐԵՎՈՐ !!! ջնջում է ինքն իրեն խոտակերների զանգվածից
      for (var i in kerparrArr) {
          if (this.x == kerparrArr[i].x && this.y == kerparrArr[i].y) {
              kerparrArr.splice(i, 1);
          }
      }
  }

}