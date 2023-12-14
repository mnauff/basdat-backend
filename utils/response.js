export const generateResponse = (status, message, data = null) => {
    return {
        response: {
            status,
            message,
        },
        data,
    }
}
