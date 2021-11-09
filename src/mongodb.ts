import mongoose from 'mongoose';
import config from './config';


mongoose.connect(config.database.uri)

const connection = mongoose.connection

connection.once('open', ()=>{
    console.log('Database Connected')
} )

connection.once('error', (err)=>{
    console.log(err);
    process.exit(1);
})