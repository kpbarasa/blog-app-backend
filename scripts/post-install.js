const fs = require('fs-extra')

const dir = "./assets/videos/" // File Storage directory
const dirVids = "./assets/images/" // File Storage directory

try {

    fs.copySync('./config/config.env.example', './config/config.env') 

    if (!fs.existsSync(dir)) { // Check if directory exists
        fs.mkdirSync(dir) // Create directory 
    }
    if (!fs.existsSync(dirVids)) { // Check if directory exists
        fs.mkdirSync(dirVids) // Create directory 
    }

} catch (err) {

    console.error(err)

}
