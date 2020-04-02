/** @namespace  ol.tsig
 */
/* global ol */

import * as tsLayer from './layer';
import * as tsControl from './control';
import * as tsMap from './map';
import * as tsUtils from './utils';

const olTs = {
    layer: tsLayer,
    control: tsControl,
    Map: tsMap,
    utils: tsUtils
};

if (window.ol && !ol.tsig) {
    ol.tsig = olTs;
}

// export { OlTsMap, olTsLayer, olTsControl, olTsUtils };
export { default as OlTsMap } from './map/OlTsMap';

export { default as OlTsEditionBar } from './control/OlTsEditionBar';

export { default as OlTsError } from './utils/OlTsError';
export { default as olTsJson2Style } from './utils/olTsJson2Style';
export { default as olTsJson2Source } from './utils/olTsJson2Source';
export { default as olTsJson2Layer } from './utils/olTsJson2Layer';

export { default as OlTsLayerGroup } from './layer/OlTsLayerGroup';
export { default as OlTsLayerScale } from './layer/OlTsLayerScale';
export { default as OlTsLayerVector } from './layer/OlTsLayerVector';
export { default as OlTsLayerORS } from './layer/OlTsLayerORS';
export { default as OlTsLayerGroupORS } from './layer/OlTsLayerGroupORS';
