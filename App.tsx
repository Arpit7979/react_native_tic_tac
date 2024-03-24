import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Snackbar from 'react-native-snackbar'
import Icons from './conponents/Icons';

export default function App() {

  const [isCross,setIsCross] = useState(false);
  const [gameWinner,setGameWinner] = useState("");
  const [gameState,setGameState] = useState( new Array(9).fill("empty",0,9))

  const reloadGame = () =>{
    setIsCross(false)
    setGameWinner("")
    setGameState(new Array(9).fill("empty",0,9))
  }

  const checkIsWinner = () =>{
    if(gameState[0]!=="empty"&& gameState[0]===gameState[1]  && gameState[1]===gameState[2]){
      setGameWinner(`Player ${gameState[0]} won`)
    }
    else if(gameState[3]!=="empty"&& gameState[3]===gameState[4]  && gameState[4]===gameState[5]){
      setGameWinner(`Player ${gameState[3]} won`)
    }
    else if(gameState[6]!=="empty"&& gameState[6]===gameState[7]  && gameState[7]===gameState[8]){
      setGameWinner(`Player ${gameState[6]} won`)
    }
    else if(gameState[0]!=="empty"&& gameState[0]===gameState[3]  && gameState[3]===gameState[6]){
      setGameWinner(`Player ${gameState[0]} won`)
    }
    else if(gameState[1]!=="empty"&& gameState[1]===gameState[4]  && gameState[4]===gameState[7]){
      setGameWinner(`Player ${gameState[1]} won`)
    }
    else if(gameState[2]!=="empty"&& gameState[2]===gameState[5]  && gameState[5]===gameState[8]){
      setGameWinner(`Player ${gameState[2]} won`)
    }
    else if(gameState[0]!=="empty"&& gameState[0]===gameState[4]  && gameState[4]===gameState[8]){
      setGameWinner(`Player ${gameState[0]} won`)
    }
    else if(gameState[2]!=="empty"&& gameState[2]===gameState[4]  && gameState[4]===gameState[6]){
      setGameWinner(`Player ${gameState[2]} won`)
    }
    else if(!gameState.includes("empty",0)){
      setGameWinner(`Draw Game`)
    }
  }

  const onChangeItem = (itemNumber:number) => {
   if(gameWinner){
    Snackbar.show({
      text:gameWinner
    })
   }

   if(gameState[itemNumber]==="empty"){
    gameState[itemNumber] = isCross ? "cross" : "circle"
    setIsCross(!isCross)
   }else{
    Snackbar.show({
      text:"position is already filled"
    })
   }

   checkIsWinner();
  }



  return (
    <SafeAreaView>
      {
        gameWinner?(
          <View style={styles.topBox}>
            <Text style={styles.topBoxText}>{gameWinner}</Text>
          </View>
        ):(
          <View style={styles.topBox}>
            <Text style={styles.topBoxText}>{`Player ${isCross?"X":"O"} turn`}</Text>
          </View>
        )
      }
      <FlatList 
      style={styles.midBox}
      numColumns={3}
      data={gameState}
      renderItem={({item,index})=>(
          <Pressable
          style={styles.singleBox}
          key={index}
          onPress={()=>onChangeItem(index)}
          >
          <Icons name={item}/>
          </Pressable>
      )}
      />

      <Pressable
      onPress={reloadGame}
      style={styles.bottomBox}
      >
        <Text style={styles.bottomText}>
          {gameWinner?"start new game":"reload the game"}
        </Text>
     
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  topBox:{
   margin:10,
   padding:10,
   backgroundColor:"red",

  },
  topBoxText:{
   fontSize:20,
   color:"#ffffff"
  },
  midBox:{
   margin:10,
   marginLeft:30,
  },
  singleBox:{
   width:100,
   height:100,
   gap:10,
   borderWidth:3,
   borderColor:"#987ddd",
   alignItems:"center",
   justifyContent:"center"
  },
  bottomBox:{
    margin:10,
    padding:10,
    backgroundColor:"green",
    borderRadius:5,
    marginTop:55,
  },
  bottomText:{
    fontSize:20,
   color:"#ffffff"
  },
})