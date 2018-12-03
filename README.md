# Frontend fot business platform Annette Axon


> An **axon** or nerve fiber, is a long, slender projection of a nerve cell, or neuron, in vertebrates, that typically conducts electrical impulses known as action potentials, away from the nerve cell body. The function of the axon is to transmit information to different neurons, muscles, and glands.
>
> [*Wikipedia*](https://en.wikipedia.org/wiki/Axon)

Annette Axon is the business process management system integrated with project management system. 
Annette Axon helps companies to define, execute and control their non-project and project business processes. 
The platform implements the following functionality:

* flexible business processes based on BPM engine (Camunda BPM)
* organisational structure of one or more companies and project team structures
* content management based on CMIS engine (Alfresco ECM)
* project system with Gantt diagram representation of WBS (work breakdown structure)

## Getting started

Clone repository from GitHub:
```bash
$ git clone https://github.com/valerylobachev/axon-frontend-angular.git
```

Install the following software:
* `node.js` and `npm` (see [Node.js](https://nodejs.org) site)

Install Angular CLI:
```bash
$ npm install -g @angular/cli
```

Download and install dependencies for frontend application:
```bash
$ npm install
```

Build frontend application:
```bash
$ ng build
```

Build and run backend application:
```bash
$ cd ../annette-axon
$ sbt runAll
```


## Contributing

Contributions are *very* welcome!

If you see an issue that you'd like to see fixed, the best way to make it happen is to help out by submitting a pull request implementing it.

Refer to the [CONTRIBUTING.md](docs/CONTRIBUTING.md) and  [CODE_OF_CONDUCT.md](docs/CODE_OF_CONDUCT.md) file for more
 details about the workflow, and general hints on how to prepare your pull request. You can also ask for 
 clarifications or guidance in GitHub issues.


## License

Annette Axon is Open Source and available under the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0)
