module.exports = {
    
    success(res, data = null) {
        this.sendResponse(res, 200, data);
    },
    
    notFound(res, data = null) {
        this.sendResponse(res, 404, data);
    },
    
    error(res, data = null) {
        this.sendResponse(res, 500, data);
    },
    
    sendResponse(res, statusCode, data){
        res.status(statusCode).send(data);
    }
};
