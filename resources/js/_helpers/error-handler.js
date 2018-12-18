export function errorHandler(error) {

    // ensure the return object has a message property at the very least
    let data = {
        message: "An unknown error occurred",
        devMessage: error
    };

    // typically, message will be in error.response.data.message
    if (error.response.data.message) {
        data = error.response.data;
    }
    // evaluate cases where there might be multiple errors and concatonate
    else if (error.response.data.errors) {
        let message = "";
        _.each(error.response.data.errors, (messages, key) => {
            message += key + ": ";
            _.each(messages, (msg) => {
                message += msg + " ";
            });
            data = {
                message: message.trim()
            }
        });
    }
    return Promise.reject(data);
}
