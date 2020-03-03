import 'ol/ol.css';
import './external_Modules/layerSwitcher/LayerSwitcher.css';
import './css/main.css';

import mapa from './json/capas.js';
import OlExtControlLayerSwitcher from './external_Modules/layerSwitcher/LayerSwitcher';
import OlTsMap from '../../src/ol_tsig/map/OlTsMap';

export default () => {
    mapa.target = 'map';
    const map = new OlTsMap(mapa);

    // Añadimos control de capas dentro del mapa
    const switcher = new OlExtControlLayerSwitcher({
        show_progress: true,
        extent: true,
        trash: true,
        oninfo: (layer) => {
            console.log('modify: ' + layer.get('title'));
        },
        onselect: (layer) => {
            if (map.isEditionBarActivated()) {
                map.activateBar('editionBar', false);
            }
            map.setWorkLayer(layer);
            switcher.drawPanel();
        },
        onedit: (layer) => {
            if (map.workLayer === layer) {
                if (map.isEditionBarActivated()) {
                    map.activateBar('editionBar', false);
                } else {
                    map.activateBar('editionBar', true, layer);
                }
            } else {
                if (map.setWorkLayer(layer)) {
                    map.activateBar('editionBar', true, layer);
                } else {
                    map.activateBar('editionBar', false);
                }
            }
            switcher.drawPanel();
        },
        style: 'workLayer'
    });
    /*
    switcher.on('drawlist', function(e) {
        var layer = e.layer;
        document.createElement('div').innerText('?')// addClass('layerInfo')
          .click(function(){
            alert(layer.get('title'));
          })
          .appendTo($('> .ol-layerswitcher-buttons', e.li));
      });

    */
    map.addControl(switcher);
    map.activateInteraction('highlight');
    /*
    switcher.on('toggle', function(e) {
        console.log('Collapse layerswitcher', e.collapsed);
    });
    */
};
