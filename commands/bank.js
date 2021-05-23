const axios = require('axios').default;

exports.run = (client, message, args) => {
  const headers = {
    Authorization: `Bearer ${client.config.apiKey}`,
    'Content-Type': 'application/json'
  };
  const apiClient = axios.create({ baseURL: client.config.apiUrl, headers });

  const getLink = () => {
    apiClient.get('/temp-link').then((response) => {
      message.channel.send("Here's a link to view the guild bank. It's valid for the next 30 minutes:\n" + response.data.url)
        .then(mgs => mgs.delete({ timeout: 10000 }))
        .catch(console.error);
    });
  };

  switch (args[0]) {
    case 'link':
      getLink();
      break;

    case 'donate':
      message.channel.send('To donate to the guild bank, send in-game mail mail to KctBank.');
  }
};
