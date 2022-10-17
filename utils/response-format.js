 const responseFormat = (res_status, message, data_title, user_id, group_Id, data_type, data_count, data_status,) => {
    return {
        "status": res_status,
        "message": message,
        "dataInfo": {
            "dataTitle": data_title,
            "userId": user_id,
            "groupId": group_Id,
            "dataType": data_type,
            "dataCount": data_count,
            "dataStatus": data_status
        }
    };
}
const responseFormat_data_index = (res_status, message, type, data) => {
    return {
        "status": res_status,
        "message": message,
        "dataType": type,
        "data": data
    };
}
const responseFormat_error = (res_status, error) => {
    return {
        "status": res_status,
         error,
    };
}


const dataFormat  = (getData) => {
    if(getData) return {"data":{getData}}
}  

const responseErrFormat = (status, error, ) => {
    return {
        "status": status,
        error
    };
}

module.exports = {responseFormat, responseFormat_data_index, responseErrFormat, dataFormat, responseFormat_error};