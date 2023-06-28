// Import data....
const {PORT,mongoose,DATA_BASE,app} = require('./app');



// connect mongoose...
const mongooseConncet = async ()=>{
    try {
       await mongoose.connect(DATA_BASE);
       console.log("mongoose connected done.");
    } catch (err) {
        console.log(err);
    }
};

// run server.....
app.listen(PORT,async()=>{
    try {
        console.log(`This Server Run In http://127.0.0.1:${PORT}`);
        await mongooseConncet();
    } catch (err) {
        console.log(err);
    }
});