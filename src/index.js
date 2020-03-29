/** @namespace  ol.tsig
 */
/* global ol */

import * as olTsLayer from './layer';
import * as olTsControl from './control';
import * as OlTsMap from './map';
import * as olTsUtils from './utils';

if (window.ol && !ol.tsig) {
    ol.tsig = {
        layer: olTsLayer,
        control: olTsControl,
        map: OlTsMap,
        utils: olTsUtils
    };
}

export { OlTsMap, olTsLayer, olTsControl, olTsUtils };
