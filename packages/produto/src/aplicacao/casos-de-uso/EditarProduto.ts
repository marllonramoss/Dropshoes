import { Produto } from "../../dominio/entidades/Produto";
import { TamanhoSapato } from "../../dominio/objetos-valor/TamanhoSapato";
import { Preco } from "../../dominio/objetos-valor/Preco";
import {
  ImagemProduto,
  validadorImagem,
} from "../../dominio/tipos/ImagemProduto";
import { ProdutoRepository } from "../../dominio/repositorios/ProdutoRepository";

// DTO para dados de edição de produto
export interface EditarProdutoDTO {
  nome?: string;
  marca?: string;
  tamanhos?: number[];
  preco?: number;
  imagens?: {
    url: string;
    descricao: string;
    principal?: boolean;
  }[];
}

export class EditarProduto {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  async executar(id: string, dados: EditarProdutoDTO): Promise<void> {
    // Buscar o produto no repositório
    const produto = await this.produtoRepository.buscarPorId(id);
    if (!produto) {
      throw new Error(`Produto com ID ${id} não encontrado`);
    }

    // Atualizar nome se fornecido
    if (dados.nome !== undefined) {
      if (!dados.nome) {
        throw new Error("Nome do produto não pode ser vazio");
      }
    }

    // Atualizar marca se fornecida
    if (dados.marca !== undefined) {
      if (!dados.marca) {
        throw new Error("Marca do produto não pode ser vazia");
      }
    }

    // Verificar se o slug resultante já existe (se nome ou marca foram alterados)
    if (dados.nome !== undefined || dados.marca !== undefined) {
      const novoNome = dados.nome || produto.nome;
      const novaMarca = dados.marca || produto.marca;

      // Gerar o novo slug com base nos valores atualizados
      const novoSlug = Produto.gerarSlugPublico(novoNome, novaMarca);

      // Verificar se já existe outro produto com este slug (exceto o próprio produto)
      const produtoExistente =
        await this.produtoRepository.buscarPorSlug(novoSlug);
      if (produtoExistente && produtoExistente.id !== id) {
        throw new Error(`Já existe um produto com o slug "${novoSlug}"`);
      }
    }

    // Atualizar tamanhos se fornecidos
    if (dados.tamanhos !== undefined) {
      if (!Array.isArray(dados.tamanhos) || dados.tamanhos.length === 0) {
        throw new Error(
          "É necessário informar pelo menos um tamanho disponível"
        );
      }

      // Validar cada tamanho
      for (const tamanho of dados.tamanhos) {
        if (typeof tamanho !== "number") {
          throw new Error("Tamanhos devem ser números");
        }

        if (!TamanhoSapato.ehValido(tamanho)) {
          throw new Error(
            `Tamanho ${tamanho} não é válido. Tamanhos válidos são: ${TamanhoSapato.obterTamanhosValidos().join(", ")}`
          );
        }
      }
    }

    // Atualizar preço se fornecido
    if (dados.preco !== undefined) {
      if (typeof dados.preco !== "number") {
        throw new Error("Preço deve ser um número");
      }

      try {
        // Validar o novo preço
        Preco.criar(dados.preco);
      } catch (error: any) {
        throw new Error(`Preço inválido: ${error.message}`);
      }
    }

    // Atualizar imagens se fornecidas
    if (dados.imagens !== undefined) {
      if (!Array.isArray(dados.imagens) || dados.imagens.length === 0) {
        throw new Error(
          "É necessário informar pelo menos uma imagem para o produto"
        );
      }

      // Verificar se há mais de uma imagem principal
      const imagensPrincipais = dados.imagens.filter((img) => img.principal);
      if (imagensPrincipais.length > 1) {
        throw new Error("Só pode haver uma imagem principal");
      }

      // Se nenhuma imagem foi marcada como principal, a primeira será
      if (imagensPrincipais.length === 0 && dados.imagens.length > 0) {
        dados.imagens[0].principal = true;
      }

      // Validar cada imagem
      for (const imagem of dados.imagens) {
        const erro = validadorImagem.validarImagem({
          url: imagem.url,
          descricao: imagem.descricao,
          principal: imagem.principal || false,
        });

        if (erro) {
          throw new Error(`Imagem inválida: ${erro}`);
        }
      }
    }

    // Aplicar as alterações no produto
    this.aplicarAlteracoes(produto, dados);

    // Salvar o produto atualizado
    await this.produtoRepository.salvar(produto);
  }

  private aplicarAlteracoes(produto: Produto, dados: EditarProdutoDTO): void {
    // Atualizar nome e marca
    if (dados.nome !== undefined || dados.marca !== undefined) {
      const novoNome = dados.nome || produto.nome;
      const novaMarca = dados.marca || produto.marca;
      produto.atualizarDadosBasicos(novoNome, novaMarca);
    }

    // Atualizar preço
    if (dados.preco !== undefined) {
      const novoPreco = Preco.criar(dados.preco);
      produto.atualizarPreco(novoPreco);
    }

    // Atualizar tamanhos
    if (dados.tamanhos !== undefined) {
      // Obter tamanhos atuais para comparação
      const tamanhosAtuais = produto.tamanhosNumericos;

      // Identificar tamanhos a serem removidos (existem atualmente mas não estão no DTO)
      const tamanhosParaRemover = tamanhosAtuais.filter(
        (t) => !dados.tamanhos!.includes(t)
      );

      // Identificar tamanhos a serem adicionados (estão no DTO mas não existem atualmente)
      const tamanhosParaAdicionar = dados.tamanhos.filter(
        (t) => !tamanhosAtuais.includes(t)
      );

      // Remover tamanhos
      for (const tamanho of tamanhosParaRemover) {
        const tamanhoObj = TamanhoSapato.criar(tamanho);
        produto.removerTamanho(tamanhoObj);
      }

      // Adicionar tamanhos
      for (const tamanho of tamanhosParaAdicionar) {
        const tamanhoObj = TamanhoSapato.criar(tamanho);
        produto.adicionarTamanho(tamanhoObj);
      }
    }

    // Atualizar imagens
    if (dados.imagens !== undefined) {
      // Substituir todas as imagens
      produto.substituirImagens(
        dados.imagens.map((img) => ({
          url: img.url,
          descricao: img.descricao,
          principal: img.principal || false,
        }))
      );
    }
  }
}
