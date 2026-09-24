/units
- GET
-- name search
--- first we list items that start with the substring, then the rest

- POST /units: add a unit through a REST interface, only allowed for authenticated users with admin role, so this will require first creating the user module
- PATCH /units/:id: update some value
- DELETE /units/:id: only allowed for admins and only for units that allow deletion (all that are created separately with POST)
- add discriminated values: if race is Protoss, it must also have the basicShields value specified

/users
- Model: name, email, role (user, admin)
- POST: create a user
- GET: only for admins
- GET /:id
- PATCH: update some value

/buildings
- copy the /units CRUD model
- cross references with units

/updates
- copy the /units CRUD model
- cross references with units and buildings