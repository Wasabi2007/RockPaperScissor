/**
 * Created by Jerry on 08.02.2015.
 */
///<reference path="build/phaser.d.ts"/>
module RPSGame {
    export class SimpleState extends Phaser.State {
        /*constructor() {
         this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: SimpleGame.prototype.preload, create: SimpleGame.prototype.create, update: SimpleGame.prototype.update });
         }*/
        //game:Phaser.Game;
        logo:Phaser.Sprite;
        label:Phaser.Text;
        label2:Phaser.Text;
        points:Phaser.Text;
        rock:Phaser.Button;
        paper:Phaser.Button;
        scissor:Phaser.Button;

        hummanScore:number;
        AIScore:number;

        PlayerInput:string;
        aiInput:string;
        inputhistory:string;
        inputcounter:{ [index: string] : string ; } = {};
        short2Long:{ [index: string] : string ; } = {};

        preload() {
            this.load.image('logo', 'phaser.png');
            this.load.spritesheet('button', 'rock-paper-scissors.png', 89, 89);

        }

        create() {

            this.inputcounter = {'p': 's', 'r': 'p', 's': 'r'};

            this.short2Long = {'p': 'Paper', 'r': 'Rock', 's': 'Scissor'};

            //this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
            this.stage.setBackgroundColor('FFF');

            var style = { font: "12px Arial", fill: "#000000", align: "center" };

            this.label = this.add.text(this.world.centerX - 100, this.world.centerY - 100, "Choice",style);
            this.label2 = this.add.text(this.world.centerX + 100, this.world.centerY - 100, "PC Choice",style);

            this.points = this.add.text(this.world.centerX, this.world.centerY - 200, "Score",style);

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


        }

        update():void {
            /*if(this.game.input.keyboard.isDown(Phaser.Keyboard.A)){
             this.logo.scale.add(.1,.1);
             }
             if(this.game.input.keyboard.isDown(Phaser.Keyboard.D)){
             this.logo.scale.subtract(.1,.1);
             }*/
        }

        over(button:Phaser.Button):void {
            button.scale.setTo(1.5, 1.5);
        }

        out(button:Phaser.Button):void {
            button.scale.setTo(1, 1);
        }

        pickRock():void {
            this.actionOnClick('r');
        }

        pickPaper():void {
            this.actionOnClick('p');
        }

        pickScissor():void {
            console.log(this.short2Long['s']);
            this.actionOnClick('s');
        }

        actionOnClick(input:string):void {
            this.label.text = "Player: "+this.short2Long[input];
            this.label2.text = "AI: "+this.short2Long[this.aiInput];
            this.PlayerInput = input;

            if (this.inputcounter[input] == this.aiInput) {
                this.AIScore++;
            } else if (this.inputcounter[this.aiInput] == input) {
                this.hummanScore++;
            }

            this.points.text = "H: " + this.hummanScore + " AI: " + this.AIScore;
            this.inputhistory += input;
            this.aiInput = this.pickCounter();
        }

        pickCounter():string {

            if (this.inputhistory.length > 4) {
                var history = this.inputhistory.substr(-5, 5);
                var sPick = this.analysepast(history + 's');
                var rPick = this.analysepast(history + 'r');
                var pPick = this.analysepast(history + 'p');
                if (sPick > rPick && sPick > pPick) {
                    return this.inputcounter['s'];
                } else if (rPick > sPick && rPick > pPick) {
                    return this.inputcounter['r'];
                } else if (pPick > sPick && pPick > rPick) {
                    return this.inputcounter['p'];
                }
            }

            var r = Math.random() * 3;
            if (r >= 2) {
                return 'r';
            } else if (r >= 1) {
                return 'p';
            } else {
                return 's';
            }


        }

        analysepast(input:string):number {
            var matches = this.inputhistory.match(input);
            return (matches == null ? 0 : matches.length);
        }

    }
}