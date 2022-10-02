import { ILoginInputDTO, ILoginOutputDTO, ISignupInputDTO, ISignupOutputDTO, Role, User } from "../model/User";
import { InvalidEmailOrPassword } from "../error/InvalidEmailOrPassword";
import { Authenticator, IdTokenPayload } from "../service/Authenticator";
import { MinimumThreeCharacters } from "../error/MinimumThreeCharacters";
import { MinimumSixCharacters } from "../error/MinimumSixCharacters";
import { EmailAlreadyExists } from "../error/EmailAlreadyExists";
import { InvalidEmailFormat } from "../error/InvalidEmailFormat";
import { MissingInformation } from "../error/MissingInformation";
import { RequiredStringType } from "../error/RequiredStringType";
import { UserDataBase } from "../dataBase/UserDataBase";
import { HashManager } from "../service/HashManager"
import { GenerateId } from "../service/GenerateId";

export class UserBusisness {
    constructor(
        private hashManager: HashManager,
        private generateId: GenerateId,
        private userDataBase: UserDataBase,
        private authenticator: Authenticator
    ) { }

    public signup = async (input: ISignupInputDTO) => {

        const { name, email, password } = input

        if (!name || !email || !password) {
            throw new MissingInformation()
        }
        if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
            throw new RequiredStringType()
        }
        if (name.length < 3) {
            throw new MinimumThreeCharacters()
        }
        if (password.length < 6) {
            throw new MinimumSixCharacters()
        }
        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            throw new InvalidEmailFormat()
        }

        const emailExist = await this.userDataBase.selectUserByEmail(email)

        if (emailExist) {
            throw new EmailAlreadyExists()
        }

        const passwordHash = await this.hashManager.hash(password)

        const idUser = this.generateId.generateId()

        const newUser = new User(idUser, name, email, passwordHash, Role.NORMAL)

        await this.userDataBase.insertUser(newUser)

        const payload: IdTokenPayload = {
            id: newUser.getId(),
            role: newUser.getRole()
        }

        const token = this.authenticator.generateToken(payload)

        const response: ISignupOutputDTO = {
            token,
            message: `Parabéns ${newUser.getName()}, você criou sua conta.`
        }

        return response
    }

    public login = async (input: ILoginInputDTO) => {

        const { email, password } = input

        if (!email || !password) {
            throw new MissingInformation()
        }
        if (typeof email !== "string" || typeof password !== "string") {
            throw new RequiredStringType()
        }
        if (password.length < 6) {
            throw new MinimumSixCharacters()
        }
        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            throw new InvalidEmailFormat()
        }

        const emailExist = await this.userDataBase.selectUserByEmail(email)
        console.log(emailExist)

        if (!emailExist) {
            console.log("!emailExist")
            throw new InvalidEmailOrPassword()
        }
        // console.log(emailExist.password)
        const passwordValid = await this.hashManager.compare(password, emailExist.password)

        if (passwordValid !== true) {
            console.log("passwordValid !== true")
            throw new InvalidEmailOrPassword()
        }

        const payload: IdTokenPayload = {
            id: emailExist.id,
            role: emailExist.role as Role
        }

        const token = this.authenticator.generateToken(payload)

        const response: ILoginOutputDTO = {
            token
        }

        return response
    }
}