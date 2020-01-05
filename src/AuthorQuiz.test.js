import React from 'react';
import AuthorQuiz from './AuthorQuiz';
import ReactDom from 'react-dom';
import Enzyme, {mount, sallow, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter() });

const state = {
  turnData: {
    books: ['The Shining', 'It', 'David Copperfield', 'A Tale of Two Cities', 'Hamlet', 'Emma'],
    author:{
      name: 'Charles Dickens',
      imageUrl: 'images/authors/charlesdickens.jpg',
      imageSource: 'Wikimedia Commons',
      books: ['David Copperfield', 'A Tale of Two Cities']
    },
  },
  highlight: 'none'
}

describe("author quiz", () => {
  it("renders without crashing" , () => {
    const div = document.createElement("div");
    ReactDom.render(<AuthorQuiz {...state} onAnswerSelected={() => {}}/>, div);
  })

  describe("When no answer has been selected", () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={() => {}}/>);
    });
    
    it("should have no background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('');
    });

  });

  describe("When the wrong answer has been selected", () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...(Object.assign({}, state, {highlight: 'wrong'}))} onAnswerSelected={() => {}}/>);
    });
    
    it("should have a red background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('red');
    });

  });

  describe("When the correct answer has been selected", () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...(Object.assign({}, state, {highlight: 'correct'}))} onAnswerSelected={() => {}}/>);
    });
    
    it("should have a red background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('green');
    });

  });

  describe("When the first answer is selected", () =>{
    let wrapper;
    const handleAnswerSelected = jest.fn();

    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={handleAnswerSelected} />);
       wrapper.find('.answer').first().simulate('click');
    });

    it("on AnswerSelected should be called", () => {
      expect(handleAnswerSelected).toHaveBeenCalled();
    });

    it("selected answer should be The Shining", () =>{
      expect(handleAnswerSelected).toHaveBeenCalledWith("The Shining");
     });
  })
});