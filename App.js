import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, ScrollView } from 'react-native';
import { colors, CLEAR } from './src/constants';
import Keyboard from './src/components/Keyboard';

const NUMBER_OF_TRIES = 6;

const copyArray = (arr) => {
  return [...arr.map((rows) => [...rows])]
}

export default function App() {
  const word = "hello";
  const letters = word.split("");

  const [rows, setRows] = useState(
    new Array(NUMBER_OF_TRIES).fill(
      new Array(letters.length).fill("")
    ))
  const [curRow, setCurRow] = useState(0);
  const [curCol, setCurCol] = useState(0);

  const onKeyPressed = (key) => {
    const updatedRows = copyArray(rows);

    if(key === CLEAR){
      const prevCol = curCol - 1;
      if (prevCol >= 0){
        updatedRows[curRow][prevCol] = "";
        setRows(updatedRows);
        setCurCol(prevCol);
      }
      return;
    }
    if (curCol < rows[0].length){
      updatedRows[curRow][curCol] = key;
      setRows(updatedRows);
      setCurCol(curCol + 1);
    }
  }

  const isCellActive = (row, col) => {
    return row === curRow && col === curCol;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>WORDLE</Text>

      <ScrollView style={styles.map}>
        {rows.map(( row, k ) => (
        <View key={k} style={styles.row}>
          {row.map((cell, i) => (
            <View key={i} style={[styles.cell, {
              borderColor: isCellActive(k, i)
              ? colors.lightgrey
              : colors.darkgrey,
            },
            ]}>
              <Text style={styles.cellText}>
                {cell.toUpperCase()}
              </Text>
            </View>
          ))}          
        </View>
        ))}
      </ScrollView>

      <Keyboard onKeyPressed={onKeyPressed}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
  },
  title: {
    color: colors.lightgrey,
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 7,
    top: 40
  },
  map: {
    marginVertical: 60,
    alignSelf: "stretch",
    height: 100,
  },

  row: {
    alignSelf: "stretch",
    flexDirection: "row",
  },

  cell: {
    borderWidth: 3,
    borderColor: colors.darkgrey,
    flex: 1,
    aspectRatio: 1,
    margin: 3,
    justifyContent: "center",
    alignItems: "center",
    },

  cellText: {
    color: colors.lightgrey,
    fontWeight: "bold",
    fontSize: 28,
  }
});
