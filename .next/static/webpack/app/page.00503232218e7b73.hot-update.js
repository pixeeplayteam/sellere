"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/components/DataGrid/ColumnSelector.tsx":
/*!****************************************************!*\
  !*** ./src/components/DataGrid/ColumnSelector.tsx ***!
  \****************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ ColumnSelector; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _barrel_optimize_names_Columns_lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! __barrel_optimize__?names=Columns!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/columns.mjs\");\n\n\n\nfunction ColumnSelector(param) {\n    let { columns, onChange } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"relative\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                type: \"button\",\n                className: \"inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Columns_lucide_react__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                        className: \"h-4 w-4 mr-2\"\n                    }, void 0, false, {\n                        fileName: \"/Users/arnaud/copy code code 2asine/src/components/DataGrid/ColumnSelector.tsx\",\n                        lineNumber: 17,\n                        columnNumber: 9\n                    }, this),\n                    \"Columns\"\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/arnaud/copy code code 2asine/src/components/DataGrid/ColumnSelector.tsx\",\n                lineNumber: 13,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"py-1\",\n                    role: \"menu\",\n                    \"aria-orientation\": \"vertical\",\n                    children: columns.map((column)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                            className: \"flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                    type: \"checkbox\",\n                                    className: \"mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500\",\n                                    checked: column.visible,\n                                    onChange: ()=>onChange(column.key)\n                                }, void 0, false, {\n                                    fileName: \"/Users/arnaud/copy code code 2asine/src/components/DataGrid/ColumnSelector.tsx\",\n                                    lineNumber: 28,\n                                    columnNumber: 15\n                                }, this),\n                                column.label\n                            ]\n                        }, column.key, true, {\n                            fileName: \"/Users/arnaud/copy code code 2asine/src/components/DataGrid/ColumnSelector.tsx\",\n                            lineNumber: 24,\n                            columnNumber: 13\n                        }, this))\n                }, void 0, false, {\n                    fileName: \"/Users/arnaud/copy code code 2asine/src/components/DataGrid/ColumnSelector.tsx\",\n                    lineNumber: 22,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/arnaud/copy code code 2asine/src/components/DataGrid/ColumnSelector.tsx\",\n                lineNumber: 21,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/arnaud/copy code code 2asine/src/components/DataGrid/ColumnSelector.tsx\",\n        lineNumber: 12,\n        columnNumber: 5\n    }, this);\n}\n_c = ColumnSelector;\nvar _c;\n$RefreshReg$(_c, \"ColumnSelector\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL0RhdGFHcmlkL0NvbHVtblNlbGVjdG9yLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBMEI7QUFDYTtBQVF4QixTQUFTRSxlQUFlLEtBQTBDO1FBQTFDLEVBQUVDLE9BQU8sRUFBRUMsUUFBUSxFQUF1QixHQUExQztJQUNyQyxxQkFDRSw4REFBQ0M7UUFBSUMsV0FBVTs7MEJBQ2IsOERBQUNDO2dCQUNDQyxNQUFLO2dCQUNMRixXQUFVOztrQ0FFViw4REFBQ0wsbUZBQU9BO3dCQUFDSyxXQUFVOzs7Ozs7b0JBQWlCOzs7Ozs7OzBCQUl0Qyw4REFBQ0Q7Z0JBQUlDLFdBQVU7MEJBQ2IsNEVBQUNEO29CQUFJQyxXQUFVO29CQUFPRyxNQUFLO29CQUFPQyxvQkFBaUI7OEJBQ2hEUCxRQUFRUSxHQUFHLENBQUMsQ0FBQ0MsdUJBQ1osOERBQUNDOzRCQUVDUCxXQUFVOzs4Q0FFViw4REFBQ1E7b0NBQ0NOLE1BQUs7b0NBQ0xGLFdBQVU7b0NBQ1ZTLFNBQVNILE9BQU9JLE9BQU87b0NBQ3ZCWixVQUFVLElBQU1BLFNBQVNRLE9BQU9LLEdBQUc7Ozs7OztnQ0FFcENMLE9BQU9DLEtBQUs7OzJCQVRSRCxPQUFPSyxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQjdCO0tBL0J3QmYiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvRGF0YUdyaWQvQ29sdW1uU2VsZWN0b3IudHN4P2NjNjEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IENvbHVtbnMgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgQ29sdW1uQ29uZmlnIH0gZnJvbSAnQC90eXBlcyc7XG5cbmludGVyZmFjZSBDb2x1bW5TZWxlY3RvclByb3BzIHtcbiAgY29sdW1uczogQ29sdW1uQ29uZmlnW107XG4gIG9uQ2hhbmdlOiAoY29sdW1uS2V5OiBzdHJpbmcpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbHVtblNlbGVjdG9yKHsgY29sdW1ucywgb25DaGFuZ2UgfTogQ29sdW1uU2VsZWN0b3JQcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBweC00IHB5LTIgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLW1kIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBiZy13aGl0ZSBob3ZlcjpiZy1ncmF5LTUwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1vZmZzZXQtMiBmb2N1czpyaW5nLWJsdWUtNTAwXCJcbiAgICAgID5cbiAgICAgICAgPENvbHVtbnMgY2xhc3NOYW1lPVwiaC00IHctNCBtci0yXCIgLz5cbiAgICAgICAgQ29sdW1uc1xuICAgICAgPC9idXR0b24+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgcmlnaHQtMCBtdC0yIHctNTYgcm91bmRlZC1tZCBzaGFkb3ctbGcgYmctd2hpdGUgcmluZy0xIHJpbmctYmxhY2sgcmluZy1vcGFjaXR5LTVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweS0xXCIgcm9sZT1cIm1lbnVcIiBhcmlhLW9yaWVudGF0aW9uPVwidmVydGljYWxcIj5cbiAgICAgICAgICB7Y29sdW1ucy5tYXAoKGNvbHVtbikgPT4gKFxuICAgICAgICAgICAgPGxhYmVsXG4gICAgICAgICAgICAgIGtleT17Y29sdW1uLmtleX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgcHgtNCBweS0yIHRleHQtc20gdGV4dC1ncmF5LTcwMCBob3ZlcjpiZy1ncmF5LTEwMCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibXItMyBoLTQgdy00IHRleHQtYmx1ZS02MDAgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQgZm9jdXM6cmluZy1ibHVlLTUwMFwiXG4gICAgICAgICAgICAgICAgY2hlY2tlZD17Y29sdW1uLnZpc2libGV9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eygpID0+IG9uQ2hhbmdlKGNvbHVtbi5rZXkpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICB7Y29sdW1uLmxhYmVsfVxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbHVtbnMiLCJDb2x1bW5TZWxlY3RvciIsImNvbHVtbnMiLCJvbkNoYW5nZSIsImRpdiIsImNsYXNzTmFtZSIsImJ1dHRvbiIsInR5cGUiLCJyb2xlIiwiYXJpYS1vcmllbnRhdGlvbiIsIm1hcCIsImNvbHVtbiIsImxhYmVsIiwiaW5wdXQiLCJjaGVja2VkIiwidmlzaWJsZSIsImtleSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/DataGrid/ColumnSelector.tsx\n"));

/***/ })

});