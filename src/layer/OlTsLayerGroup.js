import OlLayerGroup from 'ol/layer/Group';
import OlTsJson2Layer from '../utils/olTsJson2Layer';

// Constructor
class OlTsLayerGroup extends OlLayerGroup {
    constructor(optOptions) {
        const options = optOptions || {};
        const baseOptions = {
            ...options
        };
        delete baseOptions.layers;
        baseOptions.layers = (new OlTsJson2Layer()).json2Layers(options.layers);
        super(baseOptions);
    }
}

export default OlTsLayerGroup;
