| Request                 | GET/POST | Paramaters             | Return Type        | Description                                             |
|-------------------------|----------|------------------------|--------------------|---------------------------------------------------------|
| api/isBanned            | GET      | HWID                   | JSON               | Checks if a hwid is banned                              |
| api/cosmetics           | GET      |                        | JSON               | Gets a json list of every users cosmetics               |
| api/mapUUID             | POST     | HWID / UUID / Username | 200 OK / 500 Error | Updates/Creates a log of the users HWID / UUID / HWID   |
| api/getUsername         | GET      | UUID                   | JSON               | Returns back the map from uuid to username              |