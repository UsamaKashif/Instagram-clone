import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { storage, db } from './firebase'
import firebase from "firebase"
import "./ImageUpload.css"

const ImageUpload = ({username}) => {
    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0)
    const [caption, setCaption] = useState("")

    const handleChange = (e) => {
        if (e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    const handleupload = (e) => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on(
            "state_change",
            (snapshot) => {
                // progress logic
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(progress)
            },
            (error) => {
                console.log(error)
            },
            () => {
                //complete function
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("posts").add({
                            // timestamp: firebase.firestore.FieldValue.serverTimestamp,
                            caption: caption,
                            imageUrl: url,
                            username: username
                        })

                        setProgress(0)
                        setCaption("")
                        setImage(null)
                    })
            }
        )
    }

    return (
        <div className="imageUpload">
            <progress className="imageUpload__progress" value={progress} max="100" />
            <input onChange={e => setCaption(e.target.value)} value={caption} placeholder="Enter a caption" type="text"/>
            <input type="file" onChange={handleChange}/>
            <Button onClick={handleupload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload
