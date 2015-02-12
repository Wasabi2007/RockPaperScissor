/**
 * Created by Jerry on 08.02.2015.
 */
///<reference path="MainGame.ts"/>
module RPSGame {
    export class SimpleGame extends Phaser.Game {
        constructor() {
            super(800, 600, Phaser.AUTO,'content', null);
            this.state.add('default', SimpleState, true);
        }
    }
}
