import { View, Text, SafeAeraView } from "react-native";
import React from "react";
import Card from './Card';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'; // pour effectué des requetes à MongoDb

import { useDispatch, useSelector } from 'react-redux';

export default function HomeScreen() {

  const [currentItemIndex, setCurrentItemIndex] = useState(0); // affiche le premier élement du tableau ( A vérifier les conditions en fonction de la loc)
  const [items, setItems] = useState([]); // set le tableau provenant de MongoDb

  useEffect(() => { // Utilisation de useEffect pour effectuer la requête lors du montage du composant HomeScreen
    axios.get('URL_de_l_API') // Faire une requête pour récupérer les données de l'API depuis MongoDB
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
      });
  }, []); 

const handleDislike = () => {   // clic sur le bouton X
    setCurrentItemIndex(currentItemIndex + 1); // affiche le prochain element du tableauu
};

const handleLike = () => {  // clic sur le bouton COEUR
    // envoie vers la page message, set le temps, +1 au store caught, 
}

  return (
    <SafeAeraView>
        <Text>homeScreen</Text>
        <Card {...items[currentItemIndex]} />
        <View>
          <FontAwesome name='xmark' onPress={handleDislike} size={25} color='#A896CF' />
          <FontAwesome name='heart' onPress={handleLike} size={25} color='#74D48F' />
        </View>

    </SafeAeraView>
  );
}
