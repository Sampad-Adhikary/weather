console.log(data);
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp;
        console.log(temp);
        const maxTemp = weatherData.main.temp_max;
        console.log(maxTemp);