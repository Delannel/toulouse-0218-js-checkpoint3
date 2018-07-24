import React, { Component } from 'react'
import Item from './Item'
import './PlayaList.css'
import logo from './mojito.ico'

// const items = [
//   {
//     name: 'Tongs',
//     picture: '/images/tongs.jpg'
//   },
//   {
//     name: 'Ballon de plage',
//     picture: '/images/ballon.jpg'
//   },
//   {
//     name: 'Raquettes de plage',
//     picture: '/images/raquettes.jpg'
//   },
//   {
//     name: 'Bouée grenouille',
//     picture: '/images/bouee-grenouille.jpg'
//   },
// ]

class App extends Component {
  state = {
    items: []
  }

componentDidMount () {
  fetch('/api/items',{
    method: 'GET',
  })
  .then(res => res.json())
  .then(items => {
    this.setState({ items: items })
  })
}

handleSubmit = (e) => {
  e.preventDefault()
  // const { name, picture } = this.state
  const name = this.state.name
  const picture = this.state.picture
  fetch('/api/items', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      name: name,
      picture: picture
    })
  })
  .then(res => res.json())
  .then( items => {
    console.log(items)
  })
}

handleChange = (e) => {
  const value = e.target.value
  const name = e.target.name
  this.setState({
    [name]: value
  })
}

  render() {
    return (
      <div className="PlayaList">

        <header className="PlayaList-header">
          <img src={logo} className="PlayaList-logo" alt="logo" />
          <h1 className="PlayaList-title">PlayaList</h1>
        </header>

        <div className="PlayaList-list">
        {
          this.state.items.length !== 0 &&
          this.state.items.map(item => {
            return <Item item={item} key={item} />  
          })
        }
          <form onSubmit={this.handleSubmit}>
            <h5>Ajouter un item</h5>
            <div>
              <input name="name" onChange={this.handleChange} placeholder="Nom" />
              <input name="picture" onChange={this.handleChange} placeholder="image" />
              <button type="submit">
                <span className="icon-checkmark"></span>
              </button>
            </div>
          </form>
        </div>

       

       </div>
    )
  }
}

export default App
