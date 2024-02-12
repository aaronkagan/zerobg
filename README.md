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

SHADCN for styling

TODO:

I get error "There was an unexpected error: SyntaxError: Unexpected token 'A', \"An error o\"... is not valid JSON"
2 things:
please catch the error, on the back end and show a toaster or something instead of that weird error DONE

also name the branch like a real domain so is is like zerobg or something like that so it would end up zerobg.vercel.app DONE

I'm also expecting something very nice looking man, I have seen your UI's even if is just a template, I wont take crappy design, hope to see loaders, toaster errors or success, confetti and all sort of thing I have seen you post
replicate has some next starters demo take a look at how they do it, that might help

Vercel has a time out of 10 seconds for http calls, the call to remove the bg to replicate is taking longer than that thus timing out, one way to work around this is: when you call replicate replicate responds with a prediction id, you can send 200 to the front end with that prediction id and then make a while call to that predictionID until it returns success which will also send you the url of the generated image or you can use a webhook which replicate usually has that option

confetti library : https://www.npmjs.com/package/react-confetti-boom#live-demo
React Dropzone library: https://www.npmjs.com/package/react-dropzone
React dropzone tutorial https://www.youtube.com/watch?v=8uChP5ivQ1Q

Apply this pattern to recall the API over and over until it succeeds
