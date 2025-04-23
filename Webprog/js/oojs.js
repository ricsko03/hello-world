class Animal {
    constructor(name, sound) {
        this.name = name;
        this.sound = sound;
    }

    speak() {
        return `${this.name} azt mondja: ${this.sound}`;
    }

    render() {
        const p = document.createElement("p");
        p.textContent = this.speak();
        document.getElementById("animalList").appendChild(p);
    }
}

class Dog extends Animal {
    constructor() {
        super("Kutya", "Vau!");
    }
}

class Cat extends Animal {
    constructor() {
        super("Macska", "Miau!");
    }
}

function addDog() {
    const dog = new Dog();
    dog.render();
}

function addCat() {
    const cat = new Cat();
    cat.render();
}
