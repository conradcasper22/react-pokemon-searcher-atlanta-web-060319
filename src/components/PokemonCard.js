import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  constructor(){
    super()
    this.state ={
      hasBeenClicked: false
    }
  }



  render() {
    const {height, weight, id, name, abilities, moves, stats, types, sprites} = this.props.pokemon
    return (
      <Card>
        <div>
          <div className="image" onClick={this.handleImageClick}>
            <img src={this.state.hasBeenClicked ? sprites.back : sprites.front} alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">{name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.getHpFromStats(stats)}
            </span>
          </div>
        </div>
      </Card>
    )
  }


  handleImageClick = (e) => {
    this.setState({
      hasBeenClicked: !this.state.hasBeenClicked
    })
  }

  getHpFromStats = (stats) => {
     return stats.map(stat => {
      if(stat.name === 'hp'){
        return stat.value
      }
    })
  }



}

export default PokemonCard
