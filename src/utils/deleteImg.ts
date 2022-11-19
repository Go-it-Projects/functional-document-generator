import fs from 'fs'

export async function deleteImg(filepath: string){
    try{
        fs.unlinkSync(filepath)
    }catch(err){
        console.log(err)
    }
}