// This is where all the configuration for the project should happen. The ideal
// arrangement would keep you out of the gulpfile entirely.

var config = {};

config.deploy = {
  bucket: 'moose.texastribune.org',
  key: 'road-from-rita',
  profile: 'newsapps'
};

config.dataFolder = './data';
config.templateFolder = './app/templates';

config.data = {
  docs: [
    {
      fileid: '1ISqFZD8MoUhUKUqpw-LTN9qXQOHp-WJo34k4obvBVKM',
      name: 'evacuation'
    },
    {
      fileid: '12t4iuXer8N9uTGAcjSexioTtz6fLb9MvGaNoZIBMIWM',
      name: 'tech'
    },
    {
      fileid: '1qIk4sRRL0048tfkDuBpuq8DAjX1cIpQTFAyWGeegtPE',
      name: 'disabled'
    },
    {
      fileid: '1SgLGdVdhPBwQWVFj6CYokVR4zWM-VLXAG-xfniXuoRY',
      name: 'fuel'
    },
    {
      fileid: '1GY2xLpVmBggdiNkYP7vGxdXvFYJQPA8ziCbL_YSchII',
      name: 'decision'
    },
    {
      fileid: '1zfj8TgG7AduOcBNGXre9xz6CfB4HuKVNzA5wwOiQnnQ',
      name: 'reentry'
    },
    {
      fileid: '1Z57LMCX_APl62UNLU4vNp2vAM2GLWj32LaYODKqWr7s',
      name: 'generation'
    },
    {
      fileid: '1Q_gNaRBb2fLy2gT2bsn8WFMJmpp-IjbIksZTAKeIwGI',
      name: 'gallery'
    }
  ],
  sheets: [
    {
      fileid: '1EACmSpajC1V7nJtwIxfA9aR-HAbTSDugSjStSSKWEaE',
      name: 'metadata',
      copytext: {
        basetype: 'objectlist'
      }
    }
  ]
};

module.exports = config;
