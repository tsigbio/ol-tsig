/** @namespace  ol.tsig
 */
/* global ol */

import * as olTslayer from './ol-tsig/layer';
import * as olTsMap from './ol-tsig/map';
import * as olTsUtils from './ol-tsig/utils';

if (window.ol && !ol.tsig) {
    ol.tsig = {
        layer: olTslayer,
        map: olTsMap,
        utils: olTsUtils
    };
}
