const backendDomin ="http://localhost:8080"

const SummaryApi={
    SignUP: {
        url : `${backendDomin}/api/signup`,
        method: "post"
    },
    signIn : {
        url : `${backendDomin}/api/signin`,
        method : "post"
    }
}

export default SummaryApi