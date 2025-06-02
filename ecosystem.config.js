module.exports = {
  apps: [
    {
      name: 'myownworldproject-backend',
      cwd: './backend',
      script: 'npm',
      args: 'run dev',
      env: {
        NODE_ENV: 'development',
        PORT: 4001,
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
    {
      name: 'myownworldproject-frontend',
      cwd: './webapp',
      script: 'npm',
      args: 'run dev:host',
      env: {
        NODE_ENV: 'development',
        PORT: 4002,
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
  ],
}
