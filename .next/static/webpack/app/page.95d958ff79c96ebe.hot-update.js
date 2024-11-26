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

/***/ "(app-pages-browser)/./src/utils/amazonApi.ts":
/*!********************************!*\
  !*** ./src/utils/amazonApi.ts ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fetchAmazonInventory: function() { return /* binding */ fetchAmazonInventory; },\n/* harmony export */   fetchProductsByEAN: function() { return /* binding */ fetchProductsByEAN; },\n/* harmony export */   initializeAmazonApi: function() { return /* binding */ initializeAmazonApi; },\n/* harmony export */   syncInventoryWithAmazon: function() { return /* binding */ syncInventoryWithAmazon; },\n/* harmony export */   updateAmazonProduct: function() { return /* binding */ updateAmazonProduct; }\n/* harmony export */ });\n/* harmony import */ var _scaleleap_selling_partner_api_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @scaleleap/selling-partner-api-sdk */ \"(app-pages-browser)/./node_modules/@scaleleap/selling-partner-api-sdk/lib/index.js\");\n/* harmony import */ var _scaleleap_selling_partner_api_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scaleleap_selling_partner_api_sdk__WEBPACK_IMPORTED_MODULE_0__);\n/* provided dependency */ var process = __webpack_require__(/*! process */ \"(app-pages-browser)/./node_modules/next/dist/build/polyfills/process.js\");\n\n// Amazon Seller API credentials\nconst amazonConfig = {\n    MARKETPLACE_ID: \"ATVPDKIKX0DER\",\n    SELLER_ID: \"YOUR_SELLER_ID\",\n    ACCESS_KEY: process.env.AMAZON_ACCESS_KEY,\n    SECRET_KEY: process.env.AMAZON_SECRET_KEY,\n    ROLE_ARN: process.env.AMAZON_ROLE_ARN,\n    APP_ID: process.env.AMAZON_APP_ID,\n    AWS_REGION: process.env.AMAZON_AWS_REGION,\n    REFRESH_TOKEN: process.env.AMAZON_REFRESH_TOKEN,\n    ACCESS_TOKEN: process.env.AMAZON_ACCESS_TOKEN,\n    CLIENT_SECRET: process.env.AMAZON_CLIENT_SECRET\n};\nlet spApi = null;\nconst initializeAmazonApi = async ()=>{\n    if (!spApi) {\n        spApi = new _scaleleap_selling_partner_api_sdk__WEBPACK_IMPORTED_MODULE_0__.SellingPartnerAPI({\n            region: amazonConfig.AWS_REGION,\n            refresh_token: amazonConfig.REFRESH_TOKEN,\n            access_token: amazonConfig.ACCESS_TOKEN,\n            client_id: amazonConfig.APP_ID,\n            client_secret: amazonConfig.CLIENT_SECRET,\n            credentials: {\n                SELLING_PARTNER_APP_CLIENT_ID: amazonConfig.APP_ID,\n                SELLING_PARTNER_APP_CLIENT_SECRET: amazonConfig.CLIENT_SECRET,\n                AWS_ACCESS_KEY_ID: amazonConfig.ACCESS_KEY,\n                AWS_SECRET_ACCESS_KEY: amazonConfig.SECRET_KEY,\n                AWS_SELLING_PARTNER_ROLE: amazonConfig.ROLE_ARN\n            }\n        });\n    }\n    return spApi;\n};\nconst fetchAmazonInventory = async ()=>{\n    // For demo purposes, return mock data\n    return [\n        {\n            id: \"AMZN-001\",\n            name: \"Wireless Earbuds\",\n            sku: \"WE-001\",\n            price: 49.99,\n            stock: 150,\n            category: \"Electronics\",\n            status: \"In Stock\",\n            lastUpdated: new Date().toISOString()\n        },\n        {\n            id: \"AMZN-002\",\n            name: \"Smart Watch\",\n            sku: \"SW-002\",\n            price: 199.99,\n            stock: 75,\n            category: \"Electronics\",\n            status: \"In Stock\",\n            lastUpdated: new Date().toISOString()\n        },\n        {\n            id: \"AMZN-003\",\n            name: \"Bluetooth Speaker\",\n            sku: \"BS-003\",\n            price: 79.99,\n            stock: 5,\n            category: \"Electronics\",\n            status: \"Low Stock\",\n            lastUpdated: new Date().toISOString()\n        },\n        {\n            id: \"AMZN-004\",\n            name: \"Gaming Mouse\",\n            sku: \"GM-004\",\n            price: 29.99,\n            stock: 0,\n            category: \"Electronics\",\n            status: \"Out of Stock\",\n            lastUpdated: new Date().toISOString()\n        },\n        {\n            id: \"AMZN-005\",\n            name: \"Laptop Stand\",\n            sku: \"LS-005\",\n            price: 39.99,\n            stock: 200,\n            category: \"Electronics\",\n            status: \"In Stock\",\n            lastUpdated: new Date().toISOString()\n        }\n    ];\n// Actual implementation would use the Amazon Selling Partner API\n/*\n  try {\n    const api = await initializeAmazonApi()\n    const response = await api.catalogApi.getCatalogItem({\n      MarketplaceId: amazonConfig.MARKETPLACE_ID,\n      SellerSKU: '', // Add specific SKUs if needed\n    })\n\n    // Transform Amazon inventory data to our Product type\n    const products: Product[] = response.payload.map((item: any) => ({\n      id: item.Identifiers.MarketplaceASIN,\n      name: item.AttributeSets[0].Title,\n      sku: item.Identifiers.SellerSKU,\n      price: parseFloat(item.AttributeSets[0].ListPrice?.Amount || '0'),\n      category: item.AttributeSets[0].ProductGroup,\n      status: 'active',\n      stock: 0, // We'll need to fetch inventory levels separately\n      lastUpdated: new Date().toISOString(),\n    }))\n\n    // Fetch inventory levels\n    const inventoryResponse = await api.inventoryApi.getInventorySummaries({\n      marketplaceIds: [amazonConfig.MARKETPLACE_ID],\n      sellerSkus: products.map(p => p.sku),\n    })\n\n    // Update stock levels\n    inventoryResponse.payload.inventorySummaries.forEach((summary: any) => {\n      const product = products.find(p => p.sku === summary.sellerSku)\n      if (product) {\n        product.stock = summary.totalQuantity\n      }\n    })\n\n    return products\n  } catch (error) {\n    console.error('Error fetching Amazon inventory:', error)\n    throw error\n  }\n  */ };\nconst syncInventoryWithAmazon = async (products)=>{\n    try {\n        const api = await initializeAmazonApi();\n        // Update inventory levels on Amazon\n        const updates = products.map((product)=>({\n                SellerSKU: product.sku,\n                Quantity: product.stock.toString()\n            }));\n        await api.inventoryApi.submitInventoryUpdate({\n            marketplaceIds: [\n                amazonConfig.MARKETPLACE_ID\n            ],\n            inventoryUpdates: updates\n        });\n        return true;\n    } catch (error) {\n        console.error(\"Error syncing inventory with Amazon:\", error);\n        throw error;\n    }\n};\nconst updateAmazonProduct = async (product)=>{\n    try {\n        const api = await initializeAmazonApi();\n        // Update product details on Amazon\n        await api.catalogApi.updateCatalogItem({\n            marketplaceIds: [\n                amazonConfig.MARKETPLACE_ID\n            ],\n            sku: product.sku,\n            attributes: {\n                Title: product.name,\n                StandardPrice: product.price.toString()\n            }\n        });\n        return true;\n    } catch (error) {\n        console.error(\"Error updating Amazon product:\", error);\n        throw error;\n    }\n};\nasync function fetchProductsByEAN(ean) {\n    try {\n        var _item_attributes_listPrice, _item_attributes_listPrice1, _inventory_inventorySummaries_, _inventory_inventorySummaries, _item_images_, _item_images, _item_productTypes, _item_dimensions_length, _item_dimensions, _item_dimensions_width, _item_dimensions1, _item_dimensions_height, _item_dimensions2, _item_dimensions_weight, _item_dimensions3, _inventory_inventorySummaries_1, _inventory_inventorySummaries1;\n        const credentials = JSON.parse(localStorage.getItem(\"amazonCredentials\") || \"{}\");\n        // Initialize the Amazon Selling Partner API client\n        const client = new _scaleleap_selling_partner_api_sdk__WEBPACK_IMPORTED_MODULE_0__.SellingPartnerAPI({\n            region: credentials.region || process.env.NEXT_PUBLIC_AMAZON_AWS_REGION,\n            refresh_token: credentials.refreshToken || process.env.NEXT_PUBLIC_AMAZON_REFRESH_TOKEN,\n            credentials: {\n                SELLING_PARTNER_APP_CLIENT_ID: credentials.appId || process.env.NEXT_PUBLIC_AMAZON_APP_ID,\n                SELLING_PARTNER_APP_CLIENT_SECRET: credentials.clientSecret || process.env.NEXT_PUBLIC_AMAZON_CLIENT_SECRET,\n                AWS_ACCESS_KEY_ID: credentials.accessKey || process.env.NEXT_PUBLIC_AMAZON_ACCESS_KEY,\n                AWS_SECRET_ACCESS_KEY: credentials.secretKey || process.env.NEXT_PUBLIC_AMAZON_SECRET_KEY,\n                AWS_SELLING_PARTNER_ROLE: credentials.roleArn || process.env.NEXT_PUBLIC_AMAZON_ROLE_ARN\n            }\n        });\n        // Search for the product using the EAN\n        const response = await client.catalogApi.searchCatalogItems({\n            marketplaceIds: [\n                credentials.marketplaceId || \"ATVPDKIKX0DER\"\n            ],\n            identifiers: [\n                ean\n            ],\n            identifiersType: \"EAN\",\n            includedData: [\n                \"attributes\",\n                \"dimensions\",\n                \"identifiers\",\n                \"images\",\n                \"productTypes\",\n                \"relationships\",\n                \"salesRanks\"\n            ]\n        });\n        if (!response.items || response.items.length === 0) {\n            console.warn(\"No product found for EAN: \".concat(ean));\n            return null;\n        }\n        const item = response.items[0];\n        // Get inventory information\n        const inventory = await client.inventoryApi.getInventorySummaries({\n            marketplaceIds: [\n                credentials.marketplaceId || \"ATVPDKIKX0DER\"\n            ],\n            sellerSkus: [\n                item.identifiers.sellerSKU\n            ]\n        });\n        // Transform the data into our app's format\n        return {\n            id: item.asin,\n            sku: item.identifiers.sellerSKU,\n            name: item.attributes.title,\n            description: item.attributes.productDescription,\n            price: (_item_attributes_listPrice = item.attributes.listPrice) === null || _item_attributes_listPrice === void 0 ? void 0 : _item_attributes_listPrice.amount,\n            currency: (_item_attributes_listPrice1 = item.attributes.listPrice) === null || _item_attributes_listPrice1 === void 0 ? void 0 : _item_attributes_listPrice1.currency,\n            stock: ((_inventory_inventorySummaries = inventory.inventorySummaries) === null || _inventory_inventorySummaries === void 0 ? void 0 : (_inventory_inventorySummaries_ = _inventory_inventorySummaries[0]) === null || _inventory_inventorySummaries_ === void 0 ? void 0 : _inventory_inventorySummaries_.totalQuantity) || 0,\n            image: (_item_images = item.images) === null || _item_images === void 0 ? void 0 : (_item_images_ = _item_images[0]) === null || _item_images_ === void 0 ? void 0 : _item_images_.link,\n            brand: item.attributes.brand,\n            category: (_item_productTypes = item.productTypes) === null || _item_productTypes === void 0 ? void 0 : _item_productTypes[0],\n            dimensions: {\n                length: (_item_dimensions = item.dimensions) === null || _item_dimensions === void 0 ? void 0 : (_item_dimensions_length = _item_dimensions.length) === null || _item_dimensions_length === void 0 ? void 0 : _item_dimensions_length.value,\n                width: (_item_dimensions1 = item.dimensions) === null || _item_dimensions1 === void 0 ? void 0 : (_item_dimensions_width = _item_dimensions1.width) === null || _item_dimensions_width === void 0 ? void 0 : _item_dimensions_width.value,\n                height: (_item_dimensions2 = item.dimensions) === null || _item_dimensions2 === void 0 ? void 0 : (_item_dimensions_height = _item_dimensions2.height) === null || _item_dimensions_height === void 0 ? void 0 : _item_dimensions_height.value,\n                weight: (_item_dimensions3 = item.dimensions) === null || _item_dimensions3 === void 0 ? void 0 : (_item_dimensions_weight = _item_dimensions3.weight) === null || _item_dimensions_weight === void 0 ? void 0 : _item_dimensions_weight.value\n            },\n            ean: ean,\n            asin: item.asin,\n            status: ((_inventory_inventorySummaries1 = inventory.inventorySummaries) === null || _inventory_inventorySummaries1 === void 0 ? void 0 : (_inventory_inventorySummaries_1 = _inventory_inventorySummaries1[0]) === null || _inventory_inventorySummaries_1 === void 0 ? void 0 : _inventory_inventorySummaries_1.totalQuantity) > 0 ? \"active\" : \"out-of-stock\",\n            lastUpdated: new Date().toISOString()\n        };\n    } catch (error) {\n        console.error(\"Error fetching product from Amazon:\", error);\n        throw error;\n    }\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy91dGlscy9hbWF6b25BcGkudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBc0U7QUFHdEUsZ0NBQWdDO0FBQ2hDLE1BQU1DLGVBQWU7SUFDbkJDLGdCQUFnQkMsZUFBNkM7SUFDN0RHLFdBQVdILGdCQUF3QztJQUNuREssWUFBWUwsT0FBT0EsQ0FBQ0MsR0FBRyxDQUFDSyxpQkFBaUI7SUFDekNDLFlBQVlQLE9BQU9BLENBQUNDLEdBQUcsQ0FBQ08saUJBQWlCO0lBQ3pDQyxVQUFVVCxPQUFPQSxDQUFDQyxHQUFHLENBQUNTLGVBQWU7SUFDckNDLFFBQVFYLE9BQU9BLENBQUNDLEdBQUcsQ0FBQ1csYUFBYTtJQUNqQ0MsWUFBWWIsT0FBT0EsQ0FBQ0MsR0FBRyxDQUFDYSxpQkFBaUI7SUFDekNDLGVBQWVmLE9BQU9BLENBQUNDLEdBQUcsQ0FBQ2Usb0JBQW9CO0lBQy9DQyxjQUFjakIsT0FBT0EsQ0FBQ0MsR0FBRyxDQUFDaUIsbUJBQW1CO0lBQzdDQyxlQUFlbkIsT0FBT0EsQ0FBQ0MsR0FBRyxDQUFDbUIsb0JBQW9CO0FBQ2pEO0FBRUEsSUFBSUMsUUFBa0M7QUFFL0IsTUFBTUMsc0JBQXNCO0lBQ2pDLElBQUksQ0FBQ0QsT0FBTztRQUNWQSxRQUFRLElBQUl4QixpRkFBaUJBLENBQUM7WUFDNUIwQixRQUFRekIsYUFBYWUsVUFBVTtZQUMvQlcsZUFBZTFCLGFBQWFpQixhQUFhO1lBQ3pDVSxjQUFjM0IsYUFBYW1CLFlBQVk7WUFDdkNTLFdBQVc1QixhQUFhYSxNQUFNO1lBQzlCZ0IsZUFBZTdCLGFBQWFxQixhQUFhO1lBQ3pDUyxhQUFhO2dCQUNYQywrQkFBK0IvQixhQUFhYSxNQUFNO2dCQUNsRG1CLG1DQUFtQ2hDLGFBQWFxQixhQUFhO2dCQUM3RFksbUJBQW1CakMsYUFBYU8sVUFBVTtnQkFDMUMyQix1QkFBdUJsQyxhQUFhUyxVQUFVO2dCQUM5QzBCLDBCQUEwQm5DLGFBQWFXLFFBQVE7WUFDakQ7UUFD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QUEsdUJBQXdCK0MsS0FBSztnQkFDcENFLE1BQU0sR0FBRWpELG9CQUFBQSxLQUFLOEMsVUFBVSxjQUFmOUMseUNBQUFBLDBCQUFBQSxrQkFBaUJpRCxNQUFNLGNBQXZCakQsOENBQUFBLHdCQUF5QitDLEtBQUs7Z0JBQ3RDRyxNQUFNLEdBQUVsRCxvQkFBQUEsS0FBSzhDLFVBQVUsY0FBZjlDLHlDQUFBQSwwQkFBQUEsa0JBQWlCa0QsTUFBTSxjQUF2QmxELDhDQUFBQSx3QkFBeUIrQyxLQUFLO1lBQ3hDO1lBQ0FoRCxLQUFLQTtZQUNMaUMsTUFBTWhDLEtBQUtnQyxJQUFJO1lBQ2YzRCxRQUFRNEIsRUFBQUEsaUNBQUFBLFVBQVVzQyxrQkFBa0IsY0FBNUJ0QyxzREFBQUEsa0NBQUFBLDhCQUE4QixDQUFDLEVBQUUsY0FBakNBLHNEQUFBQSxnQ0FBbUN1QyxhQUFhLElBQUcsSUFBSSxXQUFXO1lBQzFFbEUsYUFBYSxJQUFJQyxPQUFPQyxXQUFXO1FBQ3JDO0lBQ0YsRUFBRSxPQUFPYyxPQUFPO1FBQ2RDLFFBQVFELEtBQUssQ0FBQyx1Q0FBdUNBO1FBQ3JELE1BQU1BO0lBQ1I7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvdXRpbHMvYW1hem9uQXBpLnRzPzIzNjYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VsbGluZ1BhcnRuZXJBUEkgfSBmcm9tICdAc2NhbGVsZWFwL3NlbGxpbmctcGFydG5lci1hcGktc2RrJ1xuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gJ0AvdHlwZXMnXG5cbi8vIEFtYXpvbiBTZWxsZXIgQVBJIGNyZWRlbnRpYWxzXG5jb25zdCBhbWF6b25Db25maWcgPSB7XG4gIE1BUktFVFBMQUNFX0lEOiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BTUFaT05fTUFSS0VUUExBQ0VfSUQsXG4gIFNFTExFUl9JRDogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQU1BWk9OX1NFTExFUl9JRCxcbiAgQUNDRVNTX0tFWTogcHJvY2Vzcy5lbnYuQU1BWk9OX0FDQ0VTU19LRVksXG4gIFNFQ1JFVF9LRVk6IHByb2Nlc3MuZW52LkFNQVpPTl9TRUNSRVRfS0VZLFxuICBST0xFX0FSTjogcHJvY2Vzcy5lbnYuQU1BWk9OX1JPTEVfQVJOLFxuICBBUFBfSUQ6IHByb2Nlc3MuZW52LkFNQVpPTl9BUFBfSUQsXG4gIEFXU19SRUdJT046IHByb2Nlc3MuZW52LkFNQVpPTl9BV1NfUkVHSU9OLFxuICBSRUZSRVNIX1RPS0VOOiBwcm9jZXNzLmVudi5BTUFaT05fUkVGUkVTSF9UT0tFTixcbiAgQUNDRVNTX1RPS0VOOiBwcm9jZXNzLmVudi5BTUFaT05fQUNDRVNTX1RPS0VOLFxuICBDTElFTlRfU0VDUkVUOiBwcm9jZXNzLmVudi5BTUFaT05fQ0xJRU5UX1NFQ1JFVCxcbn07XG5cbmxldCBzcEFwaTogU2VsbGluZ1BhcnRuZXJBUEkgfCBudWxsID0gbnVsbFxuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZUFtYXpvbkFwaSA9IGFzeW5jICgpID0+IHtcbiAgaWYgKCFzcEFwaSkge1xuICAgIHNwQXBpID0gbmV3IFNlbGxpbmdQYXJ0bmVyQVBJKHtcbiAgICAgIHJlZ2lvbjogYW1hem9uQ29uZmlnLkFXU19SRUdJT04sXG4gICAgICByZWZyZXNoX3Rva2VuOiBhbWF6b25Db25maWcuUkVGUkVTSF9UT0tFTixcbiAgICAgIGFjY2Vzc190b2tlbjogYW1hem9uQ29uZmlnLkFDQ0VTU19UT0tFTixcbiAgICAgIGNsaWVudF9pZDogYW1hem9uQ29uZmlnLkFQUF9JRCxcbiAgICAgIGNsaWVudF9zZWNyZXQ6IGFtYXpvbkNvbmZpZy5DTElFTlRfU0VDUkVULFxuICAgICAgY3JlZGVudGlhbHM6IHtcbiAgICAgICAgU0VMTElOR19QQVJUTkVSX0FQUF9DTElFTlRfSUQ6IGFtYXpvbkNvbmZpZy5BUFBfSUQsXG4gICAgICAgIFNFTExJTkdfUEFSVE5FUl9BUFBfQ0xJRU5UX1NFQ1JFVDogYW1hem9uQ29uZmlnLkNMSUVOVF9TRUNSRVQsXG4gICAgICAgIEFXU19BQ0NFU1NfS0VZX0lEOiBhbWF6b25Db25maWcuQUNDRVNTX0tFWSxcbiAgICAgICAgQVdTX1NFQ1JFVF9BQ0NFU1NfS0VZOiBhbWF6b25Db25maWcuU0VDUkVUX0tFWSxcbiAgICAgICAgQVdTX1NFTExJTkdfUEFSVE5FUl9ST0xFOiBhbWF6b25Db25maWcuUk9MRV9BUk4sXG4gICAgICB9LFxuICAgIH0pXG4gIH1cbiAgcmV0dXJuIHNwQXBpXG59XG5cbmV4cG9ydCBjb25zdCBmZXRjaEFtYXpvbkludmVudG9yeSA9IGFzeW5jICgpOiBQcm9taXNlPFByb2R1Y3RbXT4gPT4ge1xuICAvLyBGb3IgZGVtbyBwdXJwb3NlcywgcmV0dXJuIG1vY2sgZGF0YVxuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIGlkOiAnQU1aTi0wMDEnLFxuICAgICAgbmFtZTogJ1dpcmVsZXNzIEVhcmJ1ZHMnLFxuICAgICAgc2t1OiAnV0UtMDAxJyxcbiAgICAgIHByaWNlOiA0OS45OSxcbiAgICAgIHN0b2NrOiAxNTAsXG4gICAgICBjYXRlZ29yeTogJ0VsZWN0cm9uaWNzJyxcbiAgICAgIHN0YXR1czogJ0luIFN0b2NrJyxcbiAgICAgIGxhc3RVcGRhdGVkOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogJ0FNWk4tMDAyJyxcbiAgICAgIG5hbWU6ICdTbWFydCBXYXRjaCcsXG4gICAgICBza3U6ICdTVy0wMDInLFxuICAgICAgcHJpY2U6IDE5OS45OSxcbiAgICAgIHN0b2NrOiA3NSxcbiAgICAgIGNhdGVnb3J5OiAnRWxlY3Ryb25pY3MnLFxuICAgICAgc3RhdHVzOiAnSW4gU3RvY2snLFxuICAgICAgbGFzdFVwZGF0ZWQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiAnQU1aTi0wMDMnLFxuICAgICAgbmFtZTogJ0JsdWV0b290aCBTcGVha2VyJyxcbiAgICAgIHNrdTogJ0JTLTAwMycsXG4gICAgICBwcmljZTogNzkuOTksXG4gICAgICBzdG9jazogNSxcbiAgICAgIGNhdGVnb3J5OiAnRWxlY3Ryb25pY3MnLFxuICAgICAgc3RhdHVzOiAnTG93IFN0b2NrJyxcbiAgICAgIGxhc3RVcGRhdGVkOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogJ0FNWk4tMDA0JyxcbiAgICAgIG5hbWU6ICdHYW1pbmcgTW91c2UnLFxuICAgICAgc2t1OiAnR00tMDA0JyxcbiAgICAgIHByaWNlOiAyOS45OSxcbiAgICAgIHN0b2NrOiAwLFxuICAgICAgY2F0ZWdvcnk6ICdFbGVjdHJvbmljcycsXG4gICAgICBzdGF0dXM6ICdPdXQgb2YgU3RvY2snLFxuICAgICAgbGFzdFVwZGF0ZWQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiAnQU1aTi0wMDUnLFxuICAgICAgbmFtZTogJ0xhcHRvcCBTdGFuZCcsXG4gICAgICBza3U6ICdMUy0wMDUnLFxuICAgICAgcHJpY2U6IDM5Ljk5LFxuICAgICAgc3RvY2s6IDIwMCxcbiAgICAgIGNhdGVnb3J5OiAnRWxlY3Ryb25pY3MnLFxuICAgICAgc3RhdHVzOiAnSW4gU3RvY2snLFxuICAgICAgbGFzdFVwZGF0ZWQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICB9LFxuICBdO1xuICBcbiAgLy8gQWN0dWFsIGltcGxlbWVudGF0aW9uIHdvdWxkIHVzZSB0aGUgQW1hem9uIFNlbGxpbmcgUGFydG5lciBBUElcbiAgLypcbiAgdHJ5IHtcbiAgICBjb25zdCBhcGkgPSBhd2FpdCBpbml0aWFsaXplQW1hem9uQXBpKClcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5jYXRhbG9nQXBpLmdldENhdGFsb2dJdGVtKHtcbiAgICAgIE1hcmtldHBsYWNlSWQ6IGFtYXpvbkNvbmZpZy5NQVJLRVRQTEFDRV9JRCxcbiAgICAgIFNlbGxlclNLVTogJycsIC8vIEFkZCBzcGVjaWZpYyBTS1VzIGlmIG5lZWRlZFxuICAgIH0pXG5cbiAgICAvLyBUcmFuc2Zvcm0gQW1hem9uIGludmVudG9yeSBkYXRhIHRvIG91ciBQcm9kdWN0IHR5cGVcbiAgICBjb25zdCBwcm9kdWN0czogUHJvZHVjdFtdID0gcmVzcG9uc2UucGF5bG9hZC5tYXAoKGl0ZW06IGFueSkgPT4gKHtcbiAgICAgIGlkOiBpdGVtLklkZW50aWZpZXJzLk1hcmtldHBsYWNlQVNJTixcbiAgICAgIG5hbWU6IGl0ZW0uQXR0cmlidXRlU2V0c1swXS5UaXRsZSxcbiAgICAgIHNrdTogaXRlbS5JZGVudGlmaWVycy5TZWxsZXJTS1UsXG4gICAgICBwcmljZTogcGFyc2VGbG9hdChpdGVtLkF0dHJpYnV0ZVNldHNbMF0uTGlzdFByaWNlPy5BbW91bnQgfHwgJzAnKSxcbiAgICAgIGNhdGVnb3J5OiBpdGVtLkF0dHJpYnV0ZVNldHNbMF0uUHJvZHVjdEdyb3VwLFxuICAgICAgc3RhdHVzOiAnYWN0aXZlJyxcbiAgICAgIHN0b2NrOiAwLCAvLyBXZSdsbCBuZWVkIHRvIGZldGNoIGludmVudG9yeSBsZXZlbHMgc2VwYXJhdGVseVxuICAgICAgbGFzdFVwZGF0ZWQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICB9KSlcblxuICAgIC8vIEZldGNoIGludmVudG9yeSBsZXZlbHNcbiAgICBjb25zdCBpbnZlbnRvcnlSZXNwb25zZSA9IGF3YWl0IGFwaS5pbnZlbnRvcnlBcGkuZ2V0SW52ZW50b3J5U3VtbWFyaWVzKHtcbiAgICAgIG1hcmtldHBsYWNlSWRzOiBbYW1hem9uQ29uZmlnLk1BUktFVFBMQUNFX0lEXSxcbiAgICAgIHNlbGxlclNrdXM6IHByb2R1Y3RzLm1hcChwID0+IHAuc2t1KSxcbiAgICB9KVxuXG4gICAgLy8gVXBkYXRlIHN0b2NrIGxldmVsc1xuICAgIGludmVudG9yeVJlc3BvbnNlLnBheWxvYWQuaW52ZW50b3J5U3VtbWFyaWVzLmZvckVhY2goKHN1bW1hcnk6IGFueSkgPT4ge1xuICAgICAgY29uc3QgcHJvZHVjdCA9IHByb2R1Y3RzLmZpbmQocCA9PiBwLnNrdSA9PT0gc3VtbWFyeS5zZWxsZXJTa3UpXG4gICAgICBpZiAocHJvZHVjdCkge1xuICAgICAgICBwcm9kdWN0LnN0b2NrID0gc3VtbWFyeS50b3RhbFF1YW50aXR5XG4gICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiBwcm9kdWN0c1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIEFtYXpvbiBpbnZlbnRvcnk6JywgZXJyb3IpXG4gICAgdGhyb3cgZXJyb3JcbiAgfVxuICAqL1xufTtcblxuZXhwb3J0IGNvbnN0IHN5bmNJbnZlbnRvcnlXaXRoQW1hem9uID0gYXN5bmMgKHByb2R1Y3RzOiBQcm9kdWN0W10pID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBhcGkgPSBhd2FpdCBpbml0aWFsaXplQW1hem9uQXBpKClcbiAgICBcbiAgICAvLyBVcGRhdGUgaW52ZW50b3J5IGxldmVscyBvbiBBbWF6b25cbiAgICBjb25zdCB1cGRhdGVzID0gcHJvZHVjdHMubWFwKHByb2R1Y3QgPT4gKHtcbiAgICAgIFNlbGxlclNLVTogcHJvZHVjdC5za3UsXG4gICAgICBRdWFudGl0eTogcHJvZHVjdC5zdG9jay50b1N0cmluZygpLFxuICAgIH0pKVxuXG4gICAgYXdhaXQgYXBpLmludmVudG9yeUFwaS5zdWJtaXRJbnZlbnRvcnlVcGRhdGUoe1xuICAgICAgbWFya2V0cGxhY2VJZHM6IFthbWF6b25Db25maWcuTUFSS0VUUExBQ0VfSURdLFxuICAgICAgaW52ZW50b3J5VXBkYXRlczogdXBkYXRlcyxcbiAgICB9KVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBzeW5jaW5nIGludmVudG9yeSB3aXRoIEFtYXpvbjonLCBlcnJvcilcbiAgICB0aHJvdyBlcnJvclxuICB9XG59XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVBbWF6b25Qcm9kdWN0ID0gYXN5bmMgKHByb2R1Y3Q6IFByb2R1Y3QpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBhcGkgPSBhd2FpdCBpbml0aWFsaXplQW1hem9uQXBpKClcbiAgICBcbiAgICAvLyBVcGRhdGUgcHJvZHVjdCBkZXRhaWxzIG9uIEFtYXpvblxuICAgIGF3YWl0IGFwaS5jYXRhbG9nQXBpLnVwZGF0ZUNhdGFsb2dJdGVtKHtcbiAgICAgIG1hcmtldHBsYWNlSWRzOiBbYW1hem9uQ29uZmlnLk1BUktFVFBMQUNFX0lEXSxcbiAgICAgIHNrdTogcHJvZHVjdC5za3UsXG4gICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgIFRpdGxlOiBwcm9kdWN0Lm5hbWUsXG4gICAgICAgIFN0YW5kYXJkUHJpY2U6IHByb2R1Y3QucHJpY2UudG9TdHJpbmcoKSxcbiAgICAgIH0sXG4gICAgfSlcblxuICAgIHJldHVybiB0cnVlXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgdXBkYXRpbmcgQW1hem9uIHByb2R1Y3Q6JywgZXJyb3IpXG4gICAgdGhyb3cgZXJyb3JcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hQcm9kdWN0c0J5RUFOKGVhbjogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBjcmVkZW50aWFscyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FtYXpvbkNyZWRlbnRpYWxzJykgfHwgJ3t9Jyk7XG4gICAgXG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgQW1hem9uIFNlbGxpbmcgUGFydG5lciBBUEkgY2xpZW50XG4gICAgY29uc3QgY2xpZW50ID0gbmV3IFNlbGxpbmdQYXJ0bmVyQVBJKHtcbiAgICAgIHJlZ2lvbjogY3JlZGVudGlhbHMucmVnaW9uIHx8IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0FNQVpPTl9BV1NfUkVHSU9OLFxuICAgICAgcmVmcmVzaF90b2tlbjogY3JlZGVudGlhbHMucmVmcmVzaFRva2VuIHx8IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0FNQVpPTl9SRUZSRVNIX1RPS0VOLFxuICAgICAgY3JlZGVudGlhbHM6IHtcbiAgICAgICAgU0VMTElOR19QQVJUTkVSX0FQUF9DTElFTlRfSUQ6IGNyZWRlbnRpYWxzLmFwcElkIHx8IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0FNQVpPTl9BUFBfSUQsXG4gICAgICAgIFNFTExJTkdfUEFSVE5FUl9BUFBfQ0xJRU5UX1NFQ1JFVDogY3JlZGVudGlhbHMuY2xpZW50U2VjcmV0IHx8IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0FNQVpPTl9DTElFTlRfU0VDUkVULFxuICAgICAgICBBV1NfQUNDRVNTX0tFWV9JRDogY3JlZGVudGlhbHMuYWNjZXNzS2V5IHx8IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0FNQVpPTl9BQ0NFU1NfS0VZLFxuICAgICAgICBBV1NfU0VDUkVUX0FDQ0VTU19LRVk6IGNyZWRlbnRpYWxzLnNlY3JldEtleSB8fCBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BTUFaT05fU0VDUkVUX0tFWSxcbiAgICAgICAgQVdTX1NFTExJTkdfUEFSVE5FUl9ST0xFOiBjcmVkZW50aWFscy5yb2xlQXJuIHx8IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0FNQVpPTl9ST0xFX0FSTixcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICAvLyBTZWFyY2ggZm9yIHRoZSBwcm9kdWN0IHVzaW5nIHRoZSBFQU5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNsaWVudC5jYXRhbG9nQXBpLnNlYXJjaENhdGFsb2dJdGVtcyh7XG4gICAgICBtYXJrZXRwbGFjZUlkczogW2NyZWRlbnRpYWxzLm1hcmtldHBsYWNlSWQgfHwgcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQU1BWk9OX01BUktFVFBMQUNFX0lEXSxcbiAgICAgIGlkZW50aWZpZXJzOiBbZWFuXSxcbiAgICAgIGlkZW50aWZpZXJzVHlwZTogJ0VBTicsXG4gICAgICBpbmNsdWRlZERhdGE6IFsnYXR0cmlidXRlcycsICdkaW1lbnNpb25zJywgJ2lkZW50aWZpZXJzJywgJ2ltYWdlcycsICdwcm9kdWN0VHlwZXMnLCAncmVsYXRpb25zaGlwcycsICdzYWxlc1JhbmtzJ10sXG4gICAgfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlLml0ZW1zIHx8IHJlc3BvbnNlLml0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY29uc29sZS53YXJuKGBObyBwcm9kdWN0IGZvdW5kIGZvciBFQU46ICR7ZWFufWApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgaXRlbSA9IHJlc3BvbnNlLml0ZW1zWzBdO1xuXG4gICAgLy8gR2V0IGludmVudG9yeSBpbmZvcm1hdGlvblxuICAgIGNvbnN0IGludmVudG9yeSA9IGF3YWl0IGNsaWVudC5pbnZlbnRvcnlBcGkuZ2V0SW52ZW50b3J5U3VtbWFyaWVzKHtcbiAgICAgIG1hcmtldHBsYWNlSWRzOiBbY3JlZGVudGlhbHMubWFya2V0cGxhY2VJZCB8fCBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BTUFaT05fTUFSS0VUUExBQ0VfSURdLFxuICAgICAgc2VsbGVyU2t1czogW2l0ZW0uaWRlbnRpZmllcnMuc2VsbGVyU0tVXSxcbiAgICB9KTtcblxuICAgIC8vIFRyYW5zZm9ybSB0aGUgZGF0YSBpbnRvIG91ciBhcHAncyBmb3JtYXRcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IGl0ZW0uYXNpbixcbiAgICAgIHNrdTogaXRlbS5pZGVudGlmaWVycy5zZWxsZXJTS1UsXG4gICAgICBuYW1lOiBpdGVtLmF0dHJpYnV0ZXMudGl0bGUsXG4gICAgICBkZXNjcmlwdGlvbjogaXRlbS5hdHRyaWJ1dGVzLnByb2R1Y3REZXNjcmlwdGlvbixcbiAgICAgIHByaWNlOiBpdGVtLmF0dHJpYnV0ZXMubGlzdFByaWNlPy5hbW91bnQsXG4gICAgICBjdXJyZW5jeTogaXRlbS5hdHRyaWJ1dGVzLmxpc3RQcmljZT8uY3VycmVuY3ksXG4gICAgICBzdG9jazogaW52ZW50b3J5LmludmVudG9yeVN1bW1hcmllcz8uWzBdPy50b3RhbFF1YW50aXR5IHx8IDAsXG4gICAgICBpbWFnZTogaXRlbS5pbWFnZXM/LlswXT8ubGluayxcbiAgICAgIGJyYW5kOiBpdGVtLmF0dHJpYnV0ZXMuYnJhbmQsXG4gICAgICBjYXRlZ29yeTogaXRlbS5wcm9kdWN0VHlwZXM/LlswXSxcbiAgICAgIGRpbWVuc2lvbnM6IHtcbiAgICAgICAgbGVuZ3RoOiBpdGVtLmRpbWVuc2lvbnM/Lmxlbmd0aD8udmFsdWUsXG4gICAgICAgIHdpZHRoOiBpdGVtLmRpbWVuc2lvbnM/LndpZHRoPy52YWx1ZSxcbiAgICAgICAgaGVpZ2h0OiBpdGVtLmRpbWVuc2lvbnM/LmhlaWdodD8udmFsdWUsXG4gICAgICAgIHdlaWdodDogaXRlbS5kaW1lbnNpb25zPy53ZWlnaHQ/LnZhbHVlLFxuICAgICAgfSxcbiAgICAgIGVhbjogZWFuLFxuICAgICAgYXNpbjogaXRlbS5hc2luLFxuICAgICAgc3RhdHVzOiBpbnZlbnRvcnkuaW52ZW50b3J5U3VtbWFyaWVzPy5bMF0/LnRvdGFsUXVhbnRpdHkgPiAwID8gJ2FjdGl2ZScgOiAnb3V0LW9mLXN0b2NrJyxcbiAgICAgIGxhc3RVcGRhdGVkOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBwcm9kdWN0IGZyb20gQW1hem9uOicsIGVycm9yKTtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIlNlbGxpbmdQYXJ0bmVyQVBJIiwiYW1hem9uQ29uZmlnIiwiTUFSS0VUUExBQ0VfSUQiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfQU1BWk9OX01BUktFVFBMQUNFX0lEIiwiU0VMTEVSX0lEIiwiTkVYVF9QVUJMSUNfQU1BWk9OX1NFTExFUl9JRCIsIkFDQ0VTU19LRVkiLCJBTUFaT05fQUNDRVNTX0tFWSIsIlNFQ1JFVF9LRVkiLCJBTUFaT05fU0VDUkVUX0tFWSIsIlJPTEVfQVJOIiwiQU1BWk9OX1JPTEVfQVJOIiwiQVBQX0lEIiwiQU1BWk9OX0FQUF9JRCIsIkFXU19SRUdJT04iLCJBTUFaT05fQVdTX1JFR0lPTiIsIlJFRlJFU0hfVE9LRU4iLCJBTUFaT05fUkVGUkVTSF9UT0tFTiIsIkFDQ0VTU19UT0tFTiIsIkFNQVpPTl9BQ0NFU1NfVE9LRU4iLCJDTElFTlRfU0VDUkVUIiwiQU1BWk9OX0NMSUVOVF9TRUNSRVQiLCJzcEFwaSIsImluaXRpYWxpemVBbWF6b25BcGkiLCJyZWdpb24iLCJyZWZyZXNoX3Rva2VuIiwiYWNjZXNzX3Rva2VuIiwiY2xpZW50X2lkIiwiY2xpZW50X3NlY3JldCIsImNyZWRlbnRpYWxzIiwiU0VMTElOR19QQVJUTkVSX0FQUF9DTElFTlRfSUQiLCJTRUxMSU5HX1BBUlRORVJfQVBQX0NMSUVOVF9TRUNSRVQiLCJBV1NfQUNDRVNTX0tFWV9JRCIsIkFXU19TRUNSRVRfQUNDRVNTX0tFWSIsIkFXU19TRUxMSU5HX1BBUlRORVJfUk9MRSIsImZldGNoQW1hem9uSW52ZW50b3J5IiwiaWQiLCJuYW1lIiwic2t1IiwicHJpY2UiLCJzdG9jayIsImNhdGVnb3J5Iiwic3RhdHVzIiwibGFzdFVwZGF0ZWQiLCJEYXRlIiwidG9JU09TdHJpbmciLCJzeW5jSW52ZW50b3J5V2l0aEFtYXpvbiIsInByb2R1Y3RzIiwiYXBpIiwidXBkYXRlcyIsIm1hcCIsInByb2R1Y3QiLCJTZWxsZXJTS1UiLCJRdWFudGl0eSIsInRvU3RyaW5nIiwiaW52ZW50b3J5QXBpIiwic3VibWl0SW52ZW50b3J5VXBkYXRlIiwibWFya2V0cGxhY2VJZHMiLCJpbnZlbnRvcnlVcGRhdGVzIiwiZXJyb3IiLCJjb25zb2xlIiwidXBkYXRlQW1hem9uUHJvZHVjdCIsImNhdGFsb2dBcGkiLCJ1cGRhdGVDYXRhbG9nSXRlbSIsImF0dHJpYnV0ZXMiLCJUaXRsZSIsIlN0YW5kYXJkUHJpY2UiLCJmZXRjaFByb2R1Y3RzQnlFQU4iLCJlYW4iLCJpdGVtIiwiaW52ZW50b3J5IiwiSlNPTiIsInBhcnNlIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImNsaWVudCIsIk5FWFRfUFVCTElDX0FNQVpPTl9BV1NfUkVHSU9OIiwicmVmcmVzaFRva2VuIiwiTkVYVF9QVUJMSUNfQU1BWk9OX1JFRlJFU0hfVE9LRU4iLCJhcHBJZCIsIk5FWFRfUFVCTElDX0FNQVpPTl9BUFBfSUQiLCJjbGllbnRTZWNyZXQiLCJORVhUX1BVQkxJQ19BTUFaT05fQ0xJRU5UX1NFQ1JFVCIsImFjY2Vzc0tleSIsIk5FWFRfUFVCTElDX0FNQVpPTl9BQ0NFU1NfS0VZIiwic2VjcmV0S2V5IiwiTkVYVF9QVUJMSUNfQU1BWk9OX1NFQ1JFVF9LRVkiLCJyb2xlQXJuIiwiTkVYVF9QVUJMSUNfQU1BWk9OX1JPTEVfQVJOIiwicmVzcG9uc2UiLCJzZWFyY2hDYXRhbG9nSXRlbXMiLCJtYXJrZXRwbGFjZUlkIiwiaWRlbnRpZmllcnMiLCJpZGVudGlmaWVyc1R5cGUiLCJpbmNsdWRlZERhdGEiLCJpdGVtcyIsImxlbmd0aCIsIndhcm4iLCJnZXRJbnZlbnRvcnlTdW1tYXJpZXMiLCJzZWxsZXJTa3VzIiwic2VsbGVyU0tVIiwiYXNpbiIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJwcm9kdWN0RGVzY3JpcHRpb24iLCJsaXN0UHJpY2UiLCJhbW91bnQiLCJjdXJyZW5jeSIsImludmVudG9yeVN1bW1hcmllcyIsInRvdGFsUXVhbnRpdHkiLCJpbWFnZSIsImltYWdlcyIsImxpbmsiLCJicmFuZCIsInByb2R1Y3RUeXBlcyIsImRpbWVuc2lvbnMiLCJ2YWx1ZSIsIndpZHRoIiwiaGVpZ2h0Iiwid2VpZ2h0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/utils/amazonApi.ts\n"));

/***/ })

});