// Read sources
const fs = require('fs');
const path = require('path');

// Require something from string
function requireFromString(src, filename) {
    var Module = module.constructor;
    var m = new Module();
    m._compile(src, filename);
    return m.exports;
}

// Convert an image to base64
function imageToBase64(imagePath) {
    // Check the file extension
    const fileExtension = path.extname(imagePath).toLowerCase();

    let base64String;

    if (fileExtension === '.svg') {
        // Read SVG file as UTF-8 text
        const svgContent = fs.readFileSync(imagePath, 'utf-8');
        base64String = Buffer.from(svgContent).toString('base64');
    } else {
        // Read other image files as binary buffer
        const imageBuffer = fs.readFileSync(imagePath);
        base64String = imageBuffer.toString('base64');
    }

    return base64String;
}

// Establish paths
const indexPath = path.join(__dirname, 'index.html');
const sourcesPath = path.join(__dirname, 'sources.js');
const mainjsPath = path.join(__dirname, 'main.js');
const cssPath = path.join(__dirname, 'main.css');

// read files
let indexContent = fs.readFileSync(indexPath, 'utf-8');
let sourcesContent = fs.readFileSync(sourcesPath, 'utf-8');
let mainjsContent = fs.readFileSync(mainjsPath, 'utf-8');
let cssContent = fs.readFileSync(cssPath, 'utf-8');

// Import sources using requireFromString
const {globalhost, sources} = requireFromString(sourcesContent + 'module.exports = {globalhost, sources};', '');

sources.forEach(source => {
    if(source.img === null || source.img === '') return;
    // Get the image
    const imgPath = path.join(__dirname, source.img);
    const fileExtension = path.extname(imgPath).substring(1);
    const mimeType = fileExtension === 'svg' ? 'svg+xml' : fileExtension;
    const base64Image = `data:image/${mimeType};base64,${imageToBase64(imgPath)}`; 
    source.img = base64Image;
});

// Shove style in html
indexContent = indexContent.replace('<link rel="stylesheet" type="text/css" href="main.css">', `<style type="text/css">${cssContent}</style>`);

// Shove sources in html
indexContent = indexContent.replace('<script type="text/javascript" src="sources.js"></script>', 
    `<script type="text/javascript">const globalhost = ${globalhost};const sources = ${JSON.stringify(sources)};</script>`);
// Shove mainjs in html
indexContent = indexContent.replace('<script type="text/javascript" src="main.js"></script>', `<script type="text/javascript">${mainjsContent}</script>`);

fs.writeFileSync('index.singlefile.html', indexContent);
