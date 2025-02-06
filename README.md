<!-- **Requisitos funcionais**
  sao as funcionalidades que a app vai ter, ex: cadastrar uma categoria

**Requisitos nao funcionais**
  Nao estao ligados directamente com a regra de negocio da app, ex: qual lib usar, qual banco de dados...

**Regra de negocio**
  regras que eu espero , por traz do requisitos funcionais, ex: nao deve ser possivel cadastrar uma categoria ja existente... -->

# Cadastro de carro 

**RF**

- [✅] Deve ser possivel cadastrar um novo carro
- [✅] Deve ser possivel listar todas as categorias.

**RN**

- [✅] Nao deve ser possivel cadastrar um carro com uma placa ja existente.
- [✅] Nao deve ser possivel alterar a placa de um carro ja cadastrado.
- [✅] O carro deve ser cadastrado por padrao com disponibilidade.
- [✅] O usuario responsavel pelo cadastro deve ser um usuario administrador. 

# Listagem de carros

**RF**

- [✅] Deve ser possivel listar todos os carros disponiveis.
- [✅] Deve ser possivel listar todos os carros disponiveis pelo nome da categoria.
- [✅] Deve ser possivel listar todos os carros disponiveis pelo nome da marca.
- [✅] Deve ser possivel listar todos os carros disponiveis pelo nome do carro.

**RN** 

- [✅] O usuario nao precisa estar logado no sistema.

# Cadastro de especificacao no carro

**RF**

- [✅] Deve ser possivel cadastrar uma especificacao para um carro.
- [✅] Deve ser possivel listar todas as especificacaoes.
- [✅] Deve ser possivel listar todos os carros

**RN**

- [✅] Nao deve ser possivel cadastrar uma especificacao para um carro inexistente.
- [✅] Nao deve ser possivel cadastrar uma especificacao ja existente para o mesmo carro. 
- [✅] O usuario responsavel pelo cadastro deve ser um usuario administrador. 

# Cadastro de imagens do carro

**RF**

- [✅] Deve ser possivel cadastrar a imagem do carro.
- [✅] Deve ser possivel listar todos os carros.

**RNF**

- [✅] Utilizar o multer para upload de arquivos localmente.

**RN**

- [✅] O usuario deve poder cadastrar mais de uma imagem para o mesmo carro.
- [✅] O usuario responsavel pelo cadastro deve ser um usuario administrador. 
        
# Alugel de carro

**RF**

- [✅] Deve ser possivel cadastrar um aluguel.

**RN**

- [✅] O aluguel deve ter duracao minima de 24h.
- [✅] Nao deve ser possivel cadastrar um novo luguel caso ja exista um aberto para o mesmo usuario.
- [✅] Nao deve ser possivel cadastrar um novo luguel caso ja exista um aberto para o mesmo carro.
- [✅] Ao realizar um aluguel o status do carro devera ser alterado para indisponivel

# Devolucao de Carro

**RF**

- [✅] Deve ser possivel realizar a devolucao de um carro

**RN**

- [✅] Se o caro for devolvido com menos de 24 horas, devera ser cobrado diaria completa  
- [✅] Ao realizar a devolucao, o carro deve ser liberado para outro aluguel
- [✅] Ao realizar a devolucao, o usuario deve ser liberado para outro aluguel
- [✅] Ao realizar a devolucao, devera ser calculado o total do aluguel
- [✅] Caso o horario de devolucao seja superior ao horario previsto de entrega, devera ser cobrado multa proporcional aos dias de atrazo
- [✅] Caso haja multa,  devera ser somado ao total do aluguel
- [✅] O usuario deve estar logado na aplicacao.

# Listagem de alugueis para usuario

**RF**

- [✅] Deve ser possivel realizar a busca de todos os alugueis de um usuario

**RN**

- [✅] O usuario deve estar logado na aplicacao  

# Recuperacao de senha

**RF**

- [✅] Deve ser possivel o usuario recuperar a senha informando o email
- [✅] O usuario deve receber um email, com o passo a passo para a recuperacao da senha
- [✅] O usuario deve conseguir inserir uma nova senha

**RN**

- [✅] O usuario precisa informar uma nova senha
- [✅] O link enviado para a recuperacao deve expirar em 3 horas   
# rentx
