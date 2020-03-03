import 'ol-ext/dist/ol-ext.css';
import OlExtControlBar from 'ol-ext/control/Bar';
import OlExtControlEditBar from 'ol-ext/control/EditBar';
import OlExtControlButton from 'ol-ext/control/Button';
import OlExtInteractionUndoRedo from 'ol-ext/interaction/UndoRedo';
import OlInteractionSelect from 'ol/interaction/Select';
import { click as olEventsConditionClick } from 'ol/events/condition';

import { olTsUtilsJSON2Style } from '../utils';

// ------------------------------------------------------------------------------

/**
 *  Ampliación de la clase ol.control.Bar con la función destroy.
 */
OlExtControlBar.prototype.destroy = function() {
    function eraseInteractions(ob) {
        if (ob._interactions) {
            for (const key of Object.keys(ob._interactions)) {
                ob.getMap().removeInteraction(ob._interactions[key]);
            }
        }
    }

    if (this.getMap()) {
        eraseInteractions(this);
        for (const ctrl of this.controls_) {
            if (ctrl instanceof OlExtControlBar) {
                ctrl.destroy();
            } else {
                if (ctrl.getSubBar && ctrl.getSubBar()) {
                    ctrl.getSubBar().destroy();
                }
                eraseInteractions(ctrl); // Seguramente no haga nada, pero me aseguro de borrar las interacciones.
                this.getMap().removeControl(ctrl);
                const ele = ctrl.getButtonElement(); // ctrl.element;
                ele.parentNode.removeChild(ele);
            }
        }
        this.element.parentNode.removeChild(this.element);
        this.getMap().removeControl(this);
        this.controls_ = [];
    }
};

/**
 * Ampliación de la interaccion ol_interaction_UndoRedo para recuperar los cambios de la capa
 */
OlExtInteractionUndoRedo.prototype.getFeaturesChanged = function() {
    const changed = {};
    let count = 0;
    for (let i = 0, ii = this._undoStack.length; i < ii; i++) {
        if (this._undoStack[i].feature) {
            const olUid = 'f' + this._undoStack[i].feature.ol_uid;
            if (changed[olUid]) {
                if (changed[olUid].type === 'addfeature') {
                    if (this._undoStack[i].type === 'removefeature') {
                        delete changed[olUid];
                    } else {
                        changed[olUid].feature = this._undoStack[i].feature;
                    }
                } else {
                    changed[olUid].feature = this._undoStack[i].feature;
                    changed[olUid].type = this._undoStack[i].type;
                }
            } else {
                count++;
                changed[olUid] = {
                    feature: this._undoStack[i].feature,
                    type: this._undoStack[i].type
                };
            }
        }
    }
    return count ? changed : undefined;
};

OlExtInteractionUndoRedo.prototype.undoAll = function() {
    var e = this._undoStack.pop();
    if (!e) return;
    this._handleDo(e, true);
    this.undoAll();
};

// ------------------------------------------------------------------------------

/**
 * optOptions:
 *      layer: Capa editable. Debe contener el parámetro: "editable = true" y "geometryType = [Point, LineString, Polygon]"
 *      map: Objeto Mapa donde actuará.
 */

class OlTsEditionBar extends OlExtControlBar {
    constructor(optOptions) {
        const options = optOptions || {};
        if (options.layer && options.layer.editable) {
            super(options);
            const botones = {
                ALL: {
                    Select: true,
                    Delete: true,
                    Info: true,
                    DrawPoint: true,
                    DrawLine: true,
                    DrawPolygon: true,
                    DrawHole: true,
                    DrawRegular: true,
                    Transform: true,
                    Split: true,
                    Offset: true
                },
                Point: {
                    Select: true,
                    Delete: true,
                    Info: false,
                    DrawPoint: true,
                    DrawLine: false,
                    DrawPolygon: false,
                    DrawHole: false,
                    DrawRegular: false,
                    Transform: false,
                    Split: false,
                    Offset: false
                },
                LineString: {
                    Select: true,
                    Delete: true,
                    Info: false,
                    DrawPoint: false,
                    DrawLine: true,
                    DrawPolygon: false,
                    DrawHole: false,
                    DrawRegular: false,
                    Transform: true,
                    Split: true,
                    Offset: true
                },
                Polygon: {
                    Select: true,
                    Delete: true,
                    Info: false,
                    DrawPoint: false,
                    DrawLine: false,
                    DrawPolygon: true,
                    DrawHole: true,
                    DrawRegular: true,
                    Transform: true,
                    Split: false,
                    Offset: false
                }
            };
            this.layer = options.layer;
            this.map = options.map;
            // ------ Barra de edición -----------
            botones[this.layer.geometryType].Select = new OlInteractionSelect({
                condition: olEventsConditionClick,
                style: olTsUtilsJSON2Style.styleEdit(),
                layers: (lyr) => {
                    return (lyr === this.layer);
                }
            });
            this.olControlEditbar = new OlExtControlEditBar({
                source: this.layer.getSource(),
                interactions: botones[this.layer.geometryType] || botones.ALL
            });
            this.addControl(this.olControlEditbar);

            // ------ Barra Undo-Redo ------------

            this.undoInteraction = new OlExtInteractionUndoRedo();
            this.map.addInteraction(this.undoInteraction);
            this.undoInteraction.on('undo', (e) => {
                if (e.action.type === 'addfeature') {
                    this.olControlEditbar.getInteraction('Select').getFeatures().clear();
                    const tran = this.olControlEditbar.getInteraction('Transform');
                    if (tran) {
                        tran.select();
                    }
                }
            });
            // Añadimos botones a la barra Undo-Redo
            this.barUndoRedo = new OlExtControlBar({
                group: true,
                controls: [
                    new OlExtControlButton({
                        html: '<b>&#x21b6</b>',
                        title: 'undo...',
                        handleClick: () => {
                            this.undoInteraction.undo();
                        }
                    }),
                    new OlExtControlButton({
                        html: '<b>&#x21b7</b>',
                        title: 'redo...',
                        handleClick: () => {
                            this.undoInteraction.redo();
                        }
                    })
                ]
            });
            this.addControl(this.barUndoRedo);
            this.setMap(this.map);
        } else {
            return undefined;
        }
    }

    getLayer() {
        return this.layer;
    }

    getFeaturesChanged() {
        if (this.undoInteraction) {
            return this.undoInteraction.getFeaturesChanged();
        }
        return undefined;
    }

    saveChanges() {
        const featuresChanged = this.getFeaturesChanged();
        if (featuresChanged) {
            if (this.layer && this.layer.save) {
                if (confirm('Salvar Capa? ')) {
                    this.layer.save(featuresChanged);
                } else {
                    this.undoEdited();
                }
            }
        }
    }

    undoEdited() {
        this.undoInteraction.undoAll();
    }

    destroy() {
        if (this.map) {
            // Curiosamente undoRedo no se comporta como el resto de OlExtControlBar.
            this.map.removeInteraction(this.undoInteraction);
            this.map.removeControl(this.barUndoRedo);
            // destrucción normal.
            super.destroy();
            this.undoInteraction = undefined;
            this.barUndoRedo = undefined;
            this.map.editionBar = undefined;
            this.map = undefined;
        }
    }
}

export default OlTsEditionBar;
