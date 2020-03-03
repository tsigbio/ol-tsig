import * as olLayers from 'ol/layer';
import * as olTsLayers from '../layer';
import { olTsUtilsJSON2Source, olTsUtilsJSON2Style } from '../utils';

// ------------------------------------------------------------------

function layersClass() {
    return {
        ...olLayers,
        ...olTsLayers
    };
}

// ------------------------------------------------------------------

function json2Layer(layer) {
    const ly = JSON.parse(JSON.stringify(layer));
    if (ly.sources) {
        ly.source = olTsUtilsJSON2Source.json2sources(ly);
    } else if (ly.source) {
        ly.source = olTsUtilsJSON2Source.json2source(ly.source);
    }
    if (ly.style) {
        ly.style = olTsUtilsJSON2Style.json2Style(ly.style);
    }
    const l = new (layersClass())[ly.type](ly);
    return l;
}

function json2Layers(layers) {
    const l = [];
    for (let i = 0, ii = layers.length; i < ii; ++i) {
        if (layers[i].type) {
            l.push(json2Layer(layers[i]));
        }
    }
    return l;
}

// ------------------------------------------------------------------

const olTsUtilsJSON2Layer = {
    json2Layer: json2Layer,
    json2Layers: json2Layers
};

export {
    olTsUtilsJSON2Layer
};

// ------------------------------------------------------------------
