import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import { debounce } from 'lodash'

class PokemonPage extends React.Component {
  constructor(){
    super()
    this.state ={
      pokemons: [],
      search: ''
    }
  }

  debounceEvent(...args) {
    this.debouncedEvent = debounce(...args);
    return e => {
      e.persist();
      return this.debouncedEvent(e);
    };
  }

  render() {
    const filteredPokemon = this.state.pokemons.filter(pokemon => {
      return pokemon.name.includes(this.state.search)
    })
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={this.debounceEvent(this.handleChange, 500)} showNoResults={false} />
        <br />
        <PokemonCollection pokemon={filteredPokemon} />
        <br />
        <PokemonForm changeState={this.handleSubmit}/>
      </div>
    )
  }


  handleChange = (e) => {
    let search = e.target.value
    this.setState({
      search
    })
  }

  handleSubmit = (pokemon) => {
    
    this.setState({
      pokemons: {
        ...this.state.pokemons, pokemon
      }
    })
  }

  

  componentDidMount(){
    fetch(`http://localhost:3000/pokemon`)
    .then(res => res.json())
    .then(data => this.setState({pokemons: data}))
  }

  
  
}

export default PokemonPage
