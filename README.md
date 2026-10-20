# Ataraxia
app web-like pessoal pra tirar os videos da rede social vertical pra não cair no doomscrolling diário

## Build e instalação

O .ipa é gerado no GitHub Actions a cada push na main, ou na mão em Actions > ios > Run workflow. Quando a execução termina, ele fica em Artifacts, dentro de um zip.

Pra instalar no Windows eu uso o Sideloadly. Ele precisa do iTunes e do iCloud baixados do site da Apple, não da Microsoft Store. Com o iPhone no cabo, arrasta o .ipa pro Sideloadly, coloca o Apple ID e manda instalar. No iPhone, confia no perfil em Ajustes > Geral > VPN e Gerenciamento de Dispositivos e liga o Modo de Desenvolvedor em Ajustes > Privacidade e Segurança. O Apple ID e a senha ficam só no Sideloadly, nada disso passa pelo repo.

Com Apple ID gratuito a assinatura vale 7 dias. Depois disso o app para de abrir e tem que instalar de novo por cima, o que mantém o login. O Sideloadly tem um auto-refresh que faz isso sozinho se o PC e o iPhone estiverem na mesma rede.

Quando o Instagram mudar o layout e algo voltar a aparecer, os seletores, textos e flags ficam no `config` no topo de `src/inject.ts`. O user agent e os domínios que abrem dentro do app estão no `App.tsx`.
