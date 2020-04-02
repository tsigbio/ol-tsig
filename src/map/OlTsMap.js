
import { getUid as olGetUid } from 'ol/util';
import OlMap from 'ol/Map';
import OlView from 'ol/View';
import { transform } from 'ol/proj';
import OlInteractionSelect from 'ol/interaction/Select';
import { pointerMove as olEventsConditionPointerMove } from 'ol/events/condition';

import OlTsEditionBar from '../control/OlTsEditionBar';
import olTsJson2Layer from '../utils/olTsJson2Layer';
import olTsJson2Style from '../utils/olTsJson2Style';

// ------------------------------------------------------------------------------

/**
 * Sobreescritura de la función privada "giveSelectedStyle_" para poder capturar el radio de los puntos de los elementos en el Highlight
 */
OlInteractionSelect.prototype.giveSelectedStyle_ = function(feature) {
    const key = olGetUid(feature);
    this.featureStyleAssociation_[key] = feature.getStyle();
    const s = this.featureLayerAssociation_[key].getStyle()(feature);
    const sI = s.getImage && s.getImage();
    sI && this.style_.getImage().setRadius(sI.getRadius());
    const st = (Array.isArray(s)) ? s.slice() : [s];
    st.push(this.style_);
    feature.setStyle(st);
};

// ------------------------------------------------------------------------------

class OlTsMap extends OlMap {
    constructor(optOptions) {
        const options = optOptions || {};
        const baseOptions = {
            ...options
        };
        delete baseOptions.layers;
        delete baseOptions.view;
        if (options.view) {
            if (options.view.projectionCenter) {
                options.view.center = transform(options.view.center, options.view.projectionCenter, 'EPSG:3857');
            }
            baseOptions.view = new OlView(options.view);
        }
        baseOptions.layers = olTsJson2Layer.json2Layers(options.layers);
        super(baseOptions);
        this.workLayer = undefined;
        this.editionBar = undefined;
        this.interactionMap = {};
    }

    // -------workLayer ------------------------------------------------ <<<<<

    setWorkLayer(layer) {
        if (this.workLayer) {
            delete this.workLayer.workLayer;
        }
        if (!layer || (this.workLayer === layer)) {
            this.workLayer = undefined;
            return undefined;
        }
        this.workLayer = layer;
        this.workLayer.workLayer = true;
        return this.workLayer;
    }

    // -------workLayer ------------------------------------------------ >>>>>
    // -------Interacciones -------------------------------------------- <<<<<

    activateInteraction(action) {
        this._eraseInteractionMap('highlight');
        if (action === 'highlight') {
            this._createInteractionHighlight();
        }
    }

    activateBar(bar, activate, layer) {
        if (bar === 'editionBar') {
            if (activate) {
                this._eraseInteractionMap('highlight');
                if (this.editionBar && layer !== this.editionBar.getLayer()) {
                    this.editionBar.saveChanges();
                    this.editionBar.destroy();
                    this.editionBar = undefined;
                }
                if (!this.editionBar) {
                    if (layer.editable) {
                        this.editionBar = new OlTsEditionBar({
                            map: this,
                            layer: layer
                        });
                    }
                }
            } else {
                if (this.editionBar) {
                    this.editionBar.saveChanges();
                    this.editionBar.destroy();
                    this.editionBar = undefined;
                }
                this._createInteractionHighlight();
            }
        }
    }

    isEditionBarActivated() {
        return !!this.editionBar;
    }

    _eraseInteractionMap(action) {
        if (this.interactionMap[action]) {
            if (this.interactionMap[action].getFeatures) {
                this.interactionMap[action].getFeatures().clear();
            }
            this.removeInteraction(this.interactionMap[action]);
        }
        this.interactionMap[action] = undefined;
    }

    _createInteractionHighlight() {
        if (!this.interactionMap.highlight) {
            this.interactionMap.highlight = new OlInteractionSelect({
                condition: olEventsConditionPointerMove,
                style: olTsJson2Style.styleSelect(),
                layers: (lyr) => {
                    if (this.workLayer) {
                        if (lyr === this.workLayer) {
                            this._layerPaint = lyr;
                            return true;
                        }
                        this._layerPaint = false;
                        return false;
                    }
                    this._layerPaint = lyr;
                    return true;
                }
            });
            this.addInteraction(this.interactionMap.highlight);
        }
    }
}

export default OlTsMap;
