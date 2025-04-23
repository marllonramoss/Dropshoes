import { DynamicModule, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

import { AppController } from './app.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import { CustomCacheInterceptor } from './shared/interceptors/custom-cache.interceptor';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ComprasModule } from './compras/compras.module';
import { ProdutosModule } from './produtos/produtos.module';

@Module({})
@Module({
  imports: [
    CacheModule.register({
      ttl: 60,
      isGlobal: true,
    }),
    PrismaModule,
    ComprasModule,
    ProdutosModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Reflector,
    {
      provide: APP_INTERCEPTOR,
      useClass: CustomCacheInterceptor,
    },
  ],
})
export class AppModule {}
