import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
} from 'react-native'; 


// sample api http://droidtute.com/reactexample/sample_api/getMovieList.php

const { width, height } = Dimensions.get('window');

const equalWidth =  (width / 2 ) 

export default class App extends Component {


  constructor(props) {
    super(props)
    this.state = {
      moviesList: []
    }
  }

  _keyExtractor = (item, index) => item.id;

  renderRowItem = (itemData) => {
    return (
      <View>
        <Image style={{ height: 150,  width : equalWidth}} source={{ uri: itemData.item.imageUrl }} resizeMode='cover' />
      </View>
    )
  }

  componentWillMount() {
    {this.getMoviesFromApiAsync()}
  }


  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.moviesList}
          numColumns={2}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderRowItem}
        />
      </View>
    );
  }


  getMoviesFromApiAsync = () => {
    return fetch('http://droidtute.com/reactexample/sample_api/getMovieList.php')
      .then((response) => response.json())
      .then((responseJson) => {
       // alert(JSON.stringify(responseJson))
        this.setState({ moviesList: responseJson.movieList }) // this will update state to re-render ui
        return responseJson.movieList;
      })
      .catch((error) => {
        console.error(error);
      });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    flexDirection: 'column'
  }
});
 
