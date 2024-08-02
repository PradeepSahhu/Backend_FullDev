# Making Complex Project

- Having all functionality of twitter(X),youtube and chatting

- [Model Link](https://github.com/PradeepSahhu/Backend_FullDev/blob/main/project_ERDiagram/diagram-export-30-07-2024-04_21_23.png)

- images are not directly stored in DB,(we kept them in server for short time and then upload it on 3rd party)

- Controllers = functionality
- DB = Database connection logic
- middlewares = middle men runs in between (before server) requesting data from server = middleware ensures that either we are eligible for using that data or not.

- models = for defining DB Schema and exporting models(mongoose)
- Routes = for defining the server routes.
- utils = utility (file upload),(mailing),(tokens gathering) = frequent functionality repeating.
