'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const server = express();
server.use(cors());

const PORT = process.env.PORT;

server.get('/', (req, res) => {
    res.send('hello');
})

mongoose.connect('mongodb://localhost:27017/books',
    { useNewUrlParser: true, useUnifiedTopology: true });


const booksSchema = new mongoose.Schema({
    name: String,
    description: String,
    image_url: String
})


const userSchema = new mongoose.Schema({
    email: String,
    books: [booksSchema]

});


const myBookLibrary = mongoose.model('books', booksSchema);
const myUserBooks = mongoose.model('user', userSchema)


function bookCollectionSeed() {
    const funHome = new myBookLibrary({
        name: 'The Siege',
        description: 'The Levin family battle against starvation in this novel set during the German siege of Leningrad. Anna digs tank traps and dodges patrols as she scavenges for wood, but the hand of history is hard to escape.',
        image_url: 'https://i.guim.co.uk/img/media/19e81774d363b8047502e64d172ee357973c83bc/0_0_326_499/master/326.jpg?width=120&quality=45&auto=format&fit=max&dpr=2&s=cb831a760f081fb13b67c13c2d42bf54'
    })
    const siege = new myBookLibrary({
        name: 'Outline by Rachel',
        description: 'This startling work of autofiction, which signalled a new direction for Cusk, follows an author teaching a creative writing course over one hot summer in Athens. She leads storytelling exercises. She meets other writers for dinner. She hears from other people about relationships, ambition, solitude, intimacy and “the disgust that exists indelibly between men and women”. The end result is sublime.',
        image_url: 'https://i.guim.co.uk/img/media/aa7c2ad78f185e2d373c352aaa530eec712c807a/0_0_326_499/master/326.jpg?width=120&quality=45&auto=format&fit=max&dpr=2&s=d512e953d5a554d6f17661be24012c49'
    })
    const outLine = new myBookLibrary({
        name: 'Fun Home',
        description: 'The American cartoonist’s darkly humorous memoir tells the story of how her closeted gay father killed himself a few months after she came out as a lesbian. This pioneering work, which later became a musical, helped shape the modern genre of “graphic memoir”, combining detailed and beautiful panels with remarkable emotional depth.',
        image_url: 'https://i.guim.co.uk/img/media/315bafba2bb8bef0c21944a1e4631d3cd2fdb639/0_0_191_293/master/191.jpg?width=120&quality=45&auto=format&fit=max&dpr=2&s=7f91a73505da393cdf3e0a9e53c2ba29'
    })


    outLine.save();
    funHome.save();
    siege.save();
}
//bookCollectionSeed()
function userCollectionSeed() {
    const heba = new myUserBooks({
        email: 'ha2205713@gmail.com',
        books: [
            {
                name: 'Chronicles: Volume One',
                description: 'Dylan’s reticence about his personal life is a central part of the singer-songwriter’s brand, so the gaps and omissions in this memoir come as no surprise. The result is both sharp and dreamy',
                image_url: 'https://i.guim.co.uk/img/media/eec342b926fd7028814f86dc3080e63b3c9a75fb/0_0_1500_900/master/1500.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=62b26cab157f5e615b849f385d5ca8a9'

            }
            ,
            {
                name: 'Half of a Yellow Sun',
                description: 'When Nigerian author Adichie was growing up, the Biafran war “hovered over everything”. Her sweeping, evocative novel, which won the Orange prize, charts the political and personal struggles of those caught up in the conflict and explores the brutal legacy of colonialism in Africa',
                image_url: 'https://i.guim.co.uk/img/media/03865ae1ff9028ef6f7d43591450141f87984066/0_138_2912_1747/master/2912.jpg?width=620&quality=85&auto=format&fit=max&s=a8a77e0ddf839405e16ea05002bd7246'
            }
        ]
    })
    const fatima = new myUserBooks({
        email: 'falhmood66@gmail.com',
        books: [
            {
                name: 'Light',
                description: 'One of the most underrated prose writers demonstrates the literary firepower of science fiction at its best.',
                image_url: 'https://i.guim.co.uk/img/media/94560f671d3027e1ee4449f6cb4c4cf33d63a723/0_0_323_499/master/323.jpg?width=120&quality=45&auto=format&fit=max&dpr=2&s=e822521726816f24ea93b4a7e1cc68fd'

            }
            ,
            {
                name: 'Nothing to Envy',
                description: 'Los Angeles Times journalist Barbara Demick interviewed around 100 North Korean defectors for this propulsive work of narrative non-fiction, but she focuses on just six, all from the north-eastern city of Chongjin – closed to foreigners and less media-ready than Pyongyang',
                image_url: 'https://i.guim.co.uk/img/media/01a20399ae85404d2e1c28a288c1c52e9f5781f4/0_0_191_293/master/191.jpg?width=120&quality=45&auto=format&fit=max&dpr=2&s=9b1bcc2e35c4bad233f257cc742acc8d'
            }
        ]
    })

    heba.save();
    fatima.save();
}
// userCollectionSeed()
server.get('/books', bookhandler);

function bookhandler(req, res) {
    let userEmail = req.query.email

    myUserBooks.find({ email: userEmail }, function (err, userData) {
        if (err) {
            console.log('did not work')
        } else {

            console.log(userData[0])
            console.log(userData[0].books)
            res.send(userData[0].books)
        }
    })

}


server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})