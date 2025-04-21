import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Query,
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
} from '@dropshoes/produto';

@Controller('produtos')
export class ProdutosController {
  constructor(
    private readonly adicionarProduto: AdicionarProduto,
    private readonly listarProdutos: ListarProdutos,
    private readonly buscarProdutoPorId: BuscarProdutoPorId,
    private readonly editarProduto: EditarProduto,
    private readonly removerProduto: RemoverProduto,
    private readonly listarProdutosPorColecao: ListarProdutosPorColecao,
    private readonly listarProdutosPaginado: ListarProdutosPaginado,
    private readonly listarProdutosPorColecaoSlug: ListarProdutosPorColecaoSlug,
  ) {}

  @Post()
  async criar(@Body() dto: AdicionarProdutoDTO) {
    return await this.adicionarProduto.executar(dto);
  }

  @Get()
  async listar(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 12,
    @Query('colecaoId') colecaoId?: string,
    @Query('colecaoSlug') colecaoSlug?: string,
    @Query('marca') marca?: string | string[],
  ) {
    if (colecaoSlug) {
      return await this.listarProdutosPorColecaoSlug.executar(colecaoSlug, Number(page), Number(pageSize));
    }
    if (colecaoId) {
      return await this.listarProdutosPorColecao.executar(colecaoId);
    }
    // Normaliza sempre para array
    const marcasArray = marca
      ? Array.isArray(marca)
        ? marca
        : [marca]
      : [];
    // Agora passando o filtro de marcas para o use case
    return await this.listarProdutosPaginado.executar(
      Number(page),
      Number(pageSize),
      marcasArray.length > 0 ? marcasArray : undefined
    );
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
