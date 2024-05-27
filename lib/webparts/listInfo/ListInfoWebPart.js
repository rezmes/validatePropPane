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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { BaseClientSideWebPart, PropertyPaneTextField } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';
import { escape } from '@microsoft/sp-lodash-subset';
import styles from './ListInfoWebPart.module.scss';
import * as strings from 'ListInfoWebPartStrings';
var ListInfoWebPart = (function (_super) {
    __extends(ListInfoWebPart, _super);
    function ListInfoWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListInfoWebPart.prototype.render = function () {
        this.domElement.innerHTML = "\n      <div class=\"" + styles.listInfo + "\">\n        <div class=\"" + styles.container + "\">\n          <div class=\"" + styles.row + "\">\n            <div class=\"" + styles.column + "\">\n              <span class=\"" + styles.title + "\">Welcome to SharePoint!</span>\n              <p class=\"" + styles.subTitle + "\">Customize SharePoint experiences using Web Parts.</p>\n              <p class=\"" + styles.description + "\">" + escape(this.properties.description) + "</p>\n              <a href=\"https://aka.ms/spfx\" class=\"" + styles.button + "\">\n                <span class=\"" + styles.label + "\">Learn more</span>\n              </a>\n            </div>\n          </div>\n        </div>\n      </div>";
    };
    // protected get dataVersion(): Version {
    //   return Version.parse('1.0');
    // }
    ListInfoWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField('description', {
                                    label: strings.DescriptionFieldLabel,
                                    onGetErrorMessage: this.validateDescription.bind(this)
                                }),
                                PropertyPaneTextField('listName', {
                                    label: strings.ListNameFieldLabel,
                                    onGetErrorMessage: this.validateListName.bind(this),
                                    deferredValidationTime: 500
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    ListInfoWebPart.prototype.validateDescription = function (value) {
        if (value === null ||
            value.trim().length === 0) {
            return 'Provide a description';
        }
        if (value.length > 40) {
            return 'Description should not be longer than 40 characters';
        }
        return;
    };
    ListInfoWebPart.prototype.validateListName = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (value === null || value.length === 0) {
                            return [2 /*return*/, 'Provide the list name'];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl +
                                ("/_api/web/lists/getByTitle('" + escape(value) + "')?$select=Id"), SPHttpClient.configurations.v1)];
                    case 2:
                        response = _a.sent();
                        if (response.ok) {
                            return [2 /*return*/, ''];
                        }
                        else if (response.status === 404) {
                            return [2 /*return*/, "List '" + escape(value) + "' doesn't exist in the current site"];
                        }
                        else {
                            return [2 /*return*/, "Error: " + response.statusText + ". Please try again"];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, error_1.message];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ListInfoWebPart;
}(BaseClientSideWebPart));
export default ListInfoWebPart;

//# sourceMappingURL=ListInfoWebPart.js.map
