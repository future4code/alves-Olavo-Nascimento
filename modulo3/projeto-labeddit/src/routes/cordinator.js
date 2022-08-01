
export const goToRegistrationPage = (navigate) => {
    navigate('/registration')
}
export const goToLoginPage = (navigate) => {
    navigate('/login')
}
export const goToFeedPage = (navigate) => {
    navigate("/")
}
export const goToPostPage = (navigate, id) => {
    navigate(`/post/${id}`)
}