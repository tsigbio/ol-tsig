// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"examples/visor/json/capas.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var key = 'pk.eyJ1IjoiYWhvY2V2YXIiLCJhIjoiY2pzbmg0Nmk5MGF5NzQzbzRnbDNoeHJrbiJ9.7_-_gL8ur7ZtEiNwRfCy7Q';
var mapa = {
  view: {
    // projection: 'EPSG:4326',
    projectionCenter: 'EPSG:4326',
    center: [-3.0, 41.0],
    zoom: 6
  },
  layers: [{
    title: 'Open Street Map',
    type: 'Tile',
    source: {
      type: 'OSM'
    }
  }, {
    title: 'Bing Group',
    type: 'OlTsLayerScale',
    openInLayerSwitcher: false,
    layers: [{
      title: 'Bing - Aerial',
      type: 'Tile',
      name: 'BingAerial',
      thumbnail: 'assets/img/layers/bases/BingMapsAerial-100.png',
      source: {
        type: 'BingMaps',
        key: 'AqEzZNMoyO2z_wL8ap0J8uhZvqMG29GsSenOtFDqDXB0tOuqbBOQswe0jUrt5u1p',
        imagerySet: 'Aerial'
      },
      minZoom: 15,
      maxZoom: 20
    }, {
      title: 'Bing - Road',
      type: 'Tile',
      name: 'BingRoad',
      thumbnail: 'assets/img/layers/bases/BingMapsRoad-100.png',
      source: {
        type: 'BingMaps',
        key: 'AqEzZNMoyO2z_wL8ap0J8uhZvqMG29GsSenOtFDqDXB0tOuqbBOQswe0jUrt5u1p',
        imagerySet: 'Road'
      },
      minZoom: 1,
      maxZoom: 15
    }]
  }, {
    title: 'MiMapBox2',
    type: 'Tile',
    source: {
      type: 'TileJSON',
      url: 'https://api.tiles.mapbox.com/v4/mapbox.world-borders-light.json?secure&access_token=' + key,
      crossOrigin: 'anonymous'
    }
  }, {
    title: 'Bioenergy Crops Suitability',
    type: 'Tile',
    visible: false,
    sourceSelect: 'siHr_sfl',
    sources: [{
      name: 'siHr_whe',
      type: 'XYZ',
      title: 'Wheat - High - (r)',
      title2: 'Wheat - High - (rain-fed)',
      url: 'https://mbtiles.agrisatwebgis.com/suitability-crops-1981-2010/suitability-1981-2010H-siHr_whe/{z}/{x}/{y}.png'
    }, {
      name: 'siHr_sfl',
      type: 'XYZ',
      title: 'Sunflower - High - (r)',
      title2: 'Sunflower - High - (rain-fed)',
      url: 'https://mbtiles.agrisatwebgis.com/suitability-crops-1981-2010/suitability-1981-2010H-siHr_sfl/{z}/{x}/{y}.png'
    }, {
      name: 'siHr_sub',
      type: 'XYZ',
      title: 'Sugar beet - High - (r)',
      title2: 'Sugar beet - High - (rain-fed)',
      url: 'https://mbtiles.agrisatwebgis.com/suitability-crops-1981-2010/suitability-1981-2010H-siHr_sub/{z}/{x}/{y}.png'
    }, {
      name: 'siHr_rsd',
      type: 'XYZ',
      title: 'Rapeseed - High - (r)',
      title2: 'Rapeseed - High - (rain-fed)',
      url: 'https://mbtiles.agrisatwebgis.com/suitability-crops-1981-2010/suitability-1981-2010H-siHr_rsd/{z}/{x}/{y}.png'
    }, {
      name: 'siHr_srg',
      type: 'XYZ',
      title: 'Sorghum - High - (r)',
      title2: 'Sorghum - High - (rain-fed)',
      url: 'https://mbtiles.agrisatwebgis.com/suitability-crops-1981-2010/suitability-1981-2010H-siHr_srg/{z}/{x}/{y}.png'
    }, {
      name: 'siHr_mis',
      type: 'XYZ',
      title: 'Miscanthus - High - (r)',
      title2: 'Miscanthus - High - (rain-fed)',
      url: 'https://mbtiles.agrisatwebgis.com/suitability-crops-1981-2010/suitability-1981-2010H-siHr_mis/{z}/{x}/{y}.png'
    }, {
      name: 'siHr_swg',
      type: 'XYZ',
      title: 'Switchgrass - High - (r)',
      title2: 'Switchgrass - High - (rain-fed)',
      url: 'https://mbtiles.agrisatwebgis.com/suitability-crops-1981-2010/suitability-1981-2010H-siHr_swg/{z}/{x}/{y}.png'
    }]
  }, {
    title: 'Capa LayerVector - Polígonos',
    type: 'OlTsLayerVector',
    visible: true,
    editable: true,
    geometryType: 'Polygon',
    // [Point, LineString, Polygon, Circle]
    source: {
      type: 'Vector',
      // url: '/examples/json/MUC_AB_FIELDS.geojson',
      url: 'https://openlayers.org/en/v5.3.0/examples/data/geojson/countries.geojson',
      format: {
        type: 'GeoJSON'
      }
    },
    style: {
      fill: {
        color: 'rgba(0, 0, 255, 0.1)'
      },
      stroke: {
        color: '#0f0f00',
        width: 1
      },
      text: {
        font: '12px Calibri,sans-serif',
        fill: {
          color: '#000'
        },
        stroke: {
          color: '#fff',
          width: 3
        }
      }
    },
    labels: {
      visible: true,
      field: 'name'
    }
  }, {
    title: 'Capa LayerVector - Lineas',
    type: 'OlTsLayerVector',
    visible: true,
    editable: true,
    geometryType: 'LineString',
    // [Point, LineString, Polygon, Circle]
    source: {
      type: 'Vector',
      // url: '/examples/json/MUC_AB_FIELDS.geojson',
      url: 'capalineas.geojson',
      format: {
        type: 'GeoJSON'
      }
    },
    labels: {
      visible: true,
      field: 'linea'
    }
  }, {
    title: 'Centros de Tratamiento',
    type: 'OlTsLayerVector',
    visible: false,
    editable: false,
    geometryType: 'Point',
    source: {
      type: 'Cluster',
      distance: 50,
      source: {
        type: 'Vector',
        // url: '/examples/geojson/DE_fabriken_GCS.geojson',
        url: 'DE_fabriken_GCS.geojson',
        format: {
          type: 'GeoJSON'
        }
      }
    },
    style: {
      image: {
        type: 'Circle',
        radius: 20,
        stroke: {
          color: '#0f0'
        },
        fill: {
          color: '#afa'
        }
      },
      text: {
        stroke: {
          width: 1,
          color: '#333'
        },
        fill: {
          color: '#000'
        }
      }
    },
    labels: {
      visible: true,
      fields: [['count'], ['media', 'electrical', 2]],
      // sum, media
      template: '(count)\nelectrical'
    }
  }, {
    title: 'Capa LayerVector - Puntos',
    type: 'OlTsLayerVector',
    visible: true,
    editable: true,
    geometryType: 'Point',
    // [Point, LineString, Polygon, Circle]
    source: {
      type: 'Vector',
      // url: '/examples/geojson/MUC_AB_FIELDS.geojson',
      url: 'capapuntos.geojson',
      format: {
        type: 'GeoJSON'
      }
    },
    style: {
      image: {
        type: 'Circle',
        radius: 6,
        fill: {
          color: 'rgba(0, 0, 255, 1)'
        },
        stroke: {
          color: '#0f0f00',
          width: 2
        }
      }
    },
    labels: {
      visible: false,
      field: 'linea'
    }
  }
  /*
  ,{
      title: 'Capa de Ruteo',
      type: 'OlTsLayerGroupORS',
      visible: true,
      openInLayerSwitcher: false,
      layers: [{
              title: 'Puntos',
              type: 'OlTsLayerVector',
              geometryType: 'Point',
              name: 'layerPointsORS',
              editable: true,
              style: {
                  image: {
                      type: 'Circle',
                      radius: 6,
                      fill: {
                          color: 'rgba(0, 255, 255, 1)'
                      },
                      stroke: {
                          color: '#0fff00',
                          width: 2
                      }
                  }
              },
          },
          {
              title: 'Rutas',
              type: 'OlTsLayerORS',
              geometryType: 'LineString',
              name: 'layerRoutesORS',
              editable: true,
              apiKey: '5b3ce3597851110001cf62486b021facde2941b896fc9294427c1095',
              style: {
                  stroke: {
                      color: '#0FFF00',
                      width: 4
                  }
              }
          }
      ]
  }
  */
  ]
};
var _default = mapa;
exports.default = _default;
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58723" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","examples/visor/json/capas.js"], null)
//# sourceMappingURL=/capas.db35dd20.js.map