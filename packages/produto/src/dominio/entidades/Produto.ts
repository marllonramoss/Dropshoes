import { Evento } from "../eventos/Evento";
import { ProdutoCriado } from "../eventos/ProdutoCriado";
import { PrecoAtualizado } from "../eventos/PrecoAtualizado";
import { TamanhoAdicionado } from "../eventos/TamanhoAdicionado";
import { TamanhoRemovido } from "../eventos/TamanhoRemovido";
import { ImagemAdicionada } from "../eventos/ImagemAdicionada";
import { ImagemRemovida } from "../eventos/ImagemRemovida";
import { ImagemPrincipalAlterada } from "../eventos/ImagemPrincipalAlterada";
import { DadosBasicosAtualizados } from "../eventos/DadosBasicosAtualizados";
import { GeradorDeId } from "../portas/GeradorDeId";
import { TamanhoSapato } from "../objetos-valor/TamanhoSapato";
import { Preco } from "../objetos-valor/Preco";
import { ImagemProduto, validadorImagem } from "../tipos/ImagemProduto";

// Vamos criar este evento de domínio
export class Produto {
  private readonly _id: string;
  private _nome: string;
  private _marca: string;
  private _tamanhos: TamanhoSapato[];
  private _preco: Preco;
  private _slug: string;
  private _imagens: ImagemProduto[] = [];
  private _eventos: Evento[] = [];

  constructor(
    id: string,
    nome: string,
    marca: string,
    tamanhos: TamanhoSapato[],
    preco: Preco,
    slug: string,
    imagens: ImagemProduto[] = []
  ) {
    this._id = id;
    this._nome = nome;
    this._marca = marca;
    this._tamanhos = tamanhos;
    this._preco = preco;
    this._slug = slug;
    this._imagens = imagens;

    // Encontrar a imagem principal, se existir
    const imagemPrincipal = this._imagens.find((img) => img.principal);

    this._eventos.push(
      new ProdutoCriado(
        this._id,
        this._nome,
        this._marca,
        this._preco.valor,
        imagemPrincipal?.url
      )
    );
  }

  // Getters
  get id(): string {
    return this._id;
  }

  get nome(): string {
    return this._nome;
  }

  get marca(): string {
    return this._marca;
  }

  get tamanhos(): TamanhoSapato[] {
    return [...this._tamanhos]; // Retorna uma cópia para evitar modificação externa
  }

  // Retorna os tamanhos como números para compatibilidade
  get tamanhosNumericos(): number[] {
    return this._tamanhos.map((t) => t.valor);
  }

  get preco(): Preco {
    return this._preco;
  }

  // Retorna o valor numérico do preço para compatibilidade
  get precoNumerico(): number {
    return this._preco.valor;
  }

  get slug(): string {
    return this._slug;
  }

  get imagens(): ImagemProduto[] {
    return [...this._imagens]; // Retorna uma cópia para evitar modificação externa
  }

  // Retorna a imagem principal, se existir
  get imagemPrincipal(): ImagemProduto | null {
    return this._imagens.find((img) => img.principal) || null;
  }

  get eventos(): Evento[] {
    return [...this._eventos]; // Retorna uma cópia para evitar modificação externa
  }

  /**
   * Atualiza os dados básicos do produto (nome e marca)
   * e recalcula o slug
   */
  public atualizarDadosBasicos(nome: string, marca: string): void {
    if (!nome) throw new Error("Nome do produto é obrigatório");
    if (!marca) throw new Error("Marca do produto é obrigatória");

    const nomeAntigo = this._nome;
    const marcaAntiga = this._marca;
    const slugAntigo = this._slug;

    this._nome = nome;
    this._marca = marca;
    this._slug = Produto.gerarSlugPublico(nome, marca);

    // Registrar evento de atualização de dados básicos
    this._eventos.push(
      new DadosBasicosAtualizados(
        this._id,
        nomeAntigo,
        marcaAntiga,
        slugAntigo,
        this._nome,
        this._marca,
        this._slug
      )
    );
  }

  // Comportamentos
  public atualizarPreco(novoPreco: Preco): void {
    if (!novoPreco) {
      throw new Error("Novo preço não pode ser nulo");
    }

    const precoAntigo = this._preco.valor;
    this._preco = novoPreco;

    // Registrar evento de atualização de preço
    this._eventos.push(
      new PrecoAtualizado(this._id, precoAntigo, novoPreco.valor)
    );
  }

  public adicionarTamanho(tamanho: TamanhoSapato): void {
    if (!this.possuiTamanho(tamanho)) {
      this._tamanhos.push(tamanho);
      this._tamanhos.sort((a, b) => a.valor - b.valor); // Manter ordenado

      // Registrar evento de adição de tamanho
      this._eventos.push(new TamanhoAdicionado(this._id, tamanho.valor));
    }
  }

  public removerTamanho(tamanho: TamanhoSapato): void {
    const index = this._tamanhos.findIndex((t) => t.equals(tamanho));
    if (index !== -1) {
      this._tamanhos.splice(index, 1);

      // Registrar evento de remoção de tamanho
      this._eventos.push(new TamanhoRemovido(this._id, tamanho.valor));
    }
  }

  public possuiTamanho(tamanho: TamanhoSapato): boolean {
    return this._tamanhos.some((t) => t.equals(tamanho));
  }

  public temTamanhoDisponivel(tamanho: number): boolean {
    return this._tamanhos.some((t) => t.valor === tamanho);
  }

  /**
   * Adiciona uma nova imagem ao produto
   */
  public adicionarImagem(imagem: ImagemProduto): void {
    // Validar a imagem
    const erroValidacao = validadorImagem.validarImagem(imagem);
    if (erroValidacao) {
      throw new Error(erroValidacao);
    }

    // Verificar se a imagem já existe
    if (this._imagens.some((img) => img.url === imagem.url)) {
      throw new Error("Esta imagem já está cadastrada para este produto");
    }

    // Criar uma cópia para garantir imutabilidade
    const novaImagem = { ...imagem };

    // Se for a primeira imagem ou for marcada como principal
    if (this._imagens.length === 0 || novaImagem.principal) {
      // Antes de adicionar uma nova imagem principal, devemos remover a flag
      // de principal de qualquer outra imagem
      const imagemPrincipalAnterior = this.imagemPrincipal;

      if (
        imagemPrincipalAnterior &&
        imagemPrincipalAnterior.url !== novaImagem.url
      ) {
        // Encontrar e atualizar a imagem principal anterior
        const index = this._imagens.findIndex((img) => img.principal);
        if (index !== -1) {
          this._imagens[index] = { ...this._imagens[index], principal: false };
        }

        // Registrar evento de alteração de imagem principal
        this._eventos.push(
          new ImagemPrincipalAlterada(
            this._id,
            imagemPrincipalAnterior.url,
            novaImagem.url
          )
        );
      }

      // Se for a primeira imagem e não for definida como principal,
      // vamos definí-la como principal
      if (this._imagens.length === 0 && !novaImagem.principal) {
        novaImagem.principal = true;
      }
    }

    // Adicionar a imagem
    this._imagens.push(novaImagem);

    // Registrar evento de adição de imagem
    this._eventos.push(
      new ImagemAdicionada(
        this._id,
        novaImagem.url,
        novaImagem.descricao,
        novaImagem.principal
      )
    );
  }

  /**
   * Remove uma imagem do produto
   */
  public removerImagem(url: string): void {
    const index = this._imagens.findIndex((img) => img.url === url);
    if (index === -1) {
      throw new Error("Imagem não encontrada");
    }

    const imagemRemovida = this._imagens[index];
    this._imagens.splice(index, 1);

    // Registrar evento de remoção de imagem
    this._eventos.push(new ImagemRemovida(this._id, url));

    // Se a imagem removida era a principal e ainda existem outras imagens,
    // definir a primeira imagem restante como principal
    if (imagemRemovida.principal && this._imagens.length > 0) {
      this._imagens[0] = { ...this._imagens[0], principal: true };

      // Registrar evento de alteração de imagem principal
      this._eventos.push(
        new ImagemPrincipalAlterada(
          this._id,
          imagemRemovida.url,
          this._imagens[0].url
        )
      );
    }
  }

  /**
   * Define uma imagem como principal
   */
  public definirImagemPrincipal(url: string): void {
    const index = this._imagens.findIndex((img) => img.url === url);
    if (index === -1) {
      throw new Error("Imagem não encontrada");
    }

    if (this._imagens[index].principal) {
      return; // Já é a imagem principal
    }

    const imagemPrincipalAnterior = this.imagemPrincipal;
    const urlAnterior = imagemPrincipalAnterior?.url || null;

    // Remover flag de principal da imagem atual
    if (imagemPrincipalAnterior) {
      const indexAnterior = this._imagens.findIndex(
        (img) => img.url === imagemPrincipalAnterior.url
      );
      this._imagens[indexAnterior] = {
        ...this._imagens[indexAnterior],
        principal: false,
      };
    }

    // Definir a nova imagem principal
    this._imagens[index] = { ...this._imagens[index], principal: true };

    // Registrar evento de alteração de imagem principal
    this._eventos.push(new ImagemPrincipalAlterada(this._id, urlAnterior, url));
  }

  /**
   * Substitui todas as imagens do produto
   */
  public substituirImagens(novasImagens: ImagemProduto[]): void {
    if (!Array.isArray(novasImagens) || novasImagens.length === 0) {
      throw new Error("É necessário informar pelo menos uma imagem");
    }

    // Verificar se há mais de uma imagem principal
    const imagensPrincipais = novasImagens.filter((img) => img.principal);
    if (imagensPrincipais.length > 1) {
      throw new Error("Só pode haver uma imagem principal");
    }

    // Se nenhuma imagem foi marcada como principal, marcar a primeira
    if (imagensPrincipais.length === 0) {
      novasImagens[0].principal = true;
    }

    // Obter URL da imagem principal atual
    const imagemPrincipalAtual = this.imagemPrincipal;

    // Salvar as imagens antigas para gerar eventos de remoção
    const imagensAntigas = [...this._imagens];

    // Limpar imagens existentes
    this._imagens = [];

    // Gerar eventos de remoção para imagens antigas
    for (const img of imagensAntigas) {
      this._eventos.push(new ImagemRemovida(this._id, img.url));
    }

    // Adicionar novas imagens
    for (const img of novasImagens) {
      // Validar cada imagem
      const erroValidacao = validadorImagem.validarImagem(img);
      if (erroValidacao) {
        throw new Error(erroValidacao);
      }

      // Criar uma cópia para garantir imutabilidade
      this._imagens.push({ ...img });

      // Gerar evento de adição
      this._eventos.push(
        new ImagemAdicionada(this._id, img.url, img.descricao, img.principal)
      );
    }

    // Verificar se a imagem principal foi alterada
    const novaImagemPrincipal = novasImagens.find((img) => img.principal);
    if (
      novaImagemPrincipal &&
      (!imagemPrincipalAtual ||
        imagemPrincipalAtual.url !== novaImagemPrincipal.url)
    ) {
      // Registrar evento de alteração de imagem principal
      this._eventos.push(
        new ImagemPrincipalAlterada(
          this._id,
          imagemPrincipalAtual?.url || null,
          novaImagemPrincipal.url
        )
      );
    }
  }

  // Método de fábrica para criar um novo produto
  static criar(
    nome: string,
    marca: string,
    tamanhos: number[],
    precoValor: number,
    geradorDeId: GeradorDeId,
    imagens: { url: string; descricao: string; principal?: boolean }[] = []
  ): Produto {
    if (!nome) throw new Error("Nome do produto é obrigatório");
    if (!marca) throw new Error("Marca do produto é obrigatória");
    if (!tamanhos || tamanhos.length === 0)
      throw new Error("É necessário informar pelo menos um tamanho disponível");

    // Converter números para objetos TamanhoSapato
    const tamanhosSapato = tamanhos.map((t) => {
      try {
        return TamanhoSapato.criar(t);
      } catch (error: any) {
        throw new Error(`Tamanho inválido: ${t}. ${error.message}`);
      }
    });

    // Criar objeto de valor para preço
    let preco: Preco;
    try {
      preco = Preco.criar(precoValor);
    } catch (error: any) {
      throw new Error(`Preço inválido: ${error.message}`);
    }

    // Processar imagens
    const imagensProduto: ImagemProduto[] = [];

    // Verificar se há pelo menos uma imagem
    if (imagens.length === 0) {
      throw new Error(
        "É necessário informar pelo menos uma imagem para o produto"
      );
    }

    // Garantir que exista apenas uma imagem principal
    let temImagemPrincipal = false;
    for (const imgDados of imagens) {
      if (imgDados.principal) {
        if (temImagemPrincipal) {
          throw new Error("Só pode haver uma imagem principal");
        }
        temImagemPrincipal = true;
      }
    }

    // Se nenhuma imagem foi marcada como principal, a primeira será
    if (!temImagemPrincipal && imagens.length > 0) {
      imagens[0].principal = true;
    }

    // Validar e criar cópias das imagens
    for (const imgDados of imagens) {
      const imagem = {
        url: imgDados.url,
        descricao: imgDados.descricao,
        principal: imgDados.principal || false,
      };

      // Validar a imagem
      const erroValidacao = validadorImagem.validarImagem(imagem);
      if (erroValidacao) {
        throw new Error(
          `Erro ao processar imagem ${imgDados.url}: ${erroValidacao}`
        );
      }

      imagensProduto.push(imagem);
    }

    const id = geradorDeId.gerar();
    const slug = Produto.gerarSlugPublico(nome, marca);

    return new Produto(
      id,
      nome,
      marca,
      tamanhosSapato,
      preco,
      slug,
      imagensProduto
    );
  }

  /**
   * Método público para gerar slug a partir do nome e marca
   */
  public static gerarSlugPublico(nome: string, marca: string): string {
    return Produto.gerarSlug(nome, marca);
  }

  // Método para gerar slug a partir do nome e marca
  private static gerarSlug(nome: string, marca: string): string {
    const textoBase = `${nome}-${marca}`.toLowerCase();

    // Remover acentos
    const semAcentos = textoBase
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    // Substituir caracteres especiais e espaços por hífens
    return semAcentos
      .replace(/[^\w\s-]/g, "") // Remover caracteres especiais
      .replace(/\s+/g, "-") // Substituir espaços por hífens
      .replace(/-+/g, "-"); // Evitar hífens duplicados
  }
}
