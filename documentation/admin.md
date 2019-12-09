# Implemented
### TODO
| Request                 | GET/POST | Paramaters             | Return Type    | Description                                            |
|-------------------------|----------|------------------------|----------------|--------------------------------------------------------|
| /admin                  | POST     | Username Pass          | Page           | Admin login page                                       |
| /admin/logout           | POST     | none                   | /admin         | Logs the user out                                      |
| /admin/login            | POST     | none                   | /admin/profile | Logs the user in                                       |
| /admin/signup           | GET/POST | none                   | /admin/profile | Signs the user up                                      |

# Not Implemented
### TODO
| Request                 | GET/POST | Paramaters             | Return Type   | Description                                             |
|-------------------------|----------|------------------------|---------------|---------------------------------------------------------|
| /admin/addBan           | POST     | HWID / UUID            | Page          | Adds a ban to the database                              |
| /admin/removeBan        | POST     | HWID / UUID            | Page          | Removes a ban from the database                         |
| /admin/cosmetics        | GET      |                        | Page          | Nice page selection for players                         |
| /admin/cosmetics/UUID   | POST     | UUID, Cosmetic data    | 200, 500, 403 | Per user forum with checkboxes and picker for cosmetics |
| ** /admin/addAccount    | POST     | username, password     | Page          | Creates another admin acount                            |
| ** /admin/removeAccount | POST     | username               | Page          | Removes a admin account.                                |