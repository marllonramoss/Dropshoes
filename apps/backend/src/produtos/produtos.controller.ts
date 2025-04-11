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
} from '@nestjs/common';
import {
  AdicionarProduto,
  ListarProdutos,
  BuscarProdutoPorId,
  EditarProduto,
  RemoverProduto,
  AdicionarProdutoDTO,
  EditarProdutoDTO,
} from '@dropshoes/produto';

@Controller('produtos')
export class ProdutosController {
  constructor(
    private readonly adicionarProduto: AdicionarProduto,
    private readonly listarProdutos: ListarProdutos,
    private readonly buscarProdutoPorId: BuscarProdutoPorId,
    private readonly editarProduto: EditarProduto,
    private readonly removerProduto: RemoverProduto,
  ) {}

  @Post()
  async criar(@Body() dto: AdicionarProdutoDTO) {
    return await this.adicionarProduto.executar(dto);
  }

  @Get()
  async listar() {
    return await this.listarProdutos.executar();
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
