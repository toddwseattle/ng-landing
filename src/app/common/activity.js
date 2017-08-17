"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
/**
 * IActivity represents an activity for the personal site.  It contains all the basic fields available across all activities
 */
var ACTIVETYPE;
(function (ACTIVETYPE) {
    ACTIVETYPE[ACTIVETYPE["Angel"] = 0] = "Angel";
    ACTIVETYPE[ACTIVETYPE["NonProfit"] = 1] = "NonProfit";
    ACTIVETYPE[ACTIVETYPE["Investment"] = 2] = "Investment";
    ACTIVETYPE[ACTIVETYPE["Class"] = 3] = "Class";
    ACTIVETYPE[ACTIVETYPE["DevProject"] = 4] = "DevProject";
    ACTIVETYPE[ACTIVETYPE["Presentation"] = 5] = "Presentation";
})(ACTIVETYPE = exports.ACTIVETYPE || (exports.ACTIVETYPE = {}));
var Activity = (function () {
    function Activity(name, organization, description, image) {
        this.name = name;
        this.organization = organization;
        this.description = description;
        this.image = image;
        this.current = true;
    }
    return Activity;
}());
exports.Activity = Activity;
var AngelActivity = (function (_super) {
    __extends(AngelActivity, _super);
    function AngelActivity(name, organization, description, image) {
        var _this = _super.call(this, name, organization, description, image) || this;
        _this.name = name;
        _this.organization = organization;
        _this.description = description;
        _this.image = image;
        _this.activetype = ACTIVETYPE.Angel;
        return _this;
    }
    return AngelActivity;
}(Activity));
exports.AngelActivity = AngelActivity;
var NonProfitActivity = (function (_super) {
    __extends(NonProfitActivity, _super);
    function NonProfitActivity(name, organization, description, image) {
        var _this = _super.call(this, name, organization, description, image) || this;
        _this.name = name;
        _this.organization = organization;
        _this.description = description;
        _this.image = image;
        _this.activetype = ACTIVETYPE.NonProfit;
        return _this;
    }
    return NonProfitActivity;
}(Activity));
exports.NonProfitActivity = NonProfitActivity;
var InvestmentActivity = (function (_super) {
    __extends(InvestmentActivity, _super);
    function InvestmentActivity(name, organization, description, image, vehicle) {
        if (vehicle === void 0) { vehicle = 'Angel'; }
        var _this = _super.call(this, name, organization, description, image) || this;
        _this.name = name;
        _this.organization = organization;
        _this.description = description;
        _this.image = image;
        _this.vehicle = vehicle;
        _this.activetype = ACTIVETYPE.Investment;
        return _this;
    }
    return InvestmentActivity;
}(Activity));
exports.InvestmentActivity = InvestmentActivity;
var ClassActivity = (function (_super) {
    __extends(ClassActivity, _super);
    function ClassActivity(name, organization, description, image) {
        var _this = _super.call(this, name, organization, description, image) || this;
        _this.name = name;
        _this.organization = organization;
        _this.description = description;
        _this.image = image;
        _this.activetype = ACTIVETYPE.Class;
        return _this;
    }
    return ClassActivity;
}(Activity));
exports.ClassActivity = ClassActivity;
var DevProjectActivity = (function (_super) {
    __extends(DevProjectActivity, _super);
    function DevProjectActivity(name, organization, description, image) {
        var _this = _super.call(this, name, organization, description, image) || this;
        _this.name = name;
        _this.organization = organization;
        _this.description = description;
        _this.image = image;
        _this.activetype = ACTIVETYPE.DevProject;
        return _this;
    }
    return DevProjectActivity;
}(Activity));
exports.DevProjectActivity = DevProjectActivity;
var PresentationActivity = (function (_super) {
    __extends(PresentationActivity, _super);
    function PresentationActivity(name, organization, description, image) {
        var _this = _super.call(this, name, organization, description, image) || this;
        _this.name = name;
        _this.organization = organization;
        _this.description = description;
        _this.image = image;
        _this.activetype = ACTIVETYPE.Presentation;
        return _this;
    }
    return PresentationActivity;
}(Activity));
exports.PresentationActivity = PresentationActivity;
