import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';
import {BrowserRouter, Route} from 'react-router-dom';
import AddAuthorForm from './AddAuthorForm';

const authors = [
    {
        name: 'Mark Twain',
        imageUrl: 'images/authors/marktwain2.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The Adventures of Huckleberry Finn', 'Life on the Mississippi', 'Roughing It']
    },
    {
        name: 'Joseph Conrad',
        imageUrl: 'images/authors/josephconrad.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['Heart of Darkness']
    },
    {
        name: 'Stephen King',
        imageUrl: 'images/authors/stephenking.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The Shining', 'It']
    },
    {
        name: 'Charles Dickens',
        imageUrl: 'images/authors/charlesdickens.png',
        imageSource: 'Wikimedia Commons',
        books: ['David Copperfield', 'A Tale of Two Cities']
    },
    {
        name: 'William Shakespeare',
        imageUrl: 'images/authors/williamshakespeare.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['Hamlet', 'Macbeth', 'Romeo and Juliete']
    },
    {
        name: 'Jane Austin',
        imageUrl: 'images/authors/janeaustin.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['Sense and Sensibility', 'Emma', 'Mansfield Park']
    }
];

function getTurnData(authors){
    const allBooks = authors.reduce(function(p,c,i){
        return p.concat(c.books);
    }, []);
    const fourRandomBooks = shuffle(allBooks).slice(0,4);
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author) => 
            author.books.some((title) =>
             title === answer))
    }


}

const state={
    turnData:  getTurnData(authors),
    highlight: ''
}

function onAnswerSelected(answer){
    const isCorrect = state.turnData.author.books.some((book) => book === answer);
    state.highlight = isCorrect? 'correct': 'wrong';
    render();
}


function App(){
    return <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} />
}

function AddAuthorWrapper(){
    return <AddAuthorForm onAddAuthor={console.log}></AddAuthorForm>
}

function render(){
    ReactDOM.render(<BrowserRouter>
    <React.Fragment>
        <Route exact path="/" component={App} />
        <Route  path = "/add"  component = {AddAuthorWrapper} />
    </React.Fragment>
    
    </BrowserRouter>, document.getElementById('root'));
}

render();



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
 