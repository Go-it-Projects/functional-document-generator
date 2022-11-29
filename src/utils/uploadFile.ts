import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    accessKeyId: "AKIA4WHO3N32P7YQKDHC", //process.env.AWS_ACCESS_KEY,
    secretAccessKey: "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"// process.env.AWS_SECRET_KEY,
});

export async function UploadFile(file: Buffer,nomeCliente: string){

    const params = {
        Bucket: 'functional-document-bucket',
        Key : `${nomeCliente}-FunctionalDocument.pdf`,
        Body: file,
    }

    s3.upload(params, (err: any, data: any) => {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    })
}