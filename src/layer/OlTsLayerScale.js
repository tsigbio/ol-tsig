import OlLayerGroup from 'ol/layer/Group';
import olTsJson2Layer from '../utils/olTsJson2Layer';
import OlTsError from '../utils/OlTsError';

// ==================================================

class OlTsLayerScale extends OlLayerGroup {
    constructor(optOptions) {
        const options = optOptions || {};
        const baseOptions = {
            ...options
        };
        delete baseOptions.layers;
        baseOptions.layers = olTsJson2Layer.json2Layers(options.layers);
        if (scaleLayerOK(baseOptions.layers)) {
            super(baseOptions);
        } else {
            throw new OlTsError(100);
        }
    }
}

// ==================================================

function getRangeZoom(lyr) {
    const mx = lyr.getMaxZoom();
    return [lyr.getMinZoom(), (mx === Infinity) ? 100 : mx];
}

function scaleLayerOK(lyrs) {
    const r = [];
    for (let i = 0; i < lyrs.length; i += 1) {
        lyrs[i].set('visible', true, true);
        const s = getRangeZoom(lyrs[i]);
        for (let j = 0; j < i; j += 1) {
            if ((s[0] >= r[j][0]) && (s[0] < r[j][1])) return false;
            if ((s[1] > r[j][0]) && (s[1] <= r[j][1])) return false;
        }
        r.push(s);
    }
    return true;
}

// ==================================================

export default OlTsLayerScale;

// ==================================================
