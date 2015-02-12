var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by Jerry on 08.02.2015.
 */
///<reference path="MainGame.ts"/>
var RPSGame;
(function (RPSGame) {
    var SimpleGame = (function (_super) {
        __extends(SimpleGame, _super);
        function SimpleGame() {
            _super.call(this, 800, 600, Phaser.AUTO, 'content', null);
            this.state.add('default', RPSGame.SimpleState, true);
        }
        return SimpleGame;
    })(Phaser.Game);
    RPSGame.SimpleGame = SimpleGame;
})(RPSGame || (RPSGame = {}));
//# sourceMappingURL=Game.js.map