System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Warp10Query;
    return {
        setters: [],
        execute: function () {
            Warp10Query = /** @class */ (function () {
                function Warp10Query() {
                    this.readToken = '';
                    this.className = '';
                    this.labels = {};
                    this.bucketizer = null;
                    this.bucketCount = 50;
                    this.reducer = null;
                    this.reducerLabels = [];
                    this.filter = null;
                    this.filterLabels = [];
                    this.filterParamNumber = 0;
                    this.filterParamMap = {};
                    this.filterParamClass = '';
                    this.bucketizers = [
                        'sum', 'max', 'min', 'mean', 'mean.circular', 'bucketizer.mean.circular.exclude-nulls', 'first', 'last', 'join', 'median', 'count', 'and', 'or'
                    ];
                    this.reducers = [
                        'argmax', 'argmin', 'count', 'count.exclude-nulls', 'count.include-nulls', 'join', 'join.forbid-nulls', 'max', 'max.forbid-nulls', 'mean', 'mean.exclude-nulls', 'mean.circular', 'mean.circular.exclude-nulls', 'median', 'min', 'min.forbid-nulls', 'and', 'and.exclude-nulls', 'or', 'or.exclude-nulls', 'sd', 'shannonentropy.0', 'shannonentropy.1', 'sum', 'sum.forbid-nulls', 'var'
                    ];
                    this.filters = [
                        { name: 'byclass', type: 'S' },
                        { name: 'bylabels', type: 'M' },
                        { name: 'last.eq', type: 'N' },
                        { name: 'last.ne', type: 'N' },
                        { name: 'last.gt', type: 'N' },
                        { name: 'last.ge', type: 'N' },
                        { name: 'last.lt', type: 'N' },
                        { name: 'last.le', type: 'N' }
                    ];
                }
                Warp10Query.prototype.addLabel = function (key, val) {
                    this.labels[key] = val;
                };
                Warp10Query.prototype.delLabel = function (key) {
                    delete this.labels[key];
                };
                Warp10Query.prototype.addReducerLabel = function (key) {
                    this.reducerLabels.push(key);
                };
                Warp10Query.prototype.delReducerLabel = function (key) {
                    var i = this.reducerLabels.indexOf(key);
                    if (i != -1)
                        this.reducerLabels.splice(i, 1);
                };
                Warp10Query.prototype.addFilterLabel = function (key) {
                    this.filterLabels.push(key);
                };
                Warp10Query.prototype.delFilterLabel = function (key) {
                    var i = this.filterLabels.indexOf(key);
                    if (i != -1)
                        this.filterLabels.splice(i, 1);
                };
                Warp10Query.prototype.addFilterParamMapLabel = function (key, val) {
                    this.filterParamMap[key] = val;
                };
                Warp10Query.prototype.delFilterParamMapLabel = function (key) {
                    delete this.filterParamMap[key];
                };
                Warp10Query.formatStringVar = function (s) {
                    return s.startsWith('$') ? s : "'" + s + "'";
                };
                Object.defineProperty(Warp10Query.prototype, "warpScript", {
                    get: function () {
                        var f = Warp10Query.formatStringVar;
                        var q = '// QUERY BUILDER : AUTOGENERATED \n';
                        var labelsStr = '';
                        for (var label in this.labels) {
                            labelsStr += f(label) + " " + f(this.labels[label]) + " ";
                        }
                        q += "[ " + f(this.readToken) + " " + f(this.className) + " { " + labelsStr + " } $end $interval ] FETCH \n";
                        if (this.bucketizer)
                            q += "[ SWAP " + this.bucketizer + " $end $interval " + this.bucketCount + " / " + this.bucketCount + " ] BUCKETIZE \n";
                        if (this.reducer) {
                            var labels = this.reducerLabels.map(function (label) {
                                return "" + f(label);
                            });
                            q += "[ SWAP [ " + labels.join(' ') + " ] " + this.reducer + " ] REDUCE \n";
                        }
                        if (this.filter) {
                            var chosenFilter = this.filters[this.filter];
                            var labelsStr_1 = this.filterLabels.map(function (label) {
                                return f(label);
                            });
                            var param = void 0;
                            switch (chosenFilter.type) {
                                case 'S':
                                    param = f(this.filterParamClass);
                                    break;
                                case 'M':
                                    param = "'" + JSON.stringify(this.filterParamMap) + "' JSON->";
                                    break;
                                case 'N':
                                    param = this.filterParamNumber;
                                    break;
                            }
                            q += "[ SWAP [ " + labelsStr_1.join(' ') + " ] " + param + " filter." + chosenFilter.name + " ] FILTER \n";
                        }
                        q += 'SORT \n';
                        q += "// END OF GENERATED QUERY \n";
                        return q;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Warp10Query;
            }());
            exports_1("Warp10Query", Warp10Query);
        }
    };
});
