import fs from 'fs'

export async function deleteFiles(filepath:string){

    try {
      fs.unlinkSync(filepath)
    } catch (err) { 
      console.log(err)
    }
}