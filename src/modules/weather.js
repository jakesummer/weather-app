const API_KEY = "YR6AQ98SLD3TM2EHTPMSMTD86";

export default async function (location) {
  const data = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=${API_KEY}`,
  );

  if (!data.ok) {
    throw new Error(`Status: ${data.status}`);
  }

  const weatherJSON = await data.json();
  return weatherJSON;
}