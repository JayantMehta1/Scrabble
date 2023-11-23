// Generated by CoffeeScript 1.3.3
(function() {
  var Valett;

  Valett = (function() {

    function Valett() {}

    Valett.prototype.init = function(words, letters) {
      var i, _i, _ref;
      this.words = words;
      this.letters = letters;
      this.hash = {};
      for (i = _i = 0, _ref = this.letters.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        this.hash[this.letters[i]] = i;
      }
      return this._metadata();
    };

    Valett.prototype.analyze = function(maxValue, weights, frequencyByLengthWeights, entropyWeights) {
      var entropyValues, frequencyByLengthValues, frequencyValues, i, j, maxUtility, normedEntropyWeights, normedFrequencyByLengthWeights, utility, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _s;
      normedFrequencyByLengthWeights = this.norm(frequencyByLengthWeights);
      normedEntropyWeights = this.norm(entropyWeights);
      frequencyByLengthValues = [];
      entropyValues = [];
      frequencyValues = this.norm(this.metadata.frequency);
      frequencyByLengthValues = this.transposeMatrix(this.normMatrix(this.transposeMatrix(this.metadata.frequencyByLength)));
      for (i = _i = 0; _i <= 1; i = ++_i) {
        entropyValues[i] = this.norm(this.metadata.entropy[i]);
      }
      utility = [];
      for (i = _j = 0, _ref = this.letters.length; 0 <= _ref ? _j < _ref : _j > _ref; i = 0 <= _ref ? ++_j : --_j) {
        utility[i] = 0;
      }
      for (i = _k = 0, _ref1 = this.letters.length; 0 <= _ref1 ? _k < _ref1 : _k > _ref1; i = 0 <= _ref1 ? ++_k : --_k) {
        utility[i] += frequencyValues[i] * weights.frequency;
      }
      for (i = _l = 0, _ref2 = this.metadata.maxLength; 0 <= _ref2 ? _l < _ref2 : _l > _ref2; i = 0 <= _ref2 ? ++_l : --_l) {
        for (j = _m = 0, _ref3 = this.letters.length; 0 <= _ref3 ? _m < _ref3 : _m > _ref3; j = 0 <= _ref3 ? ++_m : --_m) {
          utility[j] += frequencyByLengthValues[j][i] * normedFrequencyByLengthWeights[i] * weights.frequencyByLength;
        }
      }
      for (i = _n = 0; _n <= 1; i = ++_n) {
        for (j = _o = 0, _ref4 = this.letters.length; 0 <= _ref4 ? _o < _ref4 : _o > _ref4; j = 0 <= _ref4 ? ++_o : --_o) {
          utility[j] += entropyValues[i][j] * normedEntropyWeights[i] * weights.entropy;
        }
      }
      for (i = _p = 0, _ref5 = this.letters.length; 0 <= _ref5 ? _p < _ref5 : _p > _ref5; i = 0 <= _ref5 ? ++_p : --_p) {
        utility[i] = 1 / utility[i];
      }
      maxUtility = 0;
      for (i = _q = 0, _ref6 = this.letters.length; 0 <= _ref6 ? _q < _ref6 : _q > _ref6; i = 0 <= _ref6 ? ++_q : --_q) {
        if (utility[i] > maxUtility) {
          maxUtility = utility[i];
        }
      }
      for (i = _r = 0, _ref7 = this.letters.length; 0 <= _ref7 ? _r < _ref7 : _r > _ref7; i = 0 <= _ref7 ? ++_r : --_r) {
        utility[i] /= maxUtility;
      }
      for (i = _s = 0, _ref8 = this.letters.length; 0 <= _ref8 ? _s < _ref8 : _s > _ref8; i = 0 <= _ref8 ? ++_s : --_s) {
        utility[i] = Math.round(utility[i] * maxValue);
      }
      return this.values = utility;
    };

    Valett.prototype.norm = function(vector) {
      var i, normedVector, num, sum, _i, _j, _len, _ref;
      sum = 0;
      normedVector = [];
      for (_i = 0, _len = vector.length; _i < _len; _i++) {
        num = vector[_i];
        sum += num;
      }
      for (i = _j = 0, _ref = vector.length; 0 <= _ref ? _j < _ref : _j > _ref; i = 0 <= _ref ? ++_j : --_j) {
        if (sum) {
          normedVector[i] = vector[i] / sum;
        } else {
          normedVector[i] = 0;
        }
      }
      return normedVector;
    };

    Valett.prototype.normMatrix = function(matrix) {
      var i, normedMatrix, _i, _j, _ref, _ref1;
      normedMatrix = [];
      for (i = _i = 0, _ref = matrix.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        normedMatrix[i] = [];
      }
      for (i = _j = 0, _ref1 = matrix.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
        normedMatrix[i] = this.norm(matrix[i]);
      }
      return normedMatrix;
    };

    Valett.prototype.transposeMatrix = function(matrix) {
      var i, j, transposedMatrix, _i, _j, _k, _ref, _ref1, _ref2;
      transposedMatrix = [];
      for (i = _i = 0, _ref = matrix[0].length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        transposedMatrix[i] = [];
      }
      for (i = _j = 0, _ref1 = matrix[0].length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
        for (j = _k = 0, _ref2 = matrix.length; 0 <= _ref2 ? _k < _ref2 : _k > _ref2; j = 0 <= _ref2 ? ++_k : --_k) {
          transposedMatrix[i][j] = matrix[j][i];
        }
      }
      return transposedMatrix;
    };

    Valett.prototype._metadata = function() {
      this.metadata = {};
      this._maxLength();
      this._frequency();
      this._frequencyByLength();
      this._transitionFrequency();
      return this._entropy();
    };

    Valett.prototype._maxLength = function() {
      var word, _i, _len, _ref, _results;
      this.metadata.maxLength = 0;
      _ref = this.words;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        word = _ref[_i];
        if (word.length > this.metadata.maxLength) {
          _results.push(this.metadata.maxLength = word.length);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Valett.prototype._frequency = function() {
      var i, letter, word, _i, _j, _len, _ref, _ref1, _results;
      this.metadata.frequency = [];
      for (i = _i = 0, _ref = this.letters.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        this.metadata.frequency[i] = 0;
      }
      _ref1 = this.words;
      _results = [];
      for (_j = 0, _len = _ref1.length; _j < _len; _j++) {
        word = _ref1[_j];
        if (word.length) {
          _results.push((function() {
            var _k, _len1, _results1;
            _results1 = [];
            for (_k = 0, _len1 = word.length; _k < _len1; _k++) {
              letter = word[_k];
              _results1.push(this.metadata.frequency[this.hash[letter]]++);
            }
            return _results1;
          }).call(this));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Valett.prototype._frequencyByLength = function() {
      var i, j, letter, word, _i, _j, _k, _l, _len, _len1, _m, _n, _ref, _ref1, _ref2, _ref3, _ref4, _results;
      this.metadata.frequencyByLength = [];
      this.metadata.totalFrequencyByLength = [];
      for (i = _i = 0, _ref = this.letters.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        this.metadata.frequencyByLength[i] = [];
        for (j = _j = 0, _ref1 = this.metadata.maxLength; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
          this.metadata.frequencyByLength[i][j] = 0;
        }
      }
      for (i = _k = 0, _ref2 = this.metadata.maxLength; 0 <= _ref2 ? _k < _ref2 : _k > _ref2; i = 0 <= _ref2 ? ++_k : --_k) {
        this.metadata.totalFrequencyByLength[i] = 0;
      }
      _ref3 = this.words;
      for (_l = 0, _len = _ref3.length; _l < _len; _l++) {
        word = _ref3[_l];
        this.metadata.totalFrequencyByLength[word.length - 1] += word.length;
        for (_m = 0, _len1 = word.length; _m < _len1; _m++) {
          letter = word[_m];
          this.metadata.frequencyByLength[this.hash[letter]][word.length - 1]++;
        }
      }
      _results = [];
      for (i = _n = 0, _ref4 = this.letters.length; 0 <= _ref4 ? _n < _ref4 : _n > _ref4; i = 0 <= _ref4 ? ++_n : --_n) {
        _results.push((function() {
          var _o, _ref5, _results1;
          _results1 = [];
          for (j = _o = 0, _ref5 = this.metadata.maxLength; 0 <= _ref5 ? _o < _ref5 : _o > _ref5; j = 0 <= _ref5 ? ++_o : --_o) {
            if (this.metadata.totalFrequencyByLength[j] !== 0) {
              _results1.push(this.metadata.frequencyByLength[i][j] /= this.metadata.totalFrequencyByLength[j]);
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    Valett.prototype._transitionFrequency = function() {
      var i, j, letter, word, _i, _j, _k, _len, _ref, _ref1, _ref2, _results;
      this.metadata.transitionFrequency = [];
      for (i = _i = 0, _ref = this.letters.length; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        this.metadata.transitionFrequency[i] = [];
        for (j = _j = 0, _ref1 = this.letters.length; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
          this.metadata.transitionFrequency[i][j] = 0;
        }
      }
      _ref2 = this.words;
      _results = [];
      for (_k = 0, _len = _ref2.length; _k < _len; _k++) {
        word = _ref2[_k];
        _results.push((function() {
          var _l, _len1, _results1;
          _results1 = [];
          for (i = _l = 0, _len1 = word.length; _l < _len1; i = ++_l) {
            letter = word[i];
            if (i === 0) {
              this.metadata.transitionFrequency[this.letters.length][this.hash[letter]]++;
              _results1.push(this.metadata.transitionFrequency[this.hash[letter]][this.hash[word[i + 1]]]++);
            } else if (i === word.length - 1) {
              this.metadata.transitionFrequency[this.hash[word[i - 1]]][this.hash[letter]]++;
              _results1.push(this.metadata.transitionFrequency[this.hash[letter]][this.letters.length]++);
            } else {
              this.metadata.transitionFrequency[this.hash[word[i - 1]]][this.hash[letter]]++;
              _results1.push(this.metadata.transitionFrequency[this.hash[letter]][this.hash[word[i + 1]]]++);
            }
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    Valett.prototype._entropy = function() {
      var i, inOut, j, k, _i, _j, _k, _l, _ref, _ref1, _results;
      inOut = [];
      inOut[0] = this.normMatrix(this.transposeMatrix(this.metadata.transitionFrequency));
      inOut[1] = this.normMatrix(this.metadata.transitionFrequency);
      for (i = _i = 0; _i <= 1; i = ++_i) {
        for (j = _j = 0, _ref = this.letters.length; 0 <= _ref ? _j <= _ref : _j >= _ref; j = 0 <= _ref ? ++_j : --_j) {
          for (k = _k = 0, _ref1 = this.letters.length; 0 <= _ref1 ? _k <= _ref1 : _k >= _ref1; k = 0 <= _ref1 ? ++_k : --_k) {
            if (inOut[i][j][k] === 0) {
              inOut[i][j][k] = .000000001;
            }
          }
        }
      }
      this.metadata.entropy = [[], []];
      _results = [];
      for (i = _l = 0; _l <= 1; i = ++_l) {
        _results.push((function() {
          var _m, _ref2, _results1;
          _results1 = [];
          for (j = _m = 0, _ref2 = this.letters.length; 0 <= _ref2 ? _m < _ref2 : _m > _ref2; j = 0 <= _ref2 ? ++_m : --_m) {
            this.metadata.entropy[i][j] = 0;
            _results1.push((function() {
              var _n, _ref3, _results2;
              _results2 = [];
              for (k = _n = 0, _ref3 = this.letters.length; 0 <= _ref3 ? _n <= _ref3 : _n >= _ref3; k = 0 <= _ref3 ? ++_n : --_n) {
                _results2.push(this.metadata.entropy[i][j] -= inOut[i][j][k] * (Math.log(inOut[i][j][k]) / Math.LN2));
              }
              return _results2;
            }).call(this));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    return Valett;

  })();

  module.exports = new Valett;

}).call(this);
