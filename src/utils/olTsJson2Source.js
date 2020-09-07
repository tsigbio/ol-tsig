import * as olFormat from 'ol/format';
import * as olSource from 'ol/source';
import { bbox as bboxStrategy } from 'ol/loadingstrategy';
import { transformExtent as transform } from 'ol/proj';

// ------------------------------------------------------------------

function json2source(src) {
    if (src.source) {
        src.source = json2source(src.source);
    }
    if (src.format) {
        src.format = new olFormat[src.format.type](src.format);
    }
    let psrc = {};
    if (src.strategy && src.strategy === 'bbox') {
        src.strategy = bboxStrategy;
        const u = src.url;
        const p = src.projection;
        src.url = function(extent, resolution, projection) {
            const b = (projection.getCode() !== p) ? transform(extent, projection, p) : extent;
            const pj = p || projection.getCode();
            psrc.refresh();
            return u + b.join(',') + '&srs=' + pj;
        };
    }
    psrc = new (olSource[src.type])(src);
    return psrc;
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
