'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Fruit = function () {
    function Fruit(colour) {
        _classCallCheck(this, Fruit);

        this.colour = colour;
    }

    _createClass(Fruit, [{
        key: 'sing',
        value: function sing() {
            throw new Error('Fruit cannot sing, stupid');
        }
    }]);

    return Fruit;
}();

var Banana = function (_Fruit) {
    _inherits(Banana, _Fruit);

    function Banana(colour) {
        _classCallCheck(this, Banana);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Banana).call(this, colour));
    }

    _createClass(Banana, [{
        key: 'sing',
        value: function sing() {
            return '🎤 lalallaala';
        }
    }]);

    return Banana;
}(Fruit);

exports.default = Banana;


var banana = function (colour) {
    return new Banana(colour);
}('yellow');

console.log(banana.sing());