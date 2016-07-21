class Fruit {
    constructor(colour) {
        this.colour = colour;
    }

    sing() {
        throw new Error('Fruit cannot sing, stupid');
    }
}

export default class Banana extends Fruit {
    constructor(colour) {
        super(colour);
    }

    sing() {
        return '🎤 lalallaala';
    }
}

const banana = (colour => {
    return new Banana(colour);
})('yellow');

console.log(banana.sing());
