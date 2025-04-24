import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import {
  AdicionarProduto,
  ListarProdutos,
  BuscarProdutoPorId,
  EditarProduto,
  RemoverProduto,
  AdicionarProdutoDTO,
  EditarProdutoDTO,
  ListarProdutosPorColecao,
  ListarProdutosPaginado,
  ListarProdutosPorColecaoSlug,
  BuscarProdutosPorTermoUseCase,
} from '@dropshoes/produto';

import { CustomCacheTTL } from '../shared/interceptors/custom-cache.interceptor';

@Controller('produtos')
export class ProdutosController {
  constructor(
    @Inject('CACHE_MANAGER') private cacheManager: any,
    private readonly adicionarProduto: AdicionarProduto,
    private readonly listarProdutos: ListarProdutos,
    private readonly buscarProdutoPorId: BuscarProdutoPorId,
    private readonly editarProduto: EditarProduto,
    private readonly removerProduto: RemoverProduto,
    private readonly listarProdutosPorColecao: ListarProdutosPorColecao,
    private readonly listarProdutosPaginado: ListarProdutosPaginado,
    private readonly listarProdutosPorColecaoSlug: ListarProdutosPorColecaoSlug,
    private readonly buscarProdutosPorTermo: BuscarProdutosPorTermoUseCase,
  ) {}

  @Post()
  async criar(@Body() dto: AdicionarProdutoDTO) {
    return await this.adicionarProduto.executar(dto);
  }

  @Get('cache-teste-fixo')
  async cacheTesteFixo() {
    console.log('[DEBUG] Executou cacheTesteFixo');
    return { agora: Date.now() };
  }

  @Get('cache-test')
  async cacheTest() {
    const key = 'nestjs-cache-test-123';
    await this.cacheManager.set(key, 'valor do redis', 60);
    const value = await this.cacheManager.get(key);
    return { cached: value };
  }

  @Get('cache-teste-manual')
  async cacheTesteManual() {
    const key = 'manual-cache';
    const cached = await this.cacheManager.get(key);
    if (cached) {
      console.log('[DEBUG] HIT manual-cache');
      return { cached, manual: true };
    }
    const now = Date.now();
    await this.cacheManager.set(key, now, { ttl: 60 });
    console.log('[DEBUG] MISS manual-cache');
    return { set: true, agora: now };
  }

  @Get()
  @CustomCacheTTL(1) // cacheia a listagem por 120 segundos - NAO ESTA FUNCIONANDO, PARECE QUE ESTA INFINITO
  async listar(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 12,
    @Query('colecaoId') colecaoId?: string,
    @Query('colecaoSlug') colecaoSlug?: string,
    @Query('marca') marca?: string | string[],
    @Query('precoMax') precoMax?: string,
  ) {
    if (colecaoSlug) {
      console.log('[DEBUG] Executou listarProdutosPorColecaoSlug');
      return await this.listarProdutosPorColecaoSlug.executar(
        colecaoSlug,
        Number(page),
        Number(pageSize),
      );
    }
    if (colecaoId) {
      console.log('[DEBUG] Executou listarProdutosPorColecao');
      return await this.listarProdutosPorColecao.executar(colecaoId);
    }
    // Normaliza sempre para array
    const marcasArray = marca ? (Array.isArray(marca) ? marca : [marca]) : [];
    console.log('[DEBUG] Executou listarProdutosPaginado');
    // Agora passando o filtro de marcas para o use case
    return await this.listarProdutosPaginado.executar(
      Number(page),
      Number(pageSize),
      marcasArray.length > 0 ? marcasArray : undefined,
      precoMax ? Number(precoMax) : undefined,
    );
  }

  @Get('search')
  async search(@Query('query') query: string) {
    return await this.buscarProdutosPorTermo.executar(query);
  }

  @Get(':id')
  async buscar(@Param('id') id: string) {
    const produto = await this.buscarProdutoPorId.executar(id);

    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }

    return produto;
  }

  @Put(':id')
  async editar(@Param('id') id: string, @Body() dto: EditarProdutoDTO) {
    return await this.editarProduto.executar(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remover(@Param('id') id: string): Promise<void> {
    await this.removerProduto.executar(id);
  }
}
