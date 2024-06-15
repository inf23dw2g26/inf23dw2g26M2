### Overview

A aplicação que desenvolvemos tem como função fornecer domínios Web a vários clientes, que podem ir desde o nível de iniciação até ao nível empresarial. Estes podem ser configurados ao seu gosto com base no nível de subscrição que escolherem tendo como variáveis a quantidade de domínios que podem ter, a quantidade de armazenamento entre outros.

Projeto feito por:

Daniel Nunes(a042051@umaia.pt)

Vasco Neves(a043335@umaia.pt).

### Aplicações utilizadas neste projeto

***Mysql*** - (https://www.mysql.com/)

***NodeJS*** - (https://nodejs.org/en)

### Linguagens usadas

***JavaScript*** - (https://developer.mozilla.org/en-US/docs/Web/JavaScript)

***Json*** - (https://www.json.org/json-en.html)

***Yaml*** - (https://yaml.org/)

***React*** - (https://react.dev/)

### Como utilizar o codigo

Requerimentos:

***Git*** - (http://https://git.com/)

***Docker*** - (https://docker.com/)

***Visual Studio Code*** - (https://code.visualstudio.com/)

### **Optional**

> ***Docker:***

***Dockerhub repository:*** - (https://hub.docker.com/repository/docker/inf23dw2g26/inf23dw2g26/general)

Do a docker pull of the images:

> Mysql:
```
docker pull inf23dw2g26/inf23dw2g26:mysql
```
> NodeJS APP:
```
docker pull inf23dw2g26/inf23dw2g26:node
```
### **Instructions**

> First, create a clone of the project from github to your machine:
```
git clone: git@github.com:inf23dw2g26/inf23dw2g26M2.git
```

> Open the correct folder on the terminal:
```
cd inf23dw2g26M2
cd inf23dw2g26
```

> After that, you make another clone for the second repository that contains the API on your machine:
```
git clone git@github.com:inf23dw2g26/inf23dw2g26.git .
```

> Then, go back to the root of the project:
```
cd ..
```

> Second, inside of the project folder, open the terminal / prompt / bash and do a docker compose up:
```
docker compose up -d --build
```

The React project will be acessable on the port 3000.

The API project will be accessable on the port 3080.
