# Clean Architecture Next.js Boilerplate

### DESCRIPTION

This repository is a real life example of Clean Architecture with use of `Next.js` and `Typescript`

![Clean Architecture Diagram](clean.diagram.architecture.svg)

> Diagrams have copyrights, if you want to use it on larger scale, feel free to contact me.

### BUSINESS CONTEXT

Project is a simple logistic dashboard for managing packages and clients.
There are two separate roles `Admin` and `Member`.

### USER STORIES

##### Member

    TODO

##### Admin

    Given I'm Admin
    When I'm on Dashboard
    Then I see recent new packages
    And I see recent packages in transit
    And I see packages delivered
    
    Given I'm Admin
    When I'm on clients screen
    Then I can see clients list

    Given I'm Admin
    When I'm on clients screen
    And I click on client item
    Then I'm navigated to client details screen

    Given I'm Admin
    When I'm on client details screen
    Then I can see client name
    And packages list

    Given I'm Admin
    When I'm on packages screen
    Then I can see packages list

    Given I'm Admin
    When I'm on packages screen
    And I click on package item
    Then I can see package products
    
    Given I'm Admin
    When I tap on logout button
    Then I'm navigated to login screen


### PREREQUISITES

* `Yarn`
* `Docker`

### TECHNOLOGIES USED

* `Typescript`
* `Next.js 14`
* `Docker`
* `Cucumber`
* `Mockoon`
* `Jest`
* `Playwright`
* `Storybook`

### SETUP

* `Yarn install`

### STRUCTURE

1. app ( `Next.js app folder` )

        Contains application structure related to Next.js 14

2. core ( `Application Core` )

        Contains loggers, event tracking logic etc

3. data

        Contains definition of data sources 

4. dataStore 
    
        Contains definition of state like redux, zustand etc

5. domain

        Contains definition of models, repositories, usecases etc

6. ioc

        Contains definition of dependency injection related structures ( Container and modules )

7. presentation

        Contains definition of presenters ( MVP ) and presenter related models

8. ui

        Contains definition for user facing markup ( React.js ), server side components, styles etc

### DATA FLOW

There is specific data flow applied for Clean architecture, and it's important to understand layers separation.
In this example you can see clean architecture with MVP ( Model View Presenter ) pattern as it seems like the best 
solution long term when it comes to web apps development. There are few alternatives which you can see on diagram.
Code is focused on primary ( first proposal ).

#### PRIMARY FLOW

![Clean Architecture Data Flow Diagram](clean.diagram.flow.svg)

#### ALTERNATIVE FLOW

![Clean Architecture Alternative Data Flow Diagram](clean.diagram.flow2.svg)

#### ALTERNATIVE FLOW 

![Clean Architecture Alternative Data Flow Diagram](clean.diagram.flow3.svg)

### LAYERS RESTRICTIONS

Whole approach defines layer access restrictions which are defined in `eslint`. 

* `DEPENDENCY INJECTION` has access to every layer to provide proper abstractions implementations.
* `UI` have access to `PRESENTATION ( MVP )` and `DATA STORE` layers
   * `Product features` can be grouped into `Bounded Context`
   * Given `Product features` do not have direct access to each other, 
     * If you need to have some cross product functionality then you need to define `shared` product feature.
* `PRESENTATION` have access to `DATA STORE` and `DOMAIN`
   * `Presenters` can be also part of `Bounded Context` and also can be part of `shared` product feature
   * `Presenters` can access data store in need to update data ( when fetching data from data sources ) or fetch it
* `DATA STORE` can't access any layer, it defines data structures and stores data mostly related to some framework
* `DOMAIN LAYER` can't access any layer, it's the core of whole architecture. It defines structures and business logic
   * `Mappers` are defined here and are responsible for mapping data source models into domain models in scope of repository
   * `Use Cases`, `Scenarios`, `Interactors` defines business logic and communicates with repositories
   * `Repositories` in domain are just abstractions / interfaces, not a specific implementation

### ARCHITECTURE LAYERS

Take a look at detailed diagrams for every layer for better understanding data flow and related structures

![Clean Architecture UI Layer](clean.diagram.ui.svg)

![Clean Architecture PRESENTATION Layer](clean.diagram.presentation.svg)

![Clean Architecture DATA STORE Layer](clean.diagram.dataStore.svg)

![Clean Architecture DOMAIN Layer](clean.diagram.domain.svg)

![Clean Architecture DATA Layer](clean.diagram.data.svg)

### HOW TO RUN LOCALLY

* `docker compose up`
* To access app `http://localhost:3000/`
* To access storybook `http://localhost:6006/`

Every role has its own account

* `member@clean.com`
* `admin@clean.com`

You can use any password

### TESTING

#### Unit Tests

1. Run `yarn test`

#### E2E Tests

1. Run `yarn test:e2e`

#### Mutational Tests

1. Read guide [here](https://stryker-mutator.io/stryker/quickstart) to setup global dependencies
2. Run `yarn test:mutate` command

### APPLIED CONCEPTS

#### Page Object

`Page Object` - models objects used within specific tests.

#### Request Object

`Request object` - holds data which is transferred between modules ( `DTO` ). 

#### Repository / Unit of Work

`Repository` is an abstraction over data source. Defined actions which can be done over data source, and clear definition of
input and output

`Unit of work` is a wrapper around multiple repositories, you can use it if you have dependency between few data sources,
and you would like to combine output into one model

#### UseCase / Scenario / Interactor

`UseCase` can be understood as operation performed by user which is based on a specific data source. 

#### Mapper

The Simple concept, where one module data structure is translated to another module

##### Data -> Domain Mapper

This mapper is prepared for mapping data source format data into domain format. The Simplest example would be that, in
a database we store `first_name` and `last_name` in separate columns, but in a domain we need to have field `name` which
is combined value of previously mentioned columns. In that case we define domain model with required fields and new `name` field.
In a Mapper, we can perform merging of those 2 values. 

##### Domain -> Presentation Mapper

This mapper is for preparing Domain data format into specific presentation data format. This mapper separates domain data format 
from UI / Presentation data format. If you plan to use `dataStore` layer then you can combine `domain` + `dataStore` data 
into one `presentation` model for specific screen

##### Scoping - Public / Private access interface

It's a simple pattern for better access control within domains and folders. Sometimes we want to just keep some files accessible
within given package. To achieve that we are using scopes.

### KNOWN ISSUES

* Order of stylesheets combined with routing - [GitHub Issue here](https://github.com/vercel/next.js/issues/13092)
  * After update to `14.2.0-canary.60` canary version seems like styling issue related to order has been resolved, but 
  * there is different issue now - sometimes styles are not loaded for some components and user needs to refresh
* Slow routes loading https://github.com/vercel/next.js/issues/61259
* There are still some weird issues over authentication...
* Project is sometimes still unstable, it's crashing here and there. I'll try to correct it in a free moment
  * Applied some patches to gracefully handle crashes due to lack of mocked data

### STILL TODO

* Add more tests for prepared code ( e2e and unit test )
* Update exising tests
* Add more functionality to existing project 
