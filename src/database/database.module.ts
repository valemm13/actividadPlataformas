import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const dbType = configService.get<string>('DB_TYPE') || 'sqlite';

        const baseConfig = {
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: configService.get<string>('DB_SYNCHRONIZE') === 'true',
          logging: configService.get<string>('DB_LOGGING') === 'true',
        };

        // Para SQLite solo necesitamos el archivo de base de datos
        if (dbType === 'sqlite') {
          return {
            type: 'sqlite',
            database:
              configService.get<string>('DB_DATABASE') || './fitness.db',
            ...baseConfig,
          };
        } else {
          // Para otras BD (PostgreSQL, MySQL, MariaDB) necesitamos conexión de red
          return {
            type: dbType as 'postgres' | 'mysql' | 'mariadb',
            host: configService.get<string>('DB_HOST') || 'localhost',
            port: parseInt(configService.get<string>('DB_PORT') as string),
            username: configService.get<string>('DB_USERNAME'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_DATABASE'),
            ...baseConfig,
          } as TypeOrmModuleOptions;
        }
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
