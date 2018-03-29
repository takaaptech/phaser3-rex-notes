'use strict'

import CSVToArray from './../../plugins/csvtoarray.js';
import runCommands from './../../plugins/runcommands.js';

const Map = Phaser.Structs.Map;

class CmdKlass {
    constructor(scene) {
        this.scene = scene;
        this.objs = new Map();

        // alias function name
        this['create-sprite'] = this.createSprite;
        this['move-sprite-to'] = this.moveSpriteTo;
    }

    // callbacks
    print(msg) {
        console.log(msg);
    }

    createSprite(name, x, y, key) {
        if (this.objs.has(name)) {
            return;
        }
        this.objs.set(name, this.scene.add.sprite(x, y, key));
    }

    moveSpriteTo(name, x, y, duration) {
        var sprite = this.objs.get(name);
        if (sprite == null) {
            return;
        }
        this.scene.tweens.add({
            targets: sprite,
            x: x,
            y: y,
            duration: duration * 1000
        })
    }
}
class Demo extends Phaser.Scene {

    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {
        var csvString = `print,hello
print,world
create-sprite,A,100,100,mushroom
move-sprite-to,A,300,200,1`;

        var myCmds = new CmdKlass(this);

        var cmds = CSVToArray(csvString);

        runCommands(cmds, myCmds, {
            argsConvert: true
        });
    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo
};

var game = new Phaser.Game(config);