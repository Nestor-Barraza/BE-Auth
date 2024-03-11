## Backend Test by:
 
`Nestor Barraza`

### Technologies Used:
@nestjs/jwt
@nestjs/mongoose
@nestjs/passport
@nestjs/platform-express
@nestjs/swagger
@types/bcrypt
@types/passport-jwt
@types/passport-local
bcrypt
class-transformer
class-validator
express
lodash
mongodb
mongoose
passport
passport-jwt
passport-local
swagger-ui-express
Project Setup:


### To run the project, use Pnpm. Install the dependencies using the following command:

`pnpm i`

To start the project, use the following command:

`pnpm run start:dev`


### MongoDB Atlas Cluster:
The project relies on a MongoDB Atlas cluster to function with real data.

### Project Testing:
To test the flow, change the extension of the .env.example file to .env and create an account. Validate the account using the validation endpoint. Once done, you can test the flow.

### User Roles:
The project consists of two roles: ADMIN and USER. To test each part, create a user, considering the role you want them to have.