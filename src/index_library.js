/** @namespace  ol.ts
 */
/* global ol */

import * as olTslayer from './ol_tsig/layer';
import * as olTsMap from './ol_tsig/map';
import * as olTsUtils from './ol_tsig/utils';

if (window.ol && !ol.ts) {
    ol.ts = {
        layer: olTslayer,
        map: olTsMap,
        utils: olTsUtils
    };
}
