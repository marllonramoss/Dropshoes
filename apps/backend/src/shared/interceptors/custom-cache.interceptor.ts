import {
  Injectable,
  ExecutionContext,
  CallHandler,
  NestInterceptor,
  Inject,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';

const CUSTOM_CACHE_TTL = 'custom_cache_ttl';

// TTL NAO ESTA FUNCIONANDO, PARECE QUE ESTA INFINITO
export function CustomCacheTTL(ttl: number): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    Reflect.defineMetadata(CUSTOM_CACHE_TTL, ttl, descriptor.value!);
    return descriptor;
  };
}

@Injectable()
export class CustomCacheInterceptor implements NestInterceptor {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: any,
    private readonly reflector: Reflector,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const key = this.trackBy(context, req);
    const handler = context.getHandler();
    const ttl = this.reflector.get<number>(CUSTOM_CACHE_TTL, handler) ?? 60;

    if (!key) {
      // Não cacheia se não conseguir gerar chave
      return next.handle();
    }

    const cached = await this.cacheManager.get(key);
    if (cached !== undefined && cached !== null) {
      return of(cached);
    }

    return next.handle().pipe(
      tap(async (response) => {
        await this.cacheManager.set(key, response, { ttl: Number(ttl) });
      }),
    );
  }

  private trackBy(context: ExecutionContext, req: any): string | undefined {
    // Gera chave baseada na rota e query/body
    const handler = context.getHandler();
    const className = context.getClass().name;
    const methodName = handler.name;
    const url = req.originalUrl || req.url;
    const body = req.body ? JSON.stringify(req.body) : '';
    const key = `custom-cache:${className}:${methodName}:${url}:${body}`;
    return key;
  }
}
