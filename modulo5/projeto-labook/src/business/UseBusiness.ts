import { UserBaseDataBase } from "../baseData/UserBaseDataBase"
import { ILikePostImputDTO, IUnlikePostImputDTO, IVerifyLikeInDataBaseDTO, IVerifyLikeOutDataBaseDTO, Like } from "../model/Like"
import { IPostImputDeletePostsDTO, Post } from "../model/Post"
import { IUserLoginInputDTO, IUserPostInputDTO, IUserSignupInputDTO, IUserSignupOuputDTO, Role, User } from "../model/User"
import { Authenticator, IdTokenPayload } from "../services/Authenticator"
import { GenerateId } from "../services/GenerateId"
import { HashManager } from "../services/HashManager"

export class UseBusiness {
    constructor(
        private generateId: GenerateId,
        private userBaseDataBase: UserBaseDataBase,
        private hashManager: HashManager,
        private authenticator: Authenticator,
    ) { }

    public signup = async (imput: IUserSignupInputDTO) => {

        const name = imput.name
        const email = imput.email
        const password = imput.password

        if (!name || !email || !password) {
            throw new Error('Preencha todos os campos.')
        } else
            if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
                throw new Error('Todos os campos devem ser do tuipo string.')
            } else
                if (name.length < 3) {
                    throw new Error('O campo name deve ter no mínmo 3 caracteres.')
                } else
                    if (password.length < 6) {
                        throw new Error('O campo password deve ter no mínmo 6 caracteres.')
                    } else
                        if (email.length < 6) {
                            throw new Error('O campo email deve ter no mínmo 6 caracteres.')
                        }

        const userExist = await this.userBaseDataBase.selectAllUserByEmail(email)

        if (userExist.length) {
            throw new Error('Usuário já cadastrado.')
        }

        const idUser = this.generateId.generateId()

        const passwordHash = await this.hashManager.hash(password)

        const user = new User(idUser, name, email, passwordHash)

        await this.userBaseDataBase.insertUserDataBase(user)

        const payload: IdTokenPayload = {
            id: user.getId(),
            role: user.getRole()
        }

        const token = this.authenticator.generateToken(payload)

        const response: IUserSignupOuputDTO = {
            message: "Usuário criado com sucesso.",
            token
        }

        return response

    }

    public login = async (imput: IUserLoginInputDTO) => {

        const email = imput.email
        const password = imput.password

        if (!email || !password) {
            throw new Error('Preencha todos os campos.')
        } else
            if (typeof email !== "string" || typeof password !== "string") {
                throw new Error('Todos os campos devem ser do tuipo string.')
            } else
                if (password.length < 6) {
                    throw new Error('O campo password deve ter no mínmo 6 caracteres.')
                }
                if (email.length < 6) {
                    throw new Error('O campo email deve ter no mínmo 6 caracteres.')
                }

        const userExistDataBase = await this.userBaseDataBase.selectAllUserByEmail(email)

        if (!userExistDataBase.length) {
            throw new Error('Usuário não cadastrado.')
        }

        const passwordHash = await this.hashManager.compare(password, userExistDataBase[0].password)

        if (userExistDataBase[0].email !== email || passwordHash !== true) {
            throw new Error('Email ou senha invalida.')
        }
        const payload: IdTokenPayload = {
            id: userExistDataBase[0].id,
            role: userExistDataBase[0].role

        }

        const token = this.authenticator.generateToken(payload)

        return token
    }

    public post = async (imput: IUserPostInputDTO) => {

        const token = imput.token
        const content = imput.content

        if (!token) {
            throw new Error('Necessário informar o token.')
        }
        if (!content) {
            throw new Error('Necessário informar o content.')
        }
        if (!content.length) {
            throw new Error('Necessário informar o content.')
        }

        const payload = this.authenticator.verifyToken(token)

        const userDataBase = await this.userBaseDataBase.selectAllUserById(payload.id)

        if (!userDataBase.length) {
            throw new Error('token inválido.')
        }

        const idPost = this.generateId.generateId()

        const newPost = new Post(idPost, content, userDataBase[0].id)

        this.userBaseDataBase.insertPost(newPost)
    }

    public allPosts = async (token: string) => {

        if (!token) {
            throw new Error('Necessário informar o token.')
        }

        const payload = this.authenticator.verifyToken(token)

        const userDataBase = await this.userBaseDataBase.selectAllUserById(payload.id)

        if (!userDataBase.length) {
            throw new Error('token inválido.')
        }

        const allPostsDataBase = await this.userBaseDataBase.selectAllPosts()

        return allPostsDataBase
    }

    public deletePost = async (imput: IPostImputDeletePostsDTO) => {

        const token = imput.token
        const idPostForDelete = imput.idPostForDelete

        if (!token) {
            throw new Error('Necessário informar o token.')
        }
        if (!idPostForDelete) {
            throw new Error('Necessário informar o id do post a ser deletado.')
        }

        const payload = this.authenticator.verifyToken(token)

        const postDataBase = await this.userBaseDataBase.selectPostById(idPostForDelete)

        if (!postDataBase.length) {
            throw new Error('Postagem não encontrada.')
        }

        const userDataBase = await this.userBaseDataBase.selectAllUserById(payload.id)

        const userOfPostDataBase = await this.userBaseDataBase.selectAllUserById(postDataBase[0].user_id)

        if (!userDataBase.length) {
            throw new Error('token inválido.')
        }
        if (userDataBase[0].role === Role.NORMAL && payload.id !== postDataBase[0].user_id) {
            throw new Error('E possível deletar apenas as suas próprias postagens.')
        }

        await this.userBaseDataBase.removePost(idPostForDelete)

        const response: string = `Você deletou a postagem de ${userOfPostDataBase[0].name} com sucesso.`

        return response
    }

    public likePost = async (imput: ILikePostImputDTO) => {

        const token = imput.token
        const idPostLiked = imput.idPostLiked

        if (!token) {
            throw new Error('Necessário informar o token.')
        }
        if (!idPostLiked) {
            throw new Error('Necessário informar o id do post.')
        }

        const payload = this.authenticator.verifyToken(token)

        const postDataBase = await this.userBaseDataBase.selectPostById(idPostLiked)

        if (!postDataBase.length) {
            throw new Error('Postagem não encontrada.')
        }

        const userDataBase = await this.userBaseDataBase.selectAllUserById(payload.id)

        const userPostDataBase = await this.userBaseDataBase.selectAllUserById(postDataBase[0].user_id)

        const verifyLike: IVerifyLikeInDataBaseDTO = {
            idUser: payload.id,
            idPostLiked: idPostLiked
        }

        const likeExist = await this.userBaseDataBase.selectLikePostByUser(verifyLike)

        if (likeExist) {
            throw new Error(`Você já curtiu essa postagem do ${userPostDataBase[0].name}.`)
        }
        if (!userDataBase.length) {
            throw new Error('token inválido.')
        }

        const id = this.generateId.generateId()

        const newLike = new Like(id, idPostLiked, payload.id)

        await this.userBaseDataBase.insertLikePost(newLike)

        const response: string = `Você curtiu a postagem de ${userPostDataBase[0].name}.`

        return response
    }

    public unLikePost = async (imput: IUnlikePostImputDTO) => {

        const token = imput.token
        const idPostUnlike = imput.idPostUnliked

        if (!token) {
            throw new Error('Necessário informar o token.')
        }
        if (!idPostUnlike) {
            throw new Error('Necessário informar o id do post.')
        }

        const payload = this.authenticator.verifyToken(token)

        const postDataBase = await this.userBaseDataBase.selectPostById(idPostUnlike)

        if (!postDataBase.length) {
            throw new Error('Postagem não encontrada.')
        }

        const userDataBase = await this.userBaseDataBase.selectAllUserById(payload.id)

        const userPostDataBase = await this.userBaseDataBase.selectAllUserById(postDataBase[0].user_id)

        const verifyLike: IVerifyLikeOutDataBaseDTO = {
            idUser: payload.id,
            idPostUnlike: idPostUnlike
        }

        const likeExist = await this.userBaseDataBase.selectUnlikePostByUser(verifyLike)

        if (!likeExist) {
            throw new Error(`Você ainda não curtiu essa postagem do ${userPostDataBase[0].name}.`)
        }
        if (!userDataBase.length) {
            throw new Error('token inválido.')
        }

        await this.userBaseDataBase.removeLikePost(verifyLike)

        const response: string = `Você descurtiu a postagem de ${userPostDataBase[0].name}.`

        return response
    }
}