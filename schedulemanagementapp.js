const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const activities = ["Read", "Play game", "Eat", "Skiing"];

//Fetch weather API
async function fetchWeatherData() {ls 
    try {

        const fetch = await import('node-fetch');

        const api_key = "463c641981964977b9a213715232906";
        const response = await fetch.default('https://api.weatherapi.com/v1/forecast.json?key=' + api_key + '&q=New%20York&days=1');
        const data = await response.json();
        console.log(data);
        //return data;
    } catch (error) {
        console.log('Error fetching weather data:', error);
    }
}

//main function
async function generateSchedule() {
    const schedule = [];

    for (let i = 0; i < days.length; i++) {
        const day = days[i];
        const daySchedule = {
            day: day,
            activities: [],
        };

        let startTime = 9;
        let endTime = 17;

        while (startTime < endTime) {
            const randomMinimumTime = Math.floor(Math.random(0.5, 1) * 3);

            if (randomMinimumTime) {
                const randomActivity = activities[Math.floor(Math.random() * activities.length)];
                const duration = Math.min(randomMinimumTime, endTime - startTime);
                const weather = await fetchWeatherData();;

                if (startTime < 12 && (startTime + duration) < 12) {
                    daySchedule.activities.push({
                        activity: randomActivity,
                        time: `${startTime}am - ${startTime + duration}am`,
                        weather: weather.current.condition.text,
                    });
                }
                else if (startTime < 12 && (startTime + duration) >= 12) {
                    daySchedule.activities.push({
                        activity: randomActivity,
                        time: `${startTime}am - ${startTime + duration}pm`,
                        weather: weather.current.condition.text,
                    });
                }
                else {
                    daySchedule.activities.push({
                        activity: randomActivity,
                        time: `${startTime}pm - ${startTime + duration}pm`,
                        weather: weather.current.condition.text,
                    });
                }

                startTime += duration;
            }
        }

        schedule.push(daySchedule);
    }

    //return schedule;
}


generateSchedule().then(schedule => {
    console.log(JSON.stringify(schedule));
})
    .catch(error => {
        console.log('Error generating schedule:', error);
    });
