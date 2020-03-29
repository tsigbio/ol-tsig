import * as olFormat from 'ol/format';
import * as olSource from 'ol/source';

// ------------------------------------------------------------------

function json2source(src) {
    if (src.source) {
        src.source = json2source(src.source);
    }
    if (src.format) {
        src.format = new olFormat[src.format.type](src.format);
    }
    return new (olSource[src.type])(src);
}

function json2sources(layer) {
    if (layer.sourceSelect) {
        for (let i = 0, ii = layer.sources.length; i < ii; ++i) {
            if (layer.sourceSelect === layer.sources[i].name) {
                return json2source(layer.sources[i]);
            }
        }
    } else {
        layer.sourceSelect = layer.source[0].name;
        return json2source(layer.sources[0]);
    }
}

// ------------------------------------------------------------------

const olTsJson2Source = {
    json2source: json2source,
    json2sources: json2sources
};

export default olTsJson2Source;

// ------------------------------------------------------------------
