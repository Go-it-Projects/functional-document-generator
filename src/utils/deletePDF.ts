import fs from 'fs'

export async function deletePDF(filepath:string){

    try {
        fs.unlink(filepath , (err) => {
            if(err) throw err
        })
    } catch (err) { 
        console.log(err)
    }
}