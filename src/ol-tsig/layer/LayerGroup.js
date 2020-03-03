import OlLayerGroup from 'ol/layer/Group';
import { OlTsUtilsJSON2Layers } from '../utils';

// Constructor
class OlTsLayerGroup extends OlLayerGroup {
    constructor(optOptions) {
        const options = optOptions || {};
        const baseOptions = {
            ...options
        };
        delete baseOptions.layers;
        baseOptions.layers = (new OlTsUtilsJSON2Layers()).json2Layers(options.layers);
        super(baseOptions);
    }
}

export default OlTsLayerGroup;
