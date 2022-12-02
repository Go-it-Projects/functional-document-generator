import Axios from 'axios'
import fs from 'fs'

export  async  function downloadImage( url: string, filepath: string){

    const response = await Axios({
        url,
        responseType: 'stream'
        })

    return new Promise((resolve, reject)=> {
        response.data.pipe(fs.createWriteStream(filepath))
        .on('error', reject)
        .once('close', () => resolve(filepath))
    })
}