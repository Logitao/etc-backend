import Redis from 'ioredis'

export const redis = new Redis('redis://cache:6379')
