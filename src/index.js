import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import {shuffle, sample} from 'underscore';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
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

function reducer(state= { authors, turnData: getTurnData(authors), highlight: ''}, action){
    switch(action.type){
        case 'ANSWER_SELECTED':
            const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
            return Object.assign({}, state, {highlight: isCorrect? 'correct': 'wrong'});
        case 'CONTINUE':
            return Object.assign({}, state, {
                highlight: '', turnData: getTurnData(state.authors)
            });
        case 'ADD_AUTHOR':
            return Object.assign({}, state, {authors:state.authors.concat([action.author])
            });
        default: return state;
    }
}

let store = Redux.createStore(reducer);

ReactDOM.render(<BrowserRouter>
    <ReactRedux.Provider store={store}>
        <React.Fragment>
            <Route exact path="/" component={AuthorQuiz} />
            <Route  path = "/add"  component = {AddAuthorForm} />
        </React.Fragment>
    </ReactRedux.Provider>  
</BrowserRouter>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
 