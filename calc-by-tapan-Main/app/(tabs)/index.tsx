import React, { useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity,} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const Calculator = () => {
  const [expression, setExpression] = useState("");

  const handleButtonClick = (value: string) => {
    setExpression((prevExpression) => prevExpression + value);
  };

  const calculateResult = () => {
    try {
      setExpression(eval(expression).toString());
    } catch (error) {
      setExpression("Error");
    }
  };

  const clearExpression = () => {
    setExpression("");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.calculatorContainer}>
        {/* Calculator Display */}
        <View style={styles.display}>
          <Text style={styles.displayText}>
            {expression || "0"}
          </Text>
        </View>

        {/* Calculator Buttons */}
        <View style={styles.buttonGrid}>
          {/* Top Row */}
          <View style={styles.row}>
            <TouchableOpacity style={[styles.button, styles.grayButton]} onPress={clearExpression}>
              <Text style={styles.buttonText}>AC</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.grayButton]} onPress={() => handleButtonClick("%")}>
              <Text style={styles.buttonText}>%</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.grayButton]} onPress={() => handleButtonClick("+")}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.orangeButton]} onPress={() => {
              setExpression((prev) => prev.slice(0, -1));
            }}>
              <Text style={styles.buttonText}>⌫</Text>
            </TouchableOpacity>
          </View>

          {/* Number Pad */}
          {[
            [7, 8, 9],
            [4, 5, 6],
            [1, 2, 3],
            [0, '.', '=']
          ].map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((num) => (
                <TouchableOpacity
                  key={num}
                  style={[
                    styles.button,
                    num === '=' ? styles.greenButton : styles.darkGrayButton
                  ]}
                  onPress={() => num === '=' ? calculateResult() : handleButtonClick(num.toString())}
                >
                  <Text style={styles.buttonText}>{num}</Text>
                </TouchableOpacity>
              ))}
              {(
                <TouchableOpacity
                  style={[styles.button, styles.orangeButton]}
                  onPress={() => handleButtonClick(rowIndex === 0 ? '-' : rowIndex === 1 ? '+': rowIndex ===2? '×':"")}
                >
                  <Text style={styles.buttonText}>
                    {rowIndex === 0 ? '-' : rowIndex === 1 ? '+' :rowIndex ===2? '×' :"↺"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </View>
      <Text style={styles.footerText}>Calc by tapan</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 24,
  },
  calculatorContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  display: {
    padding: 20,
    marginBottom: 20,
  },
  displayText: {
    color: 'white',
    fontSize: 64,
    textAlign: 'right',
    fontWeight: '300',
  },
  buttonGrid: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  button: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
  },
  grayButton: {
    backgroundColor: '#666666',
  },
  greenButton: {
    backgroundColor: '#00FF00',
  },
  darkGrayButton: {
    backgroundColor: '#333333',
  },
  orangeButton: {
    backgroundColor: '#FF9F0A',
  },
  footerText: {
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
  },
});

export default Calculator;
