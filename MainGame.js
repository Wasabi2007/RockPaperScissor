var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by Jerry on 08.02.2015.
 */
///<reference path="build/phaser.d.ts"/>
var RPSGame;
(function (RPSGame) {
    var SimpleState = (function (_super) {
        __extends(SimpleState, _super);
        function SimpleState() {
            _super.apply(this, arguments);
            this.inputcounter = {};
            this.short2Long = {};
        }
        SimpleState.prototype.preload = function () {
            this.load.image('logo', 'phaser.png');
            this.load.spritesheet('button', 'rock-paper-scissors.png', 89, 89);
        };
        SimpleState.prototype.create = function () {
            this.inputcounter = { 'p': 's', 'r': 'p', 's': 'r' };
            this.short2Long = { 'p': 'Paper', 'r': 'Rock', 's': 'Scissor' };
            //this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
            this.stage.setBackgroundColor('FFF');
            var style = { font: "12px Arial", fill: "#000000", align: "center" };
            this.label = this.add.text(this.world.centerX - 100, this.world.centerY - 100, "Choice", style);
            this.label2 = this.add.text(this.world.centerX + 100, this.world.centerY - 100, "PC Choice", style);
            this.points = this.add.text(this.world.centerX, this.world.centerY - 200, "Score", style);
            this.paper = this.add.button(this.world.centerX - 90 * 1.5, this.world.centerY, 'button', this.pickPaper, this, 2, 2, 2);
            this.rock = this.add.button(this.world.centerX, this.world.centerY, 'button', this.pickRock, this, 0, 0, 0);
            this.scissor = this.add.button(this.world.centerX + 90 * 1.5, this.world.centerY, 'button', this.pickScissor, this, 1, 1, 1);
            //this.logo.anchor.setTo(0.5, 0.5);
            //this.logo.scale.setTo(.5, .5);
            this.paper.anchor.setTo(0.5, 0.5);
            this.rock.anchor.setTo(0.5, 0.5);
            this.scissor.anchor.setTo(0.5, 0.5);
            this.paper.onInputOver.add(this.over, this);
            this.paper.onInputDown.add(this.over, this);
            this.paper.onInputOut.add(this.out, this);
            this.paper.onInputUp.add(this.out, this);
            this.rock.onInputOver.add(this.over, this);
            this.rock.onInputDown.add(this.over, this);
            this.rock.onInputOut.add(this.out, this);
            this.rock.onInputUp.add(this.out, this);
            this.scissor.onInputOver.add(this.over, this);
            this.scissor.onInputDown.add(this.over, this);
            this.scissor.onInputOut.add(this.out, this);
            this.scissor.onInputUp.add(this.out, this);
            this.aiInput = 'r';
            this.inputhistory = '';
            this.hummanScore = 0;
            this.AIScore = 0;
            this.aiInput = this.pickCounter();
        };
        SimpleState.prototype.update = function () {
            /*if(this.game.input.keyboard.isDown(Phaser.Keyboard.A)){
             this.logo.scale.add(.1,.1);
             }
             if(this.game.input.keyboard.isDown(Phaser.Keyboard.D)){
             this.logo.scale.subtract(.1,.1);
             }*/
        };
        SimpleState.prototype.over = function (button) {
            button.scale.setTo(1.5, 1.5);
        };
        SimpleState.prototype.out = function (button) {
            button.scale.setTo(1, 1);
        };
        SimpleState.prototype.pickRock = function () {
            this.actionOnClick('r');
        };
        SimpleState.prototype.pickPaper = function () {
            this.actionOnClick('p');
        };
        SimpleState.prototype.pickScissor = function () {
            console.log(this.short2Long['s']);
            this.actionOnClick('s');
        };
        SimpleState.prototype.actionOnClick = function (input) {
            this.label.text = "Player: " + this.short2Long[input];
            this.label2.text = "AI: " + this.short2Long[this.aiInput];
            this.PlayerInput = input;
            if (this.inputcounter[input] == this.aiInput) {
                this.AIScore++;
            }
            else if (this.inputcounter[this.aiInput] == input) {
                this.hummanScore++;
            }
            this.points.text = "H: " + this.hummanScore + " AI: " + this.AIScore;
            this.inputhistory += input;
            this.aiInput = this.pickCounter();
        };
        SimpleState.prototype.pickCounter = function () {
            if (this.inputhistory.length > 4) {
                var history = this.inputhistory.substr(-5, 5);
                var sPick = this.analysepast(history + 's');
                var rPick = this.analysepast(history + 'r');
                var pPick = this.analysepast(history + 'p');
                if (sPick > rPick && sPick > pPick) {
                    return this.inputcounter['s'];
                }
                else if (rPick > sPick && rPick > pPick) {
                    return this.inputcounter['r'];
                }
                else if (pPick > sPick && pPick > rPick) {
                    return this.inputcounter['p'];
                }
            }
            var r = Math.random() * 3;
            if (r >= 2) {
                return 'r';
            }
            else if (r >= 1) {
                return 'p';
            }
            else {
                return 's';
            }
        };
        SimpleState.prototype.analysepast = function (input) {
            var matches = this.inputhistory.match(input);
            return (matches == null ? 0 : matches.length);
        };
        return SimpleState;
    })(Phaser.State);
    RPSGame.SimpleState = SimpleState;
})(RPSGame || (RPSGame = {}));
//# sourceMappingURL=MainGame.js.map