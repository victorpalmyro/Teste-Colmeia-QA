### Bug 01 - Mensagem incorreta após login com sucesso

**Descrição:**
Ao realizar login com credenciais válidas, o sistema exibe uma mensagem incorreta informando que o login está errado, mesmo permitindo o acesso.

**Passos para reproduzir:**
1. Acessar a página de login
2. Inserir um email valido
3. Inserir uma senha válida
4. Clicar em "Entrar"

**Resultado esperado:**
O sistema deve exibir uma mensagem de sucesso (ou nenhuma mensagem de erro) e redirecionar corretamente o usuário para a área logada.

**Resultado obtido:**
O sistema permite o acesso, porém exibe a mensagem:  
"Seu login está incorreto, quer continuar?"

**Impacto:**
Pode gerar confusão no usuário, reduzindo a confiabilidade do sistema e causando dúvida sobre o status do login.

**Severidade:** Média  
**Prioridade:** Média  

**Ambiente:**
- Navegador: Opera