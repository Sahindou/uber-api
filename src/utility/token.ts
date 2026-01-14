export const extractToken = (authorization: string): string | null => {
    const [prefix, token] = authorization.split(" ")
    const authorizationPrefixes = ["Bearer"]

    if(!authorizationPrefixes.includes(prefix)) return null;

    return token;
}