const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const path = require('path')
const root = path.resolve(__dirname)

app.use(express.static('docs'))

/**
 * This route is here because GitHub Pages serves static
 * sites using a subdomain.com/repo structure. This 
 * implementation will treat all errors as 404 not found.
 */
app.get('/variety-store/assets/:fileName', (request, response)=>{
    try {
        const assetpath = `${root}/docs/assets/${request.params.fileName}`
        const mimes = {
            '.js':  'text/javascript',
            '.css': 'text/css'
        }
        if (fs.existsSync(assetpath)) {
            const extname = path.extname(assetpath)
            response.set('Content-Type', mimes[extname])
            response.send(fs.readFileSync(assetpath))
            return
        }
        throw new Error()
    } catch (error) {
        response.status(404)
        response.json({error:'Page Not Found'})
    }
})
app.use(function(request, response){
    response.status(404)
    response.json({error:'Page Not Found'})
})

app.listen(port, () => {
    console.log(`App static listening on port ${port}`)
})