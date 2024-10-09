import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [solutions, setSolutions] = useState({ x1: null, x2: null, message: '' });

  // Hàm giải phương trình bậc 2: ax^2 + bx + c = 0
  const solveQuadratic = (a, b, c) => {
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    const cNum = parseFloat(c);

    // Kiểm tra xem a, b, c có phải là số hay không
    if (isNaN(aNum) || isNaN(bNum) || isNaN(cNum)) {
      return { x1: null, x2: null, message: 'Hãy nhập đầy đủ các hệ số a, b, c là số' };
    }

    // Trường hợp phương trình không phải bậc 2: a = 0
    if (aNum === 0) {
      if (bNum === 0) {
        if (cNum === 0) {
          return { x1: null, x2: null, message: 'Phương trình vô số nghiệm' };
        } else {
          return { x1: null, x2: null, message: 'Phương trình vô nghiệm' };
        }
      } else {
        const x = -cNum / bNum;
        return { x1: x, x2: null, message: 'Phương trình bậc nhất có nghiệm' };
      }
    }

    // Tính delta
    const delta = bNum * bNum - 4 * aNum * cNum;

    // Kiểm tra điều kiện của delta để xác định loại nghiệm
    if (delta < 0) {
      return { x1: null, x2: null, message: 'Phương trình vô nghiệm thực' };
    } else if (delta === 0) {
      const x = -bNum / (2 * aNum);
      return { x1: x, x2: x, message: 'Phương trình có nghiệm kép' };
    } else {
      const x1 = (-bNum + Math.sqrt(delta)) / (2 * aNum);
      const x2 = (-bNum - Math.sqrt(delta)) / (2 * aNum);
      return { x1, x2, message: 'Phương trình có hai nghiệm phân biệt' };
    }
  };

  // Hàm xử lý khi người dùng nhấn nút "Giải phương trình"
  const handleSolve = () => {
    const result = solveQuadratic(a, b, c);
    setSolutions(result);
  };

  return (
    <View style={styles.container}>
      <Text>Nhập các hệ số của phương trình bậc 2: ax² + bx + c = 0</Text>
      <TextInput
        style={styles.input}
        placeholder="Hệ số a"
        keyboardType="numeric"
        value={a}
        onChangeText={(text) => setA(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Hệ số b"
        keyboardType="numeric"
        value={b}
        onChangeText={(text) => setB(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Hệ số c"
        keyboardType="numeric"
        value={c}
        onChangeText={(text) => setC(text)}
      />
      <Button title="Giải phương trình" onPress={handleSolve} />

      {solutions.message ? <Text>{solutions.message}</Text> : null}
      {solutions.x1 !== null && (
        <Text>Nghiệm thứ nhất: {solutions.x1}</Text>
      )}
      {solutions.x2 !== null && solutions.x2 !== solutions.x1 && (
        <Text>Nghiệm thứ hai: {solutions.x2}</Text>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 10,
  },
});
