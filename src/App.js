import React, { Component } from "react";
import List from "./List";
import TheDate from "./state/TheDate";
import Counter from "./state/Counter";
import STORE from "./store";
import "./App.css";

const newRandomCard = () => {
  const id =
    Math.random().toString(36).substring(2, 4) +
    Math.random().toString(36).substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: "lorem ipsum",
  };
};

function omit(obj, keyToOmit) {
  return Object.entries(obj).reduce(
    (newObj, [key, value]) =>
      key === keyToOmit ? newObj : { ...newObj, [key]: value },
    {}
  );
}

class App extends Component {
  static defaultProps = {
    store: {
      lists: [],
      allCards: {},
    },
  };
  state = { store: STORE };
  handleDeleteItem = (item) => {
    const newlists = this.state.store.lists.map((list) => {
      return {
        id: list.id,
        header: list.header,
        cardIds: list.cardIds.filter((id) => id !== item),
      };
    });
    const newCards = omit(this.state.store.allCards, item);
    this.setState({ store: { lists: newlists, allCards: newCards } });
  };
  handleAddRandom = (item) => {
    const newCard = newRandomCard();
    const modifiedLists = this.state.store.lists.map((list) => {
      if (list.id === item) {
        return {
          id: list.id,
          header: list.header,
          cardIds: [...list.cardIds, newCard.id],
        };
      } else {
        return {
          id: list.id,
          header: list.header,
          cardIds: list.cardIds,
        };
      }
    });
    const modifiedCards = this.state.store.allCards;
    modifiedCards[newCard.id] = newCard;
    this.setState({
      store: { lists: modifiedLists, allCards: modifiedCards },
    });
  };
  render() {
    // const { store } = this.props;
    return (
      <main className="App">
        <header className="App-header">
          <h1>Trelloyes!</h1>
        </header>
        <TheDate />
        <Counter count={123} />
        <div className="App-list">
          {this.state.store.lists.map((list) => (
            <List
              key={list.id}
              id={list.id}
              header={list.header}
              cards={list.cardIds.map((id) => this.state.store.allCards[id])}
              onDeleteItem={this.handleDeleteItem}
              onClickAdd={this.handleAddRandom}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
