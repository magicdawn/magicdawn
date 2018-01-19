# Map

- zoom
- center = [longitude, latitude]
- Bearing(轴承 / 方位): a value between 0 and 360 degrees that determines the map’s bearing, or rotation. 旋转
- pitch: a value between 0 and 60 degrees that determines the map’s tilt, or pitch. 倾斜



## Layer

>  map.addLayer(layer)



## layer.type

- line



## layer.layout

- visibility: visible 可视的
- ​

## layer.paint



## layer.source-



## Source layer.source

# Source

https://www.mapbox.com/mapbox-gl-js/style-spec/#sources

- source.url
- source.type

## source.type

- raster tiles 传统瓦片图
- vector tiles <https://www.mapbox.com/help/define-vector-tiles/> 轻量的数据格式
- GeoJson
- image
- video

https://www.mapbox.com/help/define-tileset/

tileset 的定义

- type
- url