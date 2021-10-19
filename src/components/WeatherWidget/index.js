import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './weather-widget.scss';

const WeatherWidget = () => {
    // On crée une case dans le state qui a la valeur initiale ''
    // La variable temperature permet de lire la valeur de la case
    // la variable setTemperature permet de provoquer la mise à jour de la valeur dans la
    // valeur dans la case, et donc un nouveau rendu
    const [temperature, setTemperature] = useState('');

    // on a défini une variable d'environnement, dans des fichiers .env =>
    // valeur différente si on est en mode development ou en mode production
    // /!\ il faut relancer yarn start pour que ça soit pris en compte
    console.log('API_URL:' , process.env.REACT_APP_API_URL);

    useEffect(() => {
        // on prépare la bonne URL en fonction de l'environnement (dev ou prod)
        let url;
        // NODE_ENV : variable d'environnement définie par webpack ('production'
        // ou 'development')
        if(process.env.NODE_ENV=== 'production') {
            url = `${process.env.REACT_APP_API_URL}/weather?q=Avignon&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
        }else {
            url = process.env.REACT_APP_API_URL;
        }
        // http://localhost:1234

        axios.get('https://api.openweathermap.org/data/2.5/weather?q=Avignon&appid=d68252ec48840cf5f17846eecae2d7a0&units=metric')
        .then((response) => {
            setTemperature(response.data.main.temp.toFixed(0));
        });
    }, []);

    return (
        <article className="weather-widget">
            <div className="weather-container">
                <div className="weather-infos">
                    <h3 className="weather-city">Avignon</h3>
                    <p className="weather-zipcode">84000</p>
                </div>
                <div className="weather-temperature">
                    {temperature === '' ? '-' : `${temperature}°`}
                </div>
            </div>
        </article>
);
};

export default WeatherWidget;