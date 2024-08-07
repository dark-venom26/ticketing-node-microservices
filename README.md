
# Ticketing Microservices Node.js

This is a node.js microservices project for ticketing application

## Features

- Create Tickets
- Modify Tickets
- Buy Tickets


## Installation



### Install Docker


#### For Ubuntu (linux)

Refer this doc - https://docs.docker.com/engine/install/ubuntu/

#### For Windows

Refer this doc - https://docs.docker.com/desktop/install/windows-install/

### Install Kubernetes


#### For Ubuntu (linux)
You need to install minikube

Refer this doc - https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/

#### For Windows

Enable Kubernetes from docker desktop


### Install Ingress Nginx

#### For Ubuntu (linux)

```bash
minikube addons enable ingress
```

Refer this doc - https://kubernetes.github.io/ingress-nginx/deploy/#minikube

#### For Windows

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.11.1/deploy/static/provider/cloud/deploy.yaml
```

### Install Skaffold

Refer this doc - https://skaffold.dev/docs/install/

    
## Environment Variables

To run this project, you will need to add the following environment variables to your kubernetes cluster

`JWT_KEY`

Run this command
```bash
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf
```
## Run Locally

Clone the project

```bash
  git clone "https://github.com/dark-venom26/ticketing-node-microservices/"
```

Go to the project directory

```bash
  cd ticketing-node-microservices
```

### Point your `localhost` url to `ticketing.dev`

#### Windows
Go to `c:\windows\system32\drivers\etc\hosts`

Add this line
```bash
127.0.0.1 ticketing.dev
```

#### Linux
Run this cmd

```bash
minikube ip
```

Open `/etc/hosts` file with code

Add this line
```bash
YOUR_MINIKUBE_IP ticketing.dev
```

Start the server

```bash
  skaffold dev
```


## Running Tests

To run tests, run the following command separately for all modules

```bash
  npm run test
```


## Tech Stack

**Client:** React

**Server:** Node, Express, Mongo DB

**Deployment:** Docker, Kubernetes, Ingress nginx, Skaffold


## Acknowledgements

 - [Stephen Grider Udemy Course](https://www.udemy.com/course/microservices-with-node-js-and-react/)


## Authors

- [@dark-venom26](https://www.github.com/dark-venom26)

