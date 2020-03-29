import OlLayerGroup from 'ol/layer/Group';
import { olTsJson2Layer } from '../utils';

// Constructor
class OlTsLayerGroupORS extends OlLayerGroup {
    constructor(optOptions) {
        const options = optOptions || {};
        const baseOptions = { ...options };
        delete baseOptions.layers;
        baseOptions.layers = olTsJson2Layer.json2Layers(options.layers);
        super(baseOptions);
    }
}

export default OlTsLayerGroupORS;
