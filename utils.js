var util = require('./utils.js')
let knex = require('knex');

module.exports = {

    sleep: function sleep(ms) {
        return new Promise(resolve => setTimeout( resolve, ms ));
    },

    wait: async function wait() {
        await util.sleep( 1000*5 ) 
        // while ( new Date().getHours() != 11) {
        //     while ( new Date().getHours() > 11 || new Date().getHours() <= 5  ) {

        //         await util.sleep( 1000*60*60*4 )
        //     }

        //     while ( new Date().getHours() > 6 && new Date().getHours() < 10) {

        //         await util.sleep( 1000*60*30 )
        //     }

        //     await util.sleep ( 1000*60 )
        // }
    },

    getDateString: function getDateString() {
        var date = new Date()
        let dateString = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
        return dateString.toString()
    },

    getTimeString: function getTimeString(date) {
        timeString = date.getHours().toString() + ":" + date.getMinutes().toString() + ":" + date.getSeconds().toString();
        return timeString;
    },

    connectKnex: function connectKnex() {
        return knex({
            client: 'mysql',
            connection: {
                host : '172.25.116.18',
                user : 'eduardo',
                password : 'eduardo',
                database : 'emenda_db'
            }
        });
    }
    

    
};