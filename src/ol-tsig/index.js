/** @namespace  ol.ts
 */
/* global ol */

import * as olTslayer from './layer';
import * as olTsMap from './map';
import * as olTsUtils from './utils';

if (window.ol && !ol.ts) {
    ol.ts = {
        layer: olTslayer,
        map: olTsMap,
        utils: olTsUtils
    };
}
