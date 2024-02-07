Styling with ShadCN
Remove BG with Replicate API https://replicate.com/cjwbw/rembg
Compare images with react compare plugin

this will require you to do a front end and a API endpoint that will call Replicate API with the image uploaded(send it as dataurl) https://www.youtube.com/watch?v=VxF0CFcsQmE
Replicate will respond with the image but not background,

you display it back to the front using the react compare plugin
https://www.npmjs.com/package/react-compare-image

must have
upload photo
remove background
download photo https://www.npmjs.com/package/file-saver

import { saveAs } from 'file-saver'

const Index = () => {
const downloadImage = () => {
saveAs('image_url', 'image.jpg') // Put your image URL here.
}

    return <Button onClick={downloadImage}>Download!</Button>

}
