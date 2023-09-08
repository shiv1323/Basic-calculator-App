import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
export default function App() {
  const buttons = [
    "AC",
    "DEL",
    "%",
    "/",
    7,
    8,
    9,
    "*",
    4,
    5,
    6,
    "-",
    3,
    2,
    1,
    "+",
    0,
    ".",
    "+/-",
    "=",
  ];

  const [currentNumber, setCurrentNumber] = useState("");
  const [lastNumber, setLastNumber] = useState("");

  function calculator() {
    const splitNumbers = currentNumber.split(" ");
    const fistNumber = parseFloat(splitNumbers[0]);
    const lastNumber = parseFloat(splitNumbers[2]);
    const operator = splitNumbers[1];

    switch (operator) {
      case "+":
        setCurrentNumber((fistNumber + lastNumber).toString());
        return;
      case "-":
        setCurrentNumber((fistNumber - lastNumber).toString());
        return;
      case "*":
        setCurrentNumber((fistNumber * lastNumber).toString());
        return;
      case "/":
        setCurrentNumber((fistNumber / lastNumber).toString());
        return;
      case "%":
        setCurrentNumber(fistNumber / 100);
    }
  }

  function handleInput(buttonPressed) {
    // console.log(buttonPressed)
    if (
      (buttonPressed === "+") |
      (buttonPressed === "-") |
      (buttonPressed === "*") |
      (buttonPressed === "%") |
      (buttonPressed === "/")
    ) {
      setCurrentNumber(currentNumber + " " + buttonPressed + " ");
      return;
    }
    switch (buttonPressed) {
      case "DEL":
        setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
        return;
      case "AC":
        setLastNumber("");
        setCurrentNumber("");
        return;
      case "=":
        setLastNumber(currentNumber + " = ");
        calculator();
        return;
      case "+/-":
        return;
    }

    setCurrentNumber(currentNumber + buttonPressed);
  }

  return (
    <SafeAreaView>
      <StatusBar style="auto" backgroundColor="white" />
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) =>
          button === "=" ? (
            <TouchableOpacity
              onPress={() => handleInput(button)}
              key={button}
              style={[styles.button, { backgroundColor: "#4263ec" }]}
            >
              <Text
                style={[styles.textButton, { color: "#fff", fontSize: 30 }]}
              >
                {button}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleInput(button)}
              key={button}
              style={[styles.button, { backgroundColor: "#202020" }]}
            >
              <Text
                style={[
                  styles.textButton,
                  {
                    color:
                      button === "AC" ||
                      button === "DEL" ||
                      button === "%" ||
                      button === "/" ||
                      button === "*" ||
                      button === "+" ||
                      button === "-"
                        ? "#4263ec"
                        : "#fff",
                  },
                ]}
              >
                {button}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  results: {
    backgroundColor: "#202020",
    width: "100%",
    minHeight: 280,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  resultText: {
    color: "#fff",
    margin: 10,
    fontSize: 40,
  },

  historyText: {
    color: "#fff",
    fontSize: 20,
    marginRight: 10,
    alignSelf: "flex-end",
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 90,
    minHeight: 100,
    flex: 2,
  },
  textButton: {
    fontSize: 30,
    fontWeight: 700,
  },
});
