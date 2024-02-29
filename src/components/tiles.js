import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Container } from 'semantic-ui-react'

import { TileCard } from 'formula_one'

import '../css/tiles.css'

class Tiles extends React.PureComponent {
  getTileCards = () => {
    const { tiles } = this.props
    return tiles.map((tile, index) => {
      return (
        <TileCard
          key={index}
          name={tile.name}
          desc={tile.desc}
          iconName={tile.iconName}
          imageUrl={tile.imageUrl}
          as={Link}
          to={tile.link}
          {...tile}
        />
      )
    })
  }

  render() {
    return (
      <Container styleName='tile-container'>
        <Card.Group itemsPerRow={3} stackable doubling>
          {this.getTileCards()}
        </Card.Group>
      </Container>
    )
  }
}

export default Tiles
