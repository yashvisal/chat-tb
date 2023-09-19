import AWS from 'aws-sdk'

export async function uploadToS3(file: File){
    try {
        AWS.config.update({
            accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,

        });

        const s3 = new AWS.S3({
            params: {
                Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
            },
            region: "us-east-1",
        })

        const file_key = 'uploads/' + Date.now().toString() + file.name.replace(' ','-');

        const params = {
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
            Key: file_key,
            Body: file
        };

        const upload = s3.upload(params)
        .on('httpUploadProgress', (evt) => {
            console.log(
                'uploading to s3...', 
                parseInt(((evt.loaded*100)/evt.total).toString())
            ) + "%";
        })
        .promise();

        // might need data as a variable, got this way after changing putObject to upload
        await upload.then(() => {
            console.log('successfully uploaded to S3!', file_key)
        });

        return Promise.resolve({
            file_key,
            file_name: file.name
        });

    } catch (error) {}
}

export function getS3Url(file_key: string){
    const url = 'https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.us-east-1.amazonaws.com/${file_key}';
    return url;
}