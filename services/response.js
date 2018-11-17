module.exports = {

    parse: function(error, messageOrError){
        if(error)return {success : false, message : messageOrError};
        else if(typeof messageOrError == 'string')return {success : true, message : messageOrError};
        else return { success : true, data : messageOrError};
    },
};
