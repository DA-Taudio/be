module.exports = {
  apps: [
    {
      name: 'shop-gateway',
      script: 'dist/apps/gateway/main.js',
    },
    {
      name: 'mailer-service',
      script: 'dist/apps/mailer-service/main.js',
    },
    {
      name: 'media-service',
      script: 'dist/apps/media-service/main.js',
    },
    {
      name: 'message-service',
      script: 'dist/apps/message-service/main.js',
    },
    {
      name: 'notification-service',
      script: 'dist/apps/notification-service/main.js',
    },
    {
      name: 'product-service',
      script: 'dist/apps/product-service/main.js',
    },
    {
      name: 'sms-service',
      script: 'dist/apps/sms-service/main.js',
    },
    {
      name: 'users-service',
      script: 'dist/apps/users-service/main.js',
    },
  ],
};
