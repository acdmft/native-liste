import { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  Image,
  StyleSheet,
} from "react-native";

export default function List() {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((res) => {
        setCountries(res);
      })
      .catch((error) => console.log(error));
  }, []);

  //   Pour éviter chargement  array vide
  return countries.length > 0 ? (
    <View style={styles.container}>
      <FlatList
        // Array sur lesquelles ma flatList va travailler_remplace le map
        data={countries}
        renderItem={(data) => (
          <>
            {/* data= tous les pays_ item = mot clef de flatlist_ */}
            <Text>{data.item.name.common}</Text>
            <Text>{data.item.capital}</Text>
            <Image style={styles.img} source={{ uri: data.item.flags.png }} />
          </>
        )}
        keyExtractor={(_data, index) => index.toString()}
        ItemSeparatorComponent={() => (
          <View style={{ borderBottomWidth: 1 }}></View>
        )}
      />
    </View>
  ) : (
    <ActivityIndicator size="large" color="blue" />
  );
}
const styles = StyleSheet.create({
  img: {
    height: 120,
    width: 200,
  },
  container: {
    marginTop: 15,
    flex: 1,
    alignItems: "center",
  },
});
