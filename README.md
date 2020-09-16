# OL-TSIG

Librería Para extender las clases de Openlayers, permitiendo su configuración a partir de un fichero JSON.
Dicha configuración tiene la misma estructura que una definición de mapa tipica de OL pero sin la creación de Objetos.

Ejemplo:

Original de Openlayers:

```
var map = new Map({
    layers: [
        new TileLayer({
            source: new OSM()
        }),
        new ImageLayer({
            extent: [-13884991, 2870341, -7455066, 6338219],
            source: new ImageWMS({
                url: 'https://ahocevar.com/geoserver/wms',
                params: {'LAYERS': 'topp:states'},
                ratio: 1,
                serverType: 'geoserver'
            })
        })
    ],
    target: 'map',
    view: new View({
        center: [-10997148, 4569099],
        zoom: 4
    })
});
```

Configuración con tsig-OL:

```
var map = new Map({
    layers: [
        {
            type: 'Tile',
            source: { type: 'OSM' }
        },
        {
            type: 'Image',
            extent: [-13884991, 2870341, -7455066, 6338219],
            source: {
                type: 'ImageWMS',
                url: 'https://ahocevar.com/geoserver/wms',
                params: {'LAYERS': 'topp:states'},
                ratio: 1,
                serverType: 'geoserver'
            }
        }
    ],
    target: 'map',
    view: {
        center: [-10997148, 4569099],
        zoom: 4
    }
});
```


# Publicar en el repositorio NPMJS

Tener el usuario local de NPM registrado en la máquina local

```
npm adduser
```

Subir los cambios al Github:

```
git add .
git commit -m "First commit"
git remote add origin https://github.com/tsig-idr/ol-tsig.git
git remote -v
git push origin master
```

Compilar y Publicar una nueva distribución en NPM. 

Nota: Cambiar la version del package.json antes de publicar.

```
npm run build-package
cd build
npm publish
```