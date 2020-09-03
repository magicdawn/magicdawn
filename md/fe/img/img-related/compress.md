# 压缩图片

## File => File

1. File 使用 createImageBitmap 转换成 ImageBitmap
2. 使用 canvas: ctx.drawImage(ImageBitmap), ctx.getImageData 转换成 ImageData
3. ImageData 是一个 Uint8ClampedArray, 就可以方便传输压缩了

## browser-webp File => File

1. File 使用 createImageBitmap 转换成 ImageBitmap
2. 使用 canvas: ctx.drawImage(ImageBitmap), ctx.getImageData 转换成 ImageData
3. canvas.toBlob('image/webp') 转成 webp, 大小会小很多
