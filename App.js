import React, {useState} from 'react';

import {
  Alert,
  Button,
  FlatList,
  Image,
  ImageBackground,
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';



const DATA = [
  {
    id: 'a',
    title: 'Plant in Pot',
    name: '$350',
    uri: 'data:image/jpeg;base64,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',
  },
  {
    id: 'b2',
    title: 'x-Small Plant',
    name: '$250',
    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7LtAZUl9LLiTn0FfwMjr-ERtPXzvDMGOQHA&usqp=CAU',
  },
  {
    id: 'b',
    title: 'Small Plant',
    name: '$250',
    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7LtAZUl9LLiTn0FfwMjr-ERtPXzvDMGOQHA&usqp=CAU',
  },
  {
    id: 'c',
    title: 'Long Leaves Plant',
    name: '$155',
    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8bMkhkpfgr3gRgUfry3l2sNigHXMO_QydYA&usqp=CAU',
  },
  {
    id: 'd',
    title: 'Special red Plant',
    name: '$345',
    uri: 'https://specials-images.forbesimg.com/imageserve/60e894f93b51892e901b4a15/Best-Places-to-Buy-Plants-Online--Amazon/960x0.jpg?cropX1=0&cropX2=500&cropY1=0&cropY2=500',
  },
  {
    id: 'e',
    title: 'Money Plant',
    name: '$345',
    uri: 'https://secure.img1-fg.wfcdn.com/im/21315748/resize-h416-w416%5Ecompr-r85/1923/192304253/Sale+Cat+Palm+in+D%C3%A9cor+Planter.jpg',
  },
  {
    id: 'f',
    title: 'Coleus Plant',
    name: '$110',
    uri: 'https://plnts-api.ams3.digitaloceanspaces.com/main/6eabf5652d4f1bcf7ae405d476aecc00.jpg',
  },
  {
    id: 'g',
    title: 'Plant For Sale',
    name: '$140',
    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS4xguSpkoMxUhS2TqqRbqv5Wdfgmw_hEHvDcliv3ZeID2epIli5sVAW04IOmA9FC9aMU&usqp=CAU',
  },
  {
    id: 'h',
    title: ' Cigar Flower',
    name: '$180',
    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN6HTib4jOk-sIEZ9eSAuMAwVE3zDbf0Z7e2JGvNue5Rbcl8xFWgwrv8Ou0OYfDzNQGUY&usqp=CAU',
  },
  {
    id: 'i',
    title: 'Happy Plant',
    name: '$34',
    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxHIwPvYFnd8H9PtuOwGV08Cs6FOjAopbAQkUtzzB3EHkmkcrcZ5YQzRUaJuh47Gfizy0&usqp=CAU',
  },
  {
    id: 'j',
    title: 'Luck Plant',
    name: '$345',
    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxHIwPvYFnd8H9PtuOwGV08Cs6FOjAopbAQkUtzzB3EHkmkcrcZ5YQzRUaJuh47Gfizy0&usqp=CAU',
  },
];



const App = () => {
  const [qurey , setQurey]= useState(DATA);

  const seasrchData = (text)=>{

    let data = DATA    ;
      let searchElement = data.filter((item)=>{
    
    return item.title.toLowerCase().includes(text.toLowerCase());
    
    
      });
    
      setQurey(searchElement)
    
    
    
    }
  const   renderItem = ({item}) => (
    <View>
      <ImageBackground source={{uri: item.uri}} style={styles.BG}>
        <View style={styles.card}>
          <Text style={styles.cardText}>{item.title}</Text>
          <Text style={styles.cardPrice}>{item.name}</Text>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                'Want to Purchase it.. ??',
                item.title + ' for ' + item.name,
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
              )
            }>
            <Image
              source={{
                uri: 'https://www.clipartmax.com/png/small/259-2594219_travel-bag-of-vertical-black-design-vector-travel-bag-png-white-icon.png',
              }}
              style={styles.buyBtn}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );

  const msg1 = 'Welcome';
  const msg2 = 'Chris Allow';
  return (
    <SafeAreaView style={styles.change}>
      <View>
        <View style={styles.topView}>
          <Text style={styles.welcomeText}>{msg1}</Text>
          <TouchableOpacity onPress={() => Alert.alert('fire')}>
            <ImageBackground
              source={{
                uri: 'https://www.clipartmax.com/png/middle/26-260450_fire-emoji-png.png',
              }}
              style={styles.fire}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('Bell Icon Pressed')}>
            <ImageBackground
              source={{
                uri: 'https://www.clipartmax.com/png/small/52-526165_alarm-clock-icon-comments-bell-icon.png',
              }}
              style={styles.bell}
            />
          </TouchableOpacity>
        </View>

        <View style={{marginLeft: 10}}>
          <Text style={styles.topName}>{msg2}</Text>
        </View>

        <View style={styles.searchIconView}>
          <TouchableOpacity onPress={() => Alert.alert('Search Icon Pressed')}>
            <ImageBackground
              source={{
                uri: 'https://static.thenounproject.com/png/9873-200.png',
              }}
              style={styles.searchIcon}
            />
          </TouchableOpacity>

          <TextInput style={styles.searchBar} placeholder="Search" 
    
        
          

           onChangeText={(text)=> {seasrchData(text)
          
          
          }}
          
          
          />
          <TouchableOpacity onPress={() => Alert.alert('Filter Icon Pressed')}>
            <ImageBackground
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOLnaQzz2KlvXpHg7bv9uW6DoONrWTdTyKsA&usqp=CAU',
              }}
              style={styles.filterIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={qurey}
        renderItem={renderItem}
        // keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  filterIcon: {
    height: 30,
    width: 30,
    marginTop: 5,
    marginLeft: 10,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: 'red',

    padding: 20,
    marginVertical: 15,
    marginHorizontal: 16,
    height: 300,
    width: 200,
    marginTop: 250,
    borderRadius: 20,
  },
  searchBar: {
    backgroundColor: 'white',
    width: 250,
    marginLeft: 5,
  },
  title: {
    fontSize: 20,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F0E3',
  },
  change: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  BG: {
    padding: 20,
    marginVertical: 15,
    marginHorizontal: 16,
    height: 400,
    width: 300,
    marginTop: 30,
    borderRadius: 30,
    overflow: 'hidden',
  },
  card: {
    marginTop: 290,
    backgroundColor: 'white',
    borderRadius: 20,
    height: 80,
    backgroundColor: '#F8F0E3',
  },
  cardText: {
    color: 'black',
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardPrice: {
    color: 'black',
    marginTop: 10,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchIconView: {
    flexDirection: 'row',
    marginTop: 15,
  },
  buyBtn: {
    height: 30,
    width: 30,
    marginLeft: 220,
    marginTop: -40,
  },
  topView: {
    flexDirection: 'row',
    marginLeft: 10,
  },

  welcomeText: {
    fontSize: 20,
    marginTop: 10,
  },
  fire: {
    height: 30,
    width: 30,
    marginTop: 10,
  },
  bell: {
    height: 20,
    width: 20,
    marginLeft: 190,
    marginTop: 20,
  },
  topName: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  searchIcon: {
    height: 20,
    width: 20,
    marginTop: 12,
    marginLeft: 20,
  },
});

export default App;
