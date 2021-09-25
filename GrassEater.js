let LivingCreature = require('./LivingCreature')



module.exports = class EatGrass extends LivingCreature{
	constructor(x, y, index) {
		super(x, y, index);
		this.energy = 8
}

  

    move() {
		var emptyCells = super.chooseCell(0);
		var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

		if (newCell) {
			var newX = newCell[0];
			var newY = newCell[1];

			matrix[newY][newX] = matrix[this.y][this.x];
			matrix[this.y][this.x] = 0;

			this.x = newX;
			this.y = newY
		}

		this.energy--;
		if (this.energy <= 0) {
			this.die();
		}


	}
	eat() {
		var grassCells = super.chooseCell(1);
		var newCell = grassCells[Math.floor(Math.random() * grassCells.length)]

		if (newCell) {

			var newX = newCell[0];
			var newY = newCell[1];

			matrix[newY][newX] = matrix[this.y][this.x];
			matrix[this.y][this.x] = 0;

			for (var i in grassArr) {
				if (grassArr[i].x == newX && grassArr[i].y == newY) {
					grassArr.splice(i, 1)
				}
			}

			this.x = newX;
			this.y = newY;
			this.energy++;

			if (this.energy >= 12) {
				this.mul();
				this.energy = 8
			}

		}
		else {
			this.move();
		}
	}

    mul() {
        this.multiply++;
        if (this.multiply >= 5) {
            let emptyCells = super.chooseCell(0)
            let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
            if (this.multiply >= 5 && newCell) {
                let x = newCell[0]
                let y = newCell[1]
                matrix[y][x] = 1
                grassArr.push(new Grass(x, y, 1))
                this.multiply = 0;
            }
            if (weath == "winter") {
                this.energy -= 2;
                this.multiply -= 0;
            }
            if (weath == "spring") {
                this.energy += 2;
                this.multiply += 5;
            }
            if (weath == "summer") {
                this.energy += 5;
                this.multiply += 2;
            }
            if (weath == "autumn") {
                this.energy += 0;
                this.multiply += 0;
        }
    }
}

	die() {
		matrix[this.y][this.x] = 0;
		for (var i in grassEaterArr) {
			if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
				grassEaterArr.splice(i, 1)
			}
		}
	}
}