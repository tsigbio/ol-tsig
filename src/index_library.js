/** @namespace  ol.ts
 */
/* global ol */

import * as olTslayer from './ol_ts/layer';
import * as olTsMap from './ol_ts/map';
import * as olTsUtils from './ol_ts/utils';

if (window.ol && !ol.ts) {
    ol.ts = {
        layer: olTslayer,
        map: olTsMap,
        utils: olTsUtils
    };
}
