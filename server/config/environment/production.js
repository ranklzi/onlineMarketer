'use strict';

// Production specific configuration
// =================================
module.exports = {
  postreg: {
    connectionString: 'postgres://postgres:Kizi1980!@localhost:5432/onlineMarketer'
  },
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8080,
  useCampaignCache: true
};