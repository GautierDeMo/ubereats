declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      DB_PORT?: string;
      JWT_SECRET: string;
      NODE_ENV?: 'development' | 'production' | 'test';
      PORT?: string;
    }
  }
}

export {};
