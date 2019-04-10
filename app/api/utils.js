module.exports = {

    sleep: function sleep(ms) {
        return new Promise(resolve => setTimeout( resolve, ms ));
    },

    getDateString: function getDateString() {
        var date = new Date()
        let dateString = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
        return dateString.toString()
    }
};