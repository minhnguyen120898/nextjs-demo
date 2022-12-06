const firebase = require('firebase-admin');
const _ = require('lodash');

const pushMessage = (registrationTokens, data) => {
  const payload = data;
  const options = {
    priority: 'high'
  };
  console.log(getPayload(1, data))
  firebase.messaging().sendToDevice(registrationTokens, getPayload(1, data), options)
    .then(() => {
      console.log('Notification', payload);
    }).catch(error => {
      console.log('Fail send notification', error)
    })
}

const getPayload = (type, data) => {
  let key=Object.keys(data.data);
  for(let i=0;i<key.length;i++){
    data.data[key[i]]=data.data[key[i]]+"";
  }
  const payload = {
    notification: {
      title: data.title || '',
      body: data.body || ''
    },
    data: data.data
  }
  return payload
}

module.exports = {
  pushMessage
}
