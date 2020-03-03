import OlLayerGroup from 'ol/layer/Group';
import { olTsUtilsJSON2Layers } from '../olTsUtils';

// Constructor
class OlTsLayerGroupORS extends OlLayerGroup {
    constructor(optOptions) {
        const options = optOptions || {};
        const baseOptions = { ...options };
        delete baseOptions.layers;
        baseOptions.layers = olTsUtilsJSON2Layers.json2Layers(options.layers);
        super(baseOptions);
    }
}

export default OlTsLayerGroupORS;
