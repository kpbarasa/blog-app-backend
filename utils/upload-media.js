const moment = require('moment')
const mongoose = require('mongoose')
const fs = require('fs')
const Blog_Media = require('../models/media')

const uploadBody = (value, media_id, media_type) => { // Upload body object format
    return {
        value,
        media_id,
        media_type
    }
}

async function uploadImages(file, post_id, setFeaturedImg) {
    try {

        // PROCESS IMAGE START
        const time = moment().format('h:mm a')
        const date = moment().subtract(10, 'days').calendar()

        const splitted = file.split('base64,')
        const format = splitted[0].split('/')[1]

        const fileName = post_id + '-post-img' + '.' + format.split(';')[0] // Gallery Title

        const dir = "./assets/images" // File Storage directory

        const media_id = new mongoose.mongo.ObjectId()
        const media_type = "image"

        await Blog_Media.create(uploadBody(fileName, media_id, media_type)) // Save to db 

        if (fs.existsSync(dir)) {// check if directory exists, write file to directory

            fs.writeFile("assets/images/" + fileName, splitted[1], { encoding: 'base64' }, function (err) {
                if (err) {
                    return console.error(err);
                }
            });


        } else {// Create directory, write file to directory

            fs.mkdirSync(dir) // Create directory

            fs.writeFile("assets/images/" + fileName, splitted[1], { encoding: 'base64' }, function (err) {
                if (err) {
                    return console.error(err);
                }
            });

        }

        if (setFeaturedImg === "featured_img") return fileName
        // PROCESS IMAGE END

    } catch (error) {
        console.log('Error writing Metadata.json:' + error.message)
    }
}

const uploadGallery = async (file, post_id, setFeaturedImg) => {

    const gallery_id = new mongoose.mongo.ObjectId()

    try {

        if (!file) throw "no Gallery file selected"

        file.map(async (res, index) => {
            // PROCESS IMAGES START
            const time = moment().format('h:mm a')
            const date = moment().subtract(10, 'days').calendar()
            const media_type = "gallery"

            const splitted = res.split('base64,')    // Image data info
            const format = splitted[0].split('/')[1] // Image format
            const GalleryName = "-" + post_id + "-" + index + '-gal-' + gallery_id + '.' + format.split(';')[0]  // Gallery Title
            const dir = "assets/images/" // Gallery Storage Directory

            await Blog_Media.create(uploadBody(GalleryName, gallery_id, media_type)) // Save to db 

            if (fs.existsSync(dir)) { // Check if directory exists, write Gallery to directory


                fs.writeFile("assets/images/" + GalleryName, splitted[1], { encoding: 'base64' }, function (err) {
                    if (err) {
                        return console.error(err);
                    }
                });

            } else {// Create directory, write Gallery to directory

                fs.mkdirSync(dir) // Create directory

                fs.writeFile("assets/images/" + GalleryName, splitted[1], { encoding: 'base64' }, function (err) {
                    if (err) {
                        return console.error(err);
                    }
                });

            }

            // PROCESS IMAGES END
            if (setFeaturedImg === "featured_gallery") return GalleryName
        })

    } catch (error) {
        console.log(error);
    }
}

const uploadVideos = async (file, post_id, setFeaturedImg) => {
    // PROCESS VIDEO START
    const time = moment().format('h:mm a')
    const date = moment().subtract(10, 'days').calendar()
    const media_type = "video" 

    try {

        if (!file) throw "no video file selected"

        if (file.videoType !== "CV-url") {

            const videoName = file.video

            video_title = videoName

            Blog_Media.create(uploadBody(videoName, post_id, media_type)) // Save to db 

            if (setFeaturedImg === "featured_video") return videoName

        }
        else {
            const videoFile = file.video
            const splitted = videoFile.split('base64,')
            const format = splitted[0].split('/')[1]
            const videoName = post_id + '-video' + '.' + format.split(';')[0]  // Video Title
            const dir = "assets/videos/" // File Storage directory

            await Blog_Media.create(uploadBody(videoName, post_id, media_type)) // Save to db 

            if (fs.existsSync(dir)) { // Check if directory exists, write Gallery to directory

                fs.writeFile(dir + videoName, splitted[1], { encoding: 'base64' }, function (err) {
                    if (err) {
                        return console.error(err);
                    }
                });

            } else {// Create directory, write Gallery to directory

                fs.mkdirSync(dir) // Create directory

                fs.writeFile(dir + videoName, splitted[1], { encoding: 'base64' }, function (err) {
                    if (err) {
                        return console.error(err);
                    }
                });

            }

            if (setFeaturedImg === "featured_video") return videoName
        }

        // PROCESS VIDEO END

    } catch (error) {
        console.log(error);
    }
}

const deleteUploadImages = async (id) => {
    try {
        let media = await Blog_Media.find({ media_id: id })

        if (!media.length === 0) throw "media  not found !"

        const dirImgs = "assets/images/" // File Storage directory

        media.map(res =>

            // DELETE POST IMAGES 
            fs.existsSync(dirImgs + res.value) ? // check if directory exists

                fs.unlink(dirImgs + res.value, function (error) { // delete file  
                    if (error) throw error

                    // if no error, file has been deleted successfully

                })
                :
                console.log("no files found")

        )


        await Blog_Media.remove({ media_id: id }) // Delete media

    } catch (error) {
        console.log(error)
    }
}

const deleteUploadVideos = async (id) => {
    try {
        let media = await Blog_Media.find({ media_id: id })

        if (!media.length === 0) throw "media  not found !"

        const dirImgs = "assets/videos/" // File Storage directory

        media.map(res =>

            // DELETE POST IMAGES 
            fs.existsSync(dirImgs + res.value) ? // check if directory exists

                fs.unlink(dirImgs + res.value, function (error) { // delete file  
                    if (error) throw error

                    // if no error, file has been deleted successfully

                })
                :
                console.log("no files found")

        )


        await Blog_Media.remove({ media_id: id }) // Delete media

    } catch (error) {
        console.log(error)
    }
}

module.exports = { uploadImages, uploadGallery, uploadVideos, deleteUploadImages, deleteUploadVideos }